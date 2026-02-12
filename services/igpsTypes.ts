
// Common Types
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

// 1. Auth Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    organizationName: string;
    organizationSlug: string;
    firstName?: string;
    lastName?: string;
}

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Organization {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    user: User;
    organization: Organization;
    tokens: Tokens;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

// 2. Team Types
export interface InviteMemberRequest {
    email: string;
    role: 'member' | 'admin';
}

export interface TeamInvite {
    id: string;
    email: string;
    role: string;
    token: string;
    status: 'pending' | 'accepted' | 'expired';
    expiresAt: string;
    createdAt: string;
}

export interface AcceptInviteRequest {
    email: string; // Validation often requires confirming email
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface UpdateRoleRequest {
    role: 'member' | 'admin';
}

export interface TeamMember extends User {
    // Inherits User properties
}

// 3. API Keys Types
export interface CreateApiKeyRequest {
    name: string;
    permissions: string[];
}

export interface ApiKey {
    id: string;
    name: string;
    prefix: string;
    permissions: string[];
    lastUsedAt?: string;
    createdAt: string;
    expiresAt?: string;
}

export interface ApiKeyWithSecret extends ApiKey {
    secret: string;
}

// 4. Common / Validation Types
export interface Currency {
    code: string; // e.g., "USD"
    name: string;
    symbol?: string;
    type: 'fiat' | 'crypto';
    networks?: string[]; // For crypto
}

export interface Bank {
    id: string;
    name: string;
    code: string;
    country: string;
}

export interface ValidationRule {
    field: string;
    type: string; // e.g., "string", "regex"
    required: boolean;
    validation?: string; // regex pattern
    description?: string;
}

// 5. Sender (KYC) Types
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface IdentityDocument {
    countryCode: string;
    documentType: string; // e.g., "NATIONAL_ID", "PASSPORT", "SSN9"
    documentNumber: string;
    documentFront?: string; // Base64
    documentBack?: string; // Base64
}

export interface CreateSenderRequest {
    type: 'individual' | 'business';
    firstName?: string; // Individual only
    lastName?: string;  // Individual only
    fullName?: string;  // Business only
    email: string;
    phone: string;
    birthDate?: string; // YYYY-MM-DD, Individual/UBO only
    gender?: 'male' | 'female' | 'other'; // Individual only
    occupation?: string; // Individual only
    address: Address;
    identity?: IdentityDocument; // Individual only (initially)
    identificationNumber?: string; // Business reg number
    registrationDate?: string; // Business only
    businessType?: string; // Business only (corporation, etc.)
}

export interface Sender extends CreateSenderRequest {
    id: string;
    organizationId: string;
    status: 'pending' | 'verified' | 'rejected' | 'more_info_required';
    createdAt: string;
    updatedAt: string;
}

export interface UploadDocumentRequest {
    fileName: string;
    type: 'business_registration_proof' | 'address_proof' | 'invoice' | 'passport' | 'drivers_license' | 'national_id' | 'other';
    blob: string; // Base64 encoded string
}

export interface CreateUBORequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    ownershipPercent: number;
    address: Address;
    identity: IdentityDocument;
}

// 6. Beneficiary Types
export interface PaymentInfoBank {
    paymentType: 'bank_account';
    accountNumber: string;
    accountType?: string; // savings, checking
    bankId?: string;
    ifscCode?: string; // India
    routingNumber?: string; // US
    swiftCode?: string;
    sortCode?: string; // UK
    iban?: string; // EU
}

export interface PaymentInfoPix {
    paymentType: 'pix';
    pixKeyId: string;
    taxId?: string; // CPF/CNPJ
}

export interface PaymentInfoCrypto {
    paymentType: 'crypto_wallet';
    address: string;
    chain: string; // ethereum, polygon, solana, tron
    token?: string; // USDC, USDT
}

export type PaymentInfo = PaymentInfoBank | PaymentInfoPix | PaymentInfoCrypto;

export interface CreateBeneficiaryRequest {
    type: 'individual' | 'business';
    firstName?: string;
    lastName?: string;
    fullName?: string; // Business
    email: string;
    phone?: string;
    address: Address;
    paymentInfo: PaymentInfo;
}

export interface Beneficiary extends CreateBeneficiaryRequest {
    id: string;
    organizationId: string;
    status: 'pending' | 'verified' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

// 7. Quotes & Orders Types
export interface QuoteRequest {
    sourceCurrency: string;
    targetCurrency: string;
    sourceAmount?: number;
    targetAmount?: number;
    network?: string; // For crypto source
    transferType?: string; // wire, ach, etc.
}

export interface Quote {
    id: string;
    sourceCurrency: string;
    targetCurrency: string;
    sourceAmount: number;
    targetAmount: number;
    exchangeRate: number;
    fee: number;
    network?: string;
    expiresAt: string;
    mestaQuoteId?: string; // Internal ID from provider
}

export interface OrderDocument {
    type: 'invoice' | 'other';
    fileName: string;
    blob: string; // Base64
}

export interface CreateOrderRequest {
    acceptedQuoteId: string;
    senderId: string;
    beneficiaryId: string;
    purpose: string;
    sourceOfFunds: string;
    beneficiaryRelationship: string;
    documents?: OrderDocument[];
}

export interface Order {
    id: string;
    organizationId: string;
    quoteId: string;
    senderId: string;
    beneficiaryId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    subStatus?: string;
    amount: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
}
