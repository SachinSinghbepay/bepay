export const PAYMENT_CONFIG = {
  IN: {
    paymentType: "bank_account",
    fields: ["accountNumber", "accountType", "bankId", "ifscCode"]
  },

  US: {
    paymentType: "bank_account",
    fields: ["accountNumber", "routingNumber", "transferType", "swiftCode"]
  },

  BR: {
    paymentType: "pix",
    fields: ["pixKeyId", "taxId"]
  }
};