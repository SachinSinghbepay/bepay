 
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
} from './igpsTypes';

export class IgpsService {
    private baseUrl: string;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    constructor(baseUrl: string = 'https://ddhvx9gk-5001.inc1.devtunnels.ms/api/igps') {
        this.baseUrl = baseUrl;
    }

    setTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    getTokens() {
        return { accessToken: this.accessToken, refreshToken: this.refreshToken };
    }

    private async request<T>(method: string, path: string, body?: any, isPublic: boolean = false): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${path}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (!isPublic && this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
            }

            // Check if response is wrapped in { success: true, data: T } or just T
            // The integration tests suggest standardized response: { success, data: { ... } } or { data: ... }
            // Postman scripts handle: const d = body.data || body;
            // We will normalize to ApiResponse<T>
            return {
                success: true,
                data: data.data || data,
                message: data.message,
            };
        } catch (error: any) {
            return {
                success: false,
                data: null as any,
                error: error.message || 'Unknown error occurred',
            };
        }
    }

    // 1. Auth Methods
    async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('POST', '/auth/signup', data, true);
    }

    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('POST', '/auth/login', data, true);
    }

    async getProfile(): Promise<ApiResponse<any>> { // User type + org info sometimes
        return this.request<any>('GET', '/auth/me');
    }

    async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<any>> {
        return this.request<any>('PATCH', '/auth/me', data);
    }

    async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<any>> {
        return this.request<any>('POST', '/auth/change-password', data);
    }

    async refreshTokenCall(data: RefreshTokenRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('POST', '/auth/refresh', data, true);
    }

    async logout(refreshToken: string): Promise<ApiResponse<any>> {
        return this.request<any>('POST', '/auth/logout', { refreshToken }, true); // often treated as public or requires only refresh logic
    }

    async logoutAll(): Promise<ApiResponse<any>> {
        return this.request<any>('POST', '/auth/logout-all');
    }

    // 2. Team Methods
    async inviteMember(data: InviteMemberRequest): Promise<ApiResponse<{ invite: TeamInvite }>> {
        return this.request<{ invite: TeamInvite }>('POST', '/team/invites', data);
    }

    async listInvites(): Promise<ApiResponse<{ invites: TeamInvite[] }>> {
        return this.request<{ invites: TeamInvite[] }>('GET', '/team/invites');
    }

    async cancelInvite(memberId: string): Promise<ApiResponse<any>> {
        return this.request<any>('DELETE', `/team/invites/${memberId}`);
    }

    async acceptInvite(token: string, data: AcceptInviteRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('POST', `/team/invites/${token}/accept`, data, true);
    }

    async listMembers(): Promise<ApiResponse<{ members: TeamMember[] }>> {
        return this.request<{ members: TeamMember[] }>('GET', '/team/members');
    }

    async updateMemberRole(memberId: string, data: UpdateRoleRequest): Promise<ApiResponse<TeamMember>> {
        return this.request<TeamMember>('PATCH', `/team/members/${memberId}/role`, data);
    }

    async removeMember(memberId: string): Promise<ApiResponse<any>> {
        return this.request<any>('DELETE', `/team/members/${memberId}`);
    }

    // 3. API Keys
    async createApiKey(data: CreateApiKeyRequest): Promise<ApiResponse<ApiKeyWithSecret>> {
        return this.request<ApiKeyWithSecret>('POST', '/api-keys', data);
    }

    async listApiKeys(): Promise<ApiResponse<ApiKey[]>> {
        return this.request<ApiKey[]>('GET', '/api-keys');
    }

    async regenerateApiKeySecret(id: string): Promise<ApiResponse<{ secret: string }>> {
        return this.request<{ secret: string }>('POST', `/api-keys/${id}/regenerate-secret`);
    }

    async deleteApiKey(id: string): Promise<ApiResponse<any>> {
        return this.request<any>('DELETE', `/api-keys/${id}`);
    }

    // 4. Common / Validation
    async listCurrencies(): Promise<ApiResponse<{ sourceCurrencies: Currency[], targetCurrencies: Currency[] }>> {
        return this.request<any>('GET', '/currencies');
    }

    async getBanks(countryCode: string): Promise<ApiResponse<Bank[]>> {
        return this.request<Bank[]>('GET', `/banks/${countryCode}`);
    }

    async getValidationRules(type: 'sender' | 'beneficiary', country: string, ownerType: 'individual' | 'business', paymentType?: string): Promise<ApiResponse<ValidationRule[]>> {
        let path = `/validation-rules?type=${type}&country=${country}&ownerType=${ownerType}`;
        if (paymentType) path += `&paymentType=${paymentType}`;
        return this.request<ValidationRule[]>('GET', path);
    }

    // 5. Senders (KYC)
    async createSender(data: CreateSenderRequest): Promise<ApiResponse<Sender>> {
        return this.request<Sender>('POST', '/senders', data);
    }

    async getSenderProfile(): Promise<ApiResponse<Sender>> {
        return this.request<Sender>('GET', '/senders/me');
    }

    async getSenderById(id: string): Promise<ApiResponse<Sender>> {
        return this.request<Sender>('GET', `/senders/${id}`);
    }

    async uploadSenderDocument(senderId: string, data: UploadDocumentRequest): Promise<ApiResponse<any>> {
        return this.request<any>('POST', `/senders/${senderId}/documents`, data);
    }

    async createUBO(senderId: string, data: CreateUBORequest): Promise<ApiResponse<any>> { // UBO response type not strictly defined yet, assuming generic
        return this.request<any>('POST', `/senders/${senderId}/ubo`, data);
    }

    async verifySender(senderId: string): Promise<ApiResponse<Sender>> {
        return this.request<Sender>('POST', `/senders/${senderId}/verify`);
    }

    // 6. Beneficiaries
    async createBeneficiary(data: CreateBeneficiaryRequest): Promise<ApiResponse<Beneficiary>> {
        return this.request<Beneficiary>('POST', '/beneficiaries', data);
    }

    async listBeneficiaries(): Promise<ApiResponse<Beneficiary[]>> {
        return this.request<Beneficiary[]>('GET', '/beneficiaries');
    }

    async getBeneficiary(id: string): Promise<ApiResponse<Beneficiary>> {
        return this.request<Beneficiary>('GET', `/beneficiaries/${id}`);
    }

    async verifyBeneficiary(id: string): Promise<ApiResponse<Beneficiary>> {
        return this.request<Beneficiary>('POST', `/beneficiaries/${id}/verify`);
    }

    async deleteBeneficiary(id: string): Promise<ApiResponse<any>> {
        return this.request<any>('DELETE', `/beneficiaries/${id}`);
    }

    // 7. Quotes & Orders
    async createQuote(data: QuoteRequest): Promise<ApiResponse<Quote>> {
        return this.request<Quote>('POST', '/quotes', data);
    }

    async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
        return this.request<Order>('POST', '/orders', data);
    }
}
