// This file demonstrates Zod schema usage.
// Note: Zod is not directly bundled in Next.js.
// For a full Next.js project, you would install it via npm: `npm install zod`

import { z } from "zod"

export const phoneNumberSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
})



// Example usage:
/*
try {
  phoneNumberSchema.parse({ countryCode: "+91", phoneNumber: "1234567890" });
  console.log("Validation successful!");
} catch (error) {
  console.error("Validation failed:", error.errors);
}
*/
