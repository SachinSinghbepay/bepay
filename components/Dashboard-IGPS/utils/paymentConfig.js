export const PAYMENT_CONFIG = {
    IN: {
        paymentType: "bank_account",
        fields: ["accountNumber", "accountType", "bankId", "ifscCode"]
    },

    US: {
        paymentType: "bank_account",
        fields: ["accountNumber", "routingNumber", "transferType"]
    },

    BR: {
        paymentType: "pix",
        fields: ["pixKeyId", "taxId"]
    },

    GB: {
        paymentType: "bank_account",
        fields: ["accountNumber", "sortCode"]
    },

    AE: {
        paymentType: "bank_account",
        fields: ["accountNumber", "swiftCode", "bankId", "remittancePurpose"]
    },

    SG: {
        paymentType: "bank_account",
        fields: ["accountNumber", "bankId"]
    },

    ZA: {
        paymentType: "bank_account",
        fields: ["accountNumber", "bankCode", "bankId"]
    },

    MX: {
        paymentType: "bank_account",
        fields: ["accountNumber", "targetName", "targetBankAccountId"]
    }
};

export const remittancePurposeOptions = [
    { label: "Family Support", value: "FAMILY_SUPPORT" },
    { label: "Education", value: "EDUCATION" },
    { label: "Gift and Donation", value: "GIFT_AND_DONATION" },
    { label: "Maintenance Expenses", value: "MAINTENANCE_EXPENSES" },
    { label: "Travel", value: "TRAVEL" },
    { label: "Construction Expenses", value: "CONSTRUCTION_EXPENSES" },
    { label: "Advisory Fees", value: "ADVISORY_FEES" },
    { label: "Business Insurance", value: "BUSINESS_INSURANCE" },
    { label: "Insurance Claims", value: "INSURANCE_CLAIMS" },
    { label: "Exported Goods", value: "EXPORTED_GOODS" },
    { label: "Service Charges", value: "SERVICE_CHARGES" },
    { label: "Loan Payment", value: "LOAN_PAYMENT" },
    { label: "Property Purchase", value: "PROPERTY_PURCHASE" },
    { label: "Property Rental", value: "PROPERTY_RENTAL" },
    { label: "Tax Payment", value: "TAX_PAYMENT" },
    { label: "Utility Bills", value: "UTILITY_BILLS" },
    { label: "Personal Transfer", value: "PERSONAL_TRANSFER" },
    { label: "Salary Payment", value: "SALARY_PAYMENT" },
    { label: "Computer Services", value: "COMPUTER_SERVICES" }
];

export const transferTypeOptions = [
    { label: "ACH (Standard Bank Transfer)", value: "ach" },
    { label: "RTP (Real Time Payment)", value: "rtp" },
    { label: "Wire Transfer", value: "wire" },
    { label: "SWIFT (International Wire)", value: "swift" }
];
