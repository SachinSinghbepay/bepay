"use client";

import { useState } from "react";
import Image from "next/image"; // Import Image for flags
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import { countries } from "@/lib/countries";
// import { phoneNumberSchema } from "@/lib/schemas"; // Uncomment and install zod for full validation

export function CountryPhoneInput({ onSendSms }) {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.iso2 === "in") || countries[0]
  ); // Default to India or first country
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    setPhoneNumber(value);
    if (error) setError(null); // Clear error on input change
  };

  const handleSubmit = () => {
    // Basic client-side validation (for Next.js without zod install)
    if (!phoneNumber || phoneNumber.length < 7 || phoneNumber.length > 15) {
      setError("Please enter a valid phone number (7-15 digits).");
      return;
    }

    // For full Zod validation, uncomment the import and use:
    /*
    try {
      phoneNumberSchema.parse({ countryCode: selectedCountry.dial_code, phoneNumber });
      setError(null);
      onSendSms(selectedCountry.dial_code, phoneNumber);
    } catch (e: any) {
      setError(e.errors[0].message);
    }
    */

    // If using basic validation:
    setError(null);
    onSendSms(selectedCountry.dial_code, phoneNumber);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex w-full max-w-xl items-center space-x-2">
        <DropdownMenu className="bg-[#F4F4F4] h-[70px] border-none">
          <DropdownMenuTrigger className="h-[70px] bg-[#F4F4F4] border-none" asChild>
            <Button
              variant="outline"
              className="flex bg-[#F4F4F4] items-center rounded-2xl gap-2 pr-2 "
            >
              <Image
                src={selectedCountry.flagUrl || "/placeholder.svg"}
                alt={`${selectedCountry.name} flag`}
                width={24} // Adjust size as needed
                height={16} // Adjust size as needed
                className="rounded-sm"
              />
              <span>{selectedCountry.dial_code}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 bg-[#F4F4F4] border-none overflow-y-auto">
            {countries.map((country) => (
              <DropdownMenuItem
                key={country.iso2} // Use iso2 as key for uniqueness
                onSelect={() => setSelectedCountry(country)}
                className="flex items-center gap-2"
              >
                <Image
                  src={country.flagUrl || "/placeholder.svg"}
                  alt={`${country.name} flag`}
                  width={24} // Adjust size as needed
                  height={16} // Adjust size as needed
                  className="rounded-sm"
                />
                <span>{country.name}</span>
                <span className="ml-auto text-gray-500">
                  {country.dial_code}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="tel"
          placeholder="Mobile number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="flex-1 h-[70px] lg:w-[900px] rounded-2xl bg-[#F4F4F4] border-none"
        />
        <Button onClick={handleSubmit} className="p-2 h-[70px] rounded-2xl lg:w-[100px] ">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
