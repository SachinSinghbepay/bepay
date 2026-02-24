import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  RefreshTokenRequest,
  InviteMemberRequest,
  TeamInvite,
  AcceptInviteRequest,
  UpdateRoleRequest,
  TeamMember,
  CreateApiKeyRequest,
  ApiKey,
  ApiKeyWithSecret,
  Currency,
  Bank,
  ValidationRule,
  CreateSenderRequest,
  Sender,
  UploadDocumentRequest,
  CreateUBORequest,
  CreateBeneficiaryRequest,
  Beneficiary,
  QuoteRequest,
  Quote,
  CreateOrderRequest,
  Order,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "./igpsTypes";

export class IgpsService {
  private baseUrl: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseUrl: string = "https://dev.bepay.money/api/igps") {
    this.baseUrl = baseUrl;

    // Auto-load tokens from cookies if in browser
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
      };
      const token = getCookie("igps_token");
      const refresh = getCookie("igps_refresh");
      if (token) this.accessToken = token;
      if (refresh) this.refreshToken = refresh;
    }
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  getTokens() {
    return { accessToken: this.accessToken, refreshToken: this.refreshToken };
  }

  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: any,
    isPublic: boolean = false,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${path}`;
    const getHeaders = () => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (!isPublic && this.accessToken) {
        headers["Authorization"] = `Bearer ${this.accessToken}`;
      }
      return headers;
    };

    const options: RequestInit = {
      method,
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      let response = await fetch(url, options);

      // Handle 401 Unauthorized (Token Expiry)
      if (response.status === 401 && !isPublic && this.refreshToken) {
        if (this.isRefreshing) {
          // If already refreshing, wait for it to finish
          return new Promise((resolve) => {
            this.addRefreshSubscriber(async (token) => {
              // Retry original request with new token
              options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
              };
              const retryResponse = await fetch(url, options);
              const retryData = await retryResponse.json();
              resolve({
                success: true, // Assuming retry succeeds or we handle it standard way
                data: retryData.data || retryData,
                message: retryData.message,
              });
            });
          });
        }

        this.isRefreshing = true;

        try {
          const refreshRes = await this.refreshTokenCall({
            refreshToken: this.refreshToken,
          });

          if (refreshRes.success && refreshRes.data?.tokens?.accessToken) {
            const newAccessToken = refreshRes.data.tokens.accessToken;
            const newRefreshToken = refreshRes.data.tokens.refreshToken;

            this.setTokens(newAccessToken, newRefreshToken);

            // Update cookies if client-side
            if (typeof window !== "undefined") {
              document.cookie = `igps_token=${newAccessToken}; path=/; max-age=86400`; // 1 day
              document.cookie = `igps_refresh=${newRefreshToken}; path=/; max-age=604800`; // 7 days
            }

            this.isRefreshing = false;
            this.onRefreshed(newAccessToken);

            // Retry original request
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            response = await fetch(url, options);
          } else {
            throw new Error("Refresh failed");
          }
        } catch (refreshErr) {
          this.isRefreshing = false;
          // Clear session
          this.setTokens("", "");
          IgpsService.clearAllCaches();

          if (typeof window !== "undefined") {
            window.location.href = "/igps/login";
          }
          throw new Error("Session expired. Please login again.");
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Request failed with status ${response.status}`,
        );
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null as any,
        error: error.message || "Unknown error occurred",
      };
    }
  }

  // 1. Auth Methods
  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("POST", "/auth/signup", data, true);
  }

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("POST", "/auth/login", data, true);
  }

  async getProfile(): Promise<ApiResponse<any>> {
    // User type + org info sometimes
    return this.request<any>("GET", "/auth/me");
  }

  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<any>> {
    return this.request<any>("PATCH", "/auth/me", data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<any>> {
    return this.request<any>("POST", "/auth/change-password", data);
  }

  async refreshTokenCall(
    data: RefreshTokenRequest,
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("POST", "/auth/refresh", data, true);
  }

  static clearAllCaches() {
    IgpsService.balanceCache = null;
    IgpsService.beneficiaryCache = null;
    IgpsService.walletCache = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem("igps_balances");
      localStorage.removeItem("igps_beneficiaries");
      localStorage.removeItem("onboarding_progress");

      // Clear cookies explicitly
      document.cookie =
        "igps_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie =
        "igps_refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

  async logout(refreshToken: string): Promise<ApiResponse<any>> {
    IgpsService.clearAllCaches();
    this.setTokens("", "");
    return this.request<any>("POST", "/auth/logout", { refreshToken }, true);
  }

  async logoutAll(): Promise<ApiResponse<any>> {
    return this.request<any>("POST", "/auth/logout-all");
  }

  async setupTwoFactor(): Promise<
    ApiResponse<{ secret: string; backupCodes: string[] }>
  > {
    return this.request<{ secret: string; backupCodes: string[] }>(
      "POST",
      "/auth/2fa/setup",
    );
  }

  // 2FA Verify & Enable
  async verifyTwoFactorSetup(token: string): Promise<ApiResponse<any>> {
    return this.request<any>("POST", "/auth/2fa/verify", { token });
  }

  async verifyTwoFactorLogin(data: {
    userId: string;
    token: string;
    twoFactorToken: string;
    isBackupCode: boolean;
  }): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>(
      "POST",
      "/auth/2fa/verify-login",
      data,
      true, // IMPORTANT: this is public, no access token yet
    );
  }

  async disableTwoFactor(password: string): Promise<ApiResponse<any>> {
    return this.request<any>("POST", "/auth/2fa/disable", { password });
  }

  // 2. Team Methods
  async inviteMember(
    data: InviteMemberRequest,
  ): Promise<ApiResponse<{ invite: TeamInvite }>> {
    return this.request<{ invite: TeamInvite }>("POST", "/team/invites", data);
  }

  async listInvites(): Promise<ApiResponse<{ invites: TeamInvite[] }>> {
    return this.request<{ invites: TeamInvite[] }>("GET", "/team/invites");
  }

  async cancelInvite(memberId: string): Promise<ApiResponse<any>> {
    return this.request<any>("DELETE", `/team/invites/${memberId}`);
  }

  async acceptInvite(
    token: string,
    data: AcceptInviteRequest,
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>(
      "POST",
      `/team/invites/${token}/accept`,
      data,
      true,
    );
  }

  async listMembers(): Promise<ApiResponse<{ members: TeamMember[] }>> {
    return this.request<{ members: TeamMember[] }>("GET", "/team/members");
  }

  async updateMemberRole(
    memberId: string,
    data: UpdateRoleRequest,
  ): Promise<ApiResponse<TeamMember>> {
    return this.request<TeamMember>(
      "PATCH",
      `/team/members/${memberId}/role`,
      data,
    );
  }

  async removeMember(memberId: string): Promise<ApiResponse<any>> {
    return this.request<any>("DELETE", `/team/members/${memberId}`);
  }

  // 3. API Keys
  async createApiKey(
    data: CreateApiKeyRequest,
  ): Promise<ApiResponse<ApiKeyWithSecret>> {
    return this.request<ApiKeyWithSecret>("POST", "/api-keys", data);
  }

  async listApiKeys(): Promise<ApiResponse<ApiKey[]>> {
    return this.request<ApiKey[]>("GET", "/api-keys");
  }

  async regenerateApiKeySecret(
    id: string,
  ): Promise<ApiResponse<{ secret: string }>> {
    return this.request<{ secret: string }>(
      "POST",
      `/api-keys/${id}/regenerate-secret`,
    );
  }

  async deleteApiKey(id: string): Promise<ApiResponse<any>> {
    return this.request<any>("DELETE", `/api-keys/${id}`);
  }

  // 4. Common / Validation
  async listCurrencies(): Promise<
    ApiResponse<{ sourceCurrencies: Currency[]; targetCurrencies: Currency[] }>
  > {
    return this.request<any>("GET", "/currencies");
  }

  async getBanks(countryCode: string): Promise<ApiResponse<Bank[]>> {
    return this.request<Bank[]>("GET", `/banks/${countryCode}`);
  }

  async getValidationRules(
    type: "sender" | "beneficiary",
    country: string,
    ownerType: "individual" | "business",
    paymentType?: string,
  ): Promise<ApiResponse<ValidationRule[]>> {
    let path = `/validation-rules?type=${type}&country=${country}&ownerType=${ownerType}`;
    if (paymentType) path += `&paymentType=${paymentType}`;
    return this.request<ValidationRule[]>("GET", path);
  }

  private static walletCache: ApiResponse<any> | null = null;

  async listWallets(): Promise<ApiResponse<any>> {
    if (IgpsService.walletCache) {
      return Promise.resolve(IgpsService.walletCache);
    }

    const response = await this.request<any>("GET", "/wallets");
    if (response.success) {
      IgpsService.walletCache = response;
    }
    return response;
  }

  private static balanceCache: ApiResponse<any> | null = null;

  getLocalBalances(): ApiResponse<any> | null {
    // 1. Check memory cache
    if (IgpsService.balanceCache) {
      return IgpsService.balanceCache;
    }
    // 2. Check localStorage
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("igps_balances");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          IgpsService.balanceCache = parsed;
          return parsed;
        } catch (e) {
          console.error("Failed to parse balance cache", e);
          localStorage.removeItem("igps_balances");
        }
      }
    }
    return null;
  }

  async getWalletBalances(): Promise<ApiResponse<any>> {
    const response = await this.request<any>("GET", "/wallets/balances");
    if (response.success) {
      IgpsService.balanceCache = response;
      if (typeof window !== "undefined") {
        localStorage.setItem("igps_balances", JSON.stringify(response));
      }
    }
    return response;
  }

  // 5. Senders (KYC)
  async createSender(data: CreateSenderRequest): Promise<ApiResponse<Sender>> {
    return this.request<Sender>("POST", "/senders", data);
  }

  async getSenderProfile(): Promise<ApiResponse<Sender>> {
    return this.request<Sender>("GET", "/senders/me");
  }

  async getSenderById(id: string): Promise<ApiResponse<Sender>> {
    return this.request<Sender>("GET", `/senders/${id}`);
  }

  async getDepositAccounts(senderId: string): Promise<ApiResponse<any>> {
    return this.request("GET", `/senders/${senderId}/deposit-accounts`);
  }

  async uploadSenderDocument(
    senderId: string,
    data: UploadDocumentRequest,
  ): Promise<ApiResponse<any>> {
    return this.request<any>("POST", `/senders/${senderId}/documents`, data);
  }

  async createUBO(
    senderId: string,
    data: CreateUBORequest,
  ): Promise<ApiResponse<any>> {
    // UBO response type not strictly defined yet, assuming generic
    return this.request<any>("POST", `/senders/${senderId}/ubo`, data);
  }

  async verifySender(senderId: string): Promise<ApiResponse<Sender>> {
    return this.request<Sender>("POST", `/senders/${senderId}/verify`);
  }

  private static beneficiaryCache: ApiResponse<Beneficiary[]> | null = null;

  // 6. Beneficiaries
  private async hmacSha256(message: string, secret: string): Promise<string> {
    // Use Node crypto on server, Web Crypto API on client
    if (typeof window === "undefined") {
      const { createHmac } = await import("crypto");
      return createHmac("sha256", secret).update(message).digest("hex");
    }

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const msgData = encoder.encode(message);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signatureBuffer = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      msgData,
    );
    const byteArray = Array.from(new Uint8Array(signatureBuffer));
    return byteArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async createBeneficiary(
    data: CreateBeneficiaryRequest,
  ): Promise<ApiResponse<Beneficiary>> {
    console.log("=== CREATE BENEFICIARY START ===");

    IgpsService.beneficiaryCache = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("igps_beneficiaries");
    }

    const method = "POST";
    const signaturePath = "/api/igps/beneficiaries";
    const bodyStr = JSON.stringify(data);
    const timestamp = new Date().toISOString();
    const stringToSign = method + signaturePath + timestamp + bodyStr;

    console.log("METHOD:", method);
    console.log("PATH:", signaturePath);
    console.log("TIMESTAMP:", timestamp);
    console.log("BODY:", bodyStr);
    console.log("STRING TO SIGN:", stringToSign);

    const secret = process.env.NEXT_PUBLIC_HMAC_SECRET!;
    console.log("SECRET EXISTS:", !!secret);

    let signature = "";
    try {
      signature = await this.hmacSha256(stringToSign, secret);
      console.log("SIGNATURE:", signature);
    } catch (err) {
      console.error("HMAC ERROR:", err);
      throw err;
    }

    const url = `${this.baseUrl}/beneficiaries`;
    console.log("FINAL URL:", url);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
      "X-Date": timestamp,
      "X-Signature": signature,
    };

    console.log("HEADERS:", headers);

    try {
      console.log("ABOUT TO FETCH...");

      const response = await fetch(url, {
        method,
        headers,
        body: bodyStr,
      });

      console.log("FETCH COMPLETED");
      console.log("STATUS:", response.status);

      const result = await response.json();
      console.log("RESPONSE BODY:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            `Request failed with status ${response.status}`,
        );
      }

      return {
        success: true,
        data: result.data || result,
        message: result.message,
      };
    } catch (error: any) {
      console.error("FETCH ERROR:", error);
      return {
        success: false,
        data: null as any,
        error: error.message || "Unknown error occurred",
      };
    }
  }

  async listBeneficiaries(
    forceRefresh: boolean = false,
  ): Promise<ApiResponse<Beneficiary[]>> {
    // 1. Check memory cache (skip if forceRefresh)
    if (!forceRefresh && IgpsService.beneficiaryCache) {
      return Promise.resolve(IgpsService.beneficiaryCache);
    }

    // 2. Check localStorage (skip if forceRefresh)
    if (!forceRefresh && typeof window !== "undefined") {
      const cached = localStorage.getItem("igps_beneficiaries");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          IgpsService.beneficiaryCache = parsed;
          return Promise.resolve(parsed);
        } catch (e) {
          console.error("Failed to parse beneficiary cache", e);
          localStorage.removeItem("igps_beneficiaries");
        }
      }
    }

    const response = await this.request<Beneficiary[]>("GET", "/beneficiaries");
    if (response.success) {
      IgpsService.beneficiaryCache = response;
      if (typeof window !== "undefined") {
        localStorage.setItem("igps_beneficiaries", JSON.stringify(response));
      }
    }
    return response;
  }

  async getCountries(): Promise<ApiResponse<{ code: string; name: string }[]>> {
    return this.request<{ code: string; name: string }[]>("GET", "/countries");
  }

  async getStates(countryCode: string) {
    return this.request<{
      countryCode: string;
      data: { code: string; name: string }[];
    }>("GET", `/states/${countryCode}`);
  }

  async getBeneficiary(id: string): Promise<ApiResponse<Beneficiary>> {
    return this.request<Beneficiary>("GET", `/beneficiaries/${id}`);
  }

  async verifyBeneficiary(id: string): Promise<ApiResponse<Beneficiary>> {
    return this.request<Beneficiary>("POST", `/beneficiaries/${id}/verify`);
  }

  async deleteBeneficiary(id: string): Promise<ApiResponse<any>> {
    IgpsService.beneficiaryCache = null;
    if (typeof window !== "undefined")
      localStorage.removeItem("igps_beneficiaries");
    return this.request<any>("DELETE", `/beneficiaries/${id}`);
  }

  // 7. Quotes & Orders
  async createQuote(data: QuoteRequest): Promise<ApiResponse<Quote>> {
    return this.request<Quote>("POST", "/quotes", data);
  }

  async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return this.request<Order>("POST", "/orders", data);
  }

  async getTransactions(params?: any): Promise<ApiResponse<any>> {
    let path = "/transactions";
    if (params) {
      const query = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          query.append(key, params[key].toString());
        }
      });
      const queryString = query.toString();
      if (queryString) {
        path += `?${queryString}`;
      }
    }
    return this.request<any>("GET", path);
  }

  async listOrders(
    params?: PaginationParams,
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    let path = "/orders";
    if (params) {
      path += `?page=${params.page || 1}&limit=${params.limit || 10}`;
    }
    return this.request<PaginatedResponse<Order>>("GET", path);
  }
}
