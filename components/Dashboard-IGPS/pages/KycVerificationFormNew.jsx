"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { IgpsService } from "@/services/igpsService";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { Loader2 } from "lucide-react";

export default function KycVerificationForm() {
  const router = useRouter();
  // ✅ Initialize service as null - will be set in useEffect after mount
  const [igpsService, setIgpsService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [senderId, setSenderId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Initialize service instance when component mounts (AFTER cookies are available)
  useEffect(() => {
    const service = new IgpsService();
    setIgpsService(service);
  }, []);

  // ✅ Show KYC completion message and redirect
  const showKYCCompletedMessage = () => {
    try {
      console.log("✅ KYC submission completed!");
      
      setSuccess("Your KYC is completed and under review!");
      
      // Clear progress and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("kyc_verification_progress");
      }
      
      setTimeout(() => {
        router.push("/igps/dashboard");
      }, 2000);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (!igpsService) return;

    const loadKYCProgress = async () => {
      try {
        const response = await igpsService.getKYCStatus();

        if (response.success && response.data) {
          const { senderId, remainingSteps, completedSteps } = response.data;

          // Set senderId if available
          if (senderId) {
            setSenderId(senderId);
          }

          // Determine which step to show based on remainingSteps
          let nextStep = 1;
          if (remainingSteps.includes("sender_details_submitted")) {
            nextStep = 1;
          } else if (remainingSteps.includes("documents_uploaded")) {
            nextStep = 2;
          } else if (remainingSteps.includes("ubo_submitted")) {
            nextStep = 3;
          } else if (remainingSteps.length === 1 && remainingSteps.includes("verification_submitted")) {
            // All KYC steps complete, only verification remains
            console.log("✅ All KYC steps completed! KYC submission done.");
            // Show KYC completion message and redirect
            showKYCCompletedMessage();
            return;
          }

          setCurrentStep(nextStep);

          // Try to restore form data from localStorage if available
          if (typeof window !== "undefined") {
            const saved = localStorage.getItem("kyc_verification_progress");
            if (saved) {
              try {
                const parsedData = JSON.parse(saved);
                if (parsedData.formData) {
                  setFormData(parsedData.formData);
                }
              } catch (err) {
                console.error("Failed to restore form data", err);
              }
            }
          }

          console.log("KYC Status Loaded:", {
            senderId,
            nextStep,
            remainingSteps,
            completedSteps,
          });
        }
      } catch (err) {
        console.error("Failed to load KYC status:", err);
        // Continue with default step 1 if API fails
      }
    };

    loadKYCProgress();
  }, [igpsService]);

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1: Sender Details
    fullName: "",
    email: "",
    phone: "",
    identificationNumber: "",
    registrationDate: "",
    businessType: "corporation",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    // Step 2: Documents
    documents: [],
    // Step 3: UBO
    ubo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ownershipPercent: 100,
      birthDate: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      identity: {
        countryCode: "US",
        documentType: "SSN9",
        documentNumber: "",
      },
    },
  });

  // Countries & States
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [uboStates, setUboStates] = useState([]);
  const [loadingUboStates, setLoadingUboStates] = useState(false);

  // Step 1: Phone Code
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCodeOpen, setPhoneCodeOpen] = useState(false);
  const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
  const phoneCodeRef = useRef(null);
  const phoneCodeScrollRef = useRef(null);

  // Step 3: UBO Phone Code
  const [uboPhoneCode, setUboPhoneCode] = useState("");
  const [uboPhoneNumber, setUboPhoneNumber] = useState("");
  const [uboPhoneCodeOpen, setUboPhoneCodeOpen] = useState(false);
  const [uboPhoneCodeSearch, setUboPhoneCodeSearch] = useState("");
  const uboPhoneCodeRef = useRef(null);
  const uboPhoneCodeScrollRef = useRef(null);

  // Step 2: File Upload States
  const [proofOfIdentityFile, setProofOfIdentityFile] = useState(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState(null);
  const [proofOfIdentityBase64, setProofOfIdentityBase64] = useState(null);
  const [proofOfAddressBase64, setProofOfAddressBase64] = useState(null);

  // Business Type Options - match backend expectations
  const businessTypeOptions = [
    { label: "Corporation", value: "corporation" },
    { label: "Limited Liability Company", value: "limited_liability_company" },
    { label: "Partnership", value: "partnership" },
    { label: "Sole Proprietorship", value: "sole_proprietorship" },
    { label: "Other", value: "other" },
  ];

  const identityDocumentTypes = [
    { label: "SSN (9 digits)", value: "SSN9" },
    { label: "Passport", value: "PASSPORT" },
    { label: "Driver's License", value: "DRIVER_LICENSE" },
    { label: "Tax ID (EIN)", value: "EIN" },
  ];

  // Phone Code Options with Flags
  const phoneCodeOptions = useMemo(() => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

    const countryToFlag = (countryCode) =>
      countryCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(127397 + char.charCodeAt(0))
        );

    return getCountries().map((country) => {
      const dial = `+${getCountryCallingCode(country)}`;
      const name = regionNames.of(country);
      const flag = countryToFlag(country);
      return {
        label: `${flag} ${dial}`,
        fullLabel: `${flag} ${dial} ${name}`,
        value: `${country}-${dial}`,
        dialCode: dial,
        country,
        flag,
        name,
      };
    });
  }, []);

  const selectedPhoneOption = phoneCodeOptions.find(
    (o) => o.value === phoneCode
  );
  const filteredPhoneCodes = phoneCodeOptions.filter(
    (o) =>
      o.name?.toLowerCase().includes(phoneCodeSearch.toLowerCase()) ||
      o.dialCode.includes(phoneCodeSearch)
  );

  const selectedUboPhoneOption = phoneCodeOptions.find(
    (o) => o.value === uboPhoneCode
  );
  const filteredUboPhoneCodes = phoneCodeOptions.filter(
    (o) =>
      o.name?.toLowerCase().includes(uboPhoneCodeSearch.toLowerCase()) ||
      o.dialCode.includes(uboPhoneCodeSearch)
  );

  // Close phone code dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (phoneCodeRef.current && !phoneCodeRef.current.contains(e.target)) {
        setPhoneCodeOpen(false);
        setPhoneCodeSearch("");
      }
      if (uboPhoneCodeRef.current && !uboPhoneCodeRef.current.contains(e.target)) {
        setUboPhoneCodeOpen(false);
        setUboPhoneCodeSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Prevent parent scroll when scrolling phone code dropdown
  useEffect(() => {
    if (!phoneCodeOpen || !phoneCodeScrollRef.current) return;

    const scrollDiv = phoneCodeScrollRef.current;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    };

    scrollDiv.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollDiv.removeEventListener("wheel", handleWheel);
  }, [phoneCodeOpen]);

  // Same for UBO phone code
  useEffect(() => {
    if (!uboPhoneCodeOpen || !uboPhoneCodeScrollRef.current) return;

    const scrollDiv = uboPhoneCodeScrollRef.current;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    };

    scrollDiv.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollDiv.removeEventListener("wheel", handleWheel);
  }, [uboPhoneCodeOpen]);

  // Load countries when igpsService is initialized
  useEffect(() => {
    // ✅ Guard: Only load when service is ready
    if (!igpsService) return;

    const loadCountries = async () => {
      try {
        const res = await igpsService.getCountries();
        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data.map((c) => ({
            label: c.name,
            value: c.code,
          }));
          setCountries(formatted);
        }
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    };

    loadCountries();
  }, [igpsService]);

  // Load states when country changes (Step 1)
  useEffect(() => {
    // ✅ Guard: Only load when service is ready
    if (!igpsService || !formData.address.country) {
      setStates([]);
      return;
    }

    const loadStates = async () => {
      setLoadingStates(true);
      const res = await igpsService.getStates(formData.address.country);

      if (res.success && Array.isArray(res.data)) {
        const formatted = res.data.map((s) => ({
          label: s.name,
          value: s.code,
        }));
        setStates(formatted);
      } else {
        setStates([]);
      }

      setLoadingStates(false);
    };

    loadStates();
  }, [igpsService, formData.address.country]);

  // Load UBO states when UBO country changes (Step 3)
  useEffect(() => {
    // ✅ Guard: Only load when service is ready
    if (!igpsService || !formData.ubo.address.country) {
      setUboStates([]);
      return;
    }

    const loadUboStates = async () => {
      setLoadingUboStates(true);
      const res = await igpsService.getStates(formData.ubo.address.country);

      if (res.success && Array.isArray(res.data)) {
        const formatted = res.data.map((s) => ({
          label: s.name,
          value: s.code,
        }));
        setUboStates(formatted);
      } else {
        setUboStates([]);
      }

      setLoadingUboStates(false);
    };

    loadUboStates();
  }, [igpsService, formData.ubo.address.country]);

  // Initialize phone codes to US on first load
  useEffect(() => {
    if (phoneCodeOptions.length > 0 && !phoneCode) {
      const usOption = phoneCodeOptions.find((o) => o.country === "US");
      setPhoneCode(usOption?.value ?? phoneCodeOptions[0]?.value);
    }
  }, [phoneCodeOptions, phoneCode]);

  useEffect(() => {
    if (phoneCodeOptions.length > 0 && !uboPhoneCode) {
      const usOption = phoneCodeOptions.find((o) => o.country === "US");
      setUboPhoneCode(usOption?.value ?? phoneCodeOptions[0]?.value);
    }
  }, [phoneCodeOptions, uboPhoneCode]);

  // Save progress to localStorage
  const saveProgress = (step, data, id) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "kyc_verification_progress",
        JSON.stringify({
          currentStep: step,
          formData: data,
          senderId: id,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleUboInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      ubo: {
        ...prev.ubo,
        [name]: name === "ownershipPercent"
          ? value === "" ? "" : Number(value)
          : value,
      },
    }));
  };

  const handleUboAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ubo: {
        ...prev.ubo,
        address: {
          ...prev.ubo.address,
          [name]: value,
        },
      },
    }));
  };

  const handleUboIdentityChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ubo: {
        ...prev.ubo,
        identity: {
          ...prev.ubo.identity,
          [name]: value,
        },
      },
    }));
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // Remove data:image/png;base64, prefix
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        if (type === "identity") {
          setProofOfIdentityFile(file);
          setProofOfIdentityBase64(base64);
        } else if (type === "address") {
          setProofOfAddressFile(file);
          setProofOfAddressBase64(base64);
        }
      } catch (err) {
        setError(`Failed to convert file to base64: ${err.message}`);
      }
    }
  };

  // Submit Step 1: Create Sender
  const submitStep1 = async () => {
    setError("");
    setLoading(true);

    try {
      if (
        !formData.fullName ||
        !formData.email ||
        !phoneNumber ||
        !formData.identificationNumber ||
        !formData.registrationDate ||
        !formData.businessType ||
        !formData.address.street ||
        !formData.address.city ||
        !formData.address.state ||
        !formData.address.country ||
        !formData.address.postalCode
      ) {
        throw new Error("Please fill all required fields");
      }

      const fullPhone = `${selectedPhoneOption?.dialCode}${phoneNumber}`;

      const payload = {
        type: "business",
        fullName: formData.fullName,
        email: formData.email,
        phone: fullPhone,
        identificationNumber: formData.identificationNumber,
        registrationDate: formData.registrationDate,
        businessType: formData.businessType,
        address: formData.address,
      };

      console.log("Submitting Sender Data:", payload);
      console.log("STATE DEBUG - Country:", formData.address.country, "State:", formData.address.state, "State Type:", typeof formData.address.state);

      const response = await igpsService.createSender(payload);

      if (response.success) {
        const newSenderId = response.data.id;
        setSenderId(newSenderId);
        setSuccess("Sender details submitted successfully!");
        saveProgress(2, formData, newSenderId);
        setCurrentStep(2);
        setError("");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error(
          response.error || "Failed to submit sender details"
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit Step 2: Upload Documents
  const submitStep2 = async () => {
    setError("");
    setLoading(true);

    try {
      if (!proofOfIdentityBase64 || !proofOfAddressBase64) {
        throw new Error("Please upload both identity and address documents");
      }

      if (!senderId) {
        throw new Error("Sender ID not found. Please complete Step 1 first.");
      }

      // Upload business registration/identity document
      console.log("Uploading business registration document...");
      const identityRes = await igpsService.uploadSenderDocument(senderId, {
        fileName: proofOfIdentityFile?.name || "business_registration_proof",
        type: "business_registration_proof",
        blob: proofOfIdentityBase64,
      });

      if (!identityRes.success) {
        throw new Error(
          identityRes.error || "Failed to upload business registration document"
        );
      }

      console.log("Business registration document uploaded successfully");

      // Upload address document
      console.log("Uploading address document...");
      const addressRes = await igpsService.uploadSenderDocument(senderId, {
        fileName: proofOfAddressFile?.name || "address_proof",
        type: "address_proof",
        blob: proofOfAddressBase64,
      });

      if (!addressRes.success) {
        throw new Error(
          addressRes.error || "Failed to upload address document"
        );
      }

      console.log("Address document uploaded successfully");

      setSuccess("Documents uploaded successfully!");
      saveProgress(3, formData, senderId);
      setCurrentStep(3);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit Step 3: Create UBO
  const submitStep3 = async () => {
    setError("");
    setLoading(true);

    try {
      if (
        !formData.ubo.firstName ||
        !formData.ubo.lastName ||
        !formData.ubo.email ||
        !uboPhoneNumber ||
        !formData.ubo.birthDate ||
        !formData.ubo.address.street ||
        !formData.ubo.address.city ||
        !formData.ubo.address.state ||
        !formData.ubo.address.country ||
        !formData.ubo.address.postalCode ||
        !formData.ubo.identity.documentNumber
      ) {
        throw new Error("Please fill all UBO required fields");
      }

      if (!senderId) {
        throw new Error("Sender ID not found. Please complete Step 1 first.");
      }

      const fullUboPhone = `${selectedUboPhoneOption?.dialCode}${uboPhoneNumber}`;

      const uboPayload = {
        firstName: formData.ubo.firstName,
        lastName: formData.ubo.lastName,
        email: formData.ubo.email,
        phone: fullUboPhone,
        ownershipPercent: formData.ubo.ownershipPercent,
        birthDate: formData.ubo.birthDate,
        address: formData.ubo.address,
        identity: formData.ubo.identity,
      };

      console.log("Submitting UBO Data:", uboPayload);

      const response = await igpsService.createUBO(senderId, uboPayload);

      if (response.success) {
        setSuccess("Your KYC is completed and under review!");

        // Clear progress and redirect
        if (typeof window !== "undefined") {
          localStorage.removeItem("kyc_verification_progress");
        }

        setTimeout(() => {
          router.push("/igps/dashboard");
        }, 2000);
      } else {
        throw new Error(response.error || "Failed to submit UBO");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      submitStep1();
    } else if (currentStep === 2) {
      submitStep2();
    } else if (currentStep === 3) {
      submitStep3();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const progress = (currentStep / 3) * 100;

  // ✅ Guard: Don't render until igpsService is initialized
  if (!igpsService) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-black" />
          <p className="text-gray-600">Initializing form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header with Progress */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            KYC/KYB Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Step {currentStep} of 3
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-black h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 text-green-600 text-sm rounded-lg border border-green-200">
            {success}
          </div>
        )}

        {/* Card */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          {/* ===== STEP 1: SENDER DETAILS ===== */}
          {currentStep === 1 && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">
                Business Information
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-sm mb-2">Full Name / Company Name*</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name or company name"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Phone with Code */}
              <div>
                <label className="block text-sm mb-2">Phone Number*</label>
                <div className="flex gap-2">
                  <div className="relative" ref={phoneCodeRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneCodeOpen((v) => !v);
                        setPhoneCodeSearch("");
                      }}
                      className="h-12 px-3 rounded-xl border border-gray-200 flex items-center gap-1.5 text-sm whitespace-nowrap bg-white hover:bg-gray-50 min-w-[90px]"
                    >
                      <span className="text-base leading-none">
                        {selectedPhoneOption?.flag}
                      </span>
                      <span className="font-medium">
                        {selectedPhoneOption?.dialCode}
                      </span>
                      <svg
                        className="w-3 h-3 text-gray-400 ml-0.5"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>

                    {phoneCodeOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 flex flex-col">
                        <div className="p-2 border-b">
                          <input
                            autoFocus
                            value={phoneCodeSearch}
                            onChange={(e) => setPhoneCodeSearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black"
                          />
                        </div>
                        <div className="overflow-y-auto max-h-52" ref={phoneCodeScrollRef}>
                          {filteredPhoneCodes.length > 0 ? (
                            filteredPhoneCodes.map((opt) => (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  setPhoneCode(opt.value);
                                  setPhoneCodeOpen(false);
                                  setPhoneCodeSearch("");
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 text-sm ${phoneCode === opt.value
                                    ? "bg-gray-50 font-medium"
                                    : ""
                                  }`}
                              >
                                <span className="text-base w-6 text-center leading-none">
                                  {opt.flag}
                                </span>
                                <span className="text-gray-500 w-12 shrink-0">
                                  {opt.dialCode}
                                </span>
                                <span className="truncate text-gray-700">
                                  {opt.name}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-sm text-gray-400 text-center">
                              No results
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition text-sm"
                  />
                </div>
              </div>

              {/* Identification Number */}
              <div>
                <label className="block text-sm mb-2">
                  Business Registration / Identification Number*
                </label>
                <input
                  type="text"
                  name="identificationNumber"
                  value={formData.identificationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter registration number or tax ID"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Registration Date */}
              <div>
                <label className="block text-sm mb-2">Registration Date*</label>
                <input
                  type="date"
                  name="registrationDate"
                  value={formData.registrationDate}
                  onChange={handleInputChange}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm mb-2">Business Type*</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                >
                  {businessTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-medium text-gray-900">Address</h4>

                <div>
                  <label className="block text-sm mb-2">Street Address*</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    placeholder="Enter street address"
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      placeholder="Enter city"
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">State/Province*</label>
                    {states.length > 0 ? (
                      <select
                        name="state"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        disabled={loadingStates}
                        className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                      >
                        <option value="">
                          {loadingStates ? "Loading..." : "Select state"}
                        </option>
                        {states.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="state"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        placeholder="Enter state or province"
                        className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Country*</label>
                    <select
                      name="country"
                      value={formData.address.country}
                      onChange={handleAddressChange}
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    >
                      <option value="">Select country</option>
                      {countries.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Postal Code*</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.address.postalCode}
                      onChange={handleAddressChange}
                      placeholder="Enter postal code"
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== STEP 2: DOCUMENT UPLOAD ===== */}
          {currentStep === 2 && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">
                Document Upload
              </h3>

              <div>
                <label className="block text-sm mb-2">
                  Business Registration Document*
                </label>
                <label className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-black transition cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {proofOfIdentityFile ? "Selected file" : "Upload business registration certificate or incorporation documents"}
                    </span>
                    {proofOfIdentityFile && (
                      <span className="text-sm font-medium text-gray-900 mt-1 truncate max-w-[250px]">
                        {proofOfIdentityFile.name}
                      </span>
                    )}
                  </div>
                  <span className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
                    {proofOfIdentityFile ? "Replace" : "Upload"}
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "identity")}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Proof of Address*
                </label>
                <label className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-black transition cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {proofOfAddressFile ? "Selected file" : "Upload utility bill or bank statement (last 3 months)"}
                    </span>
                    {proofOfAddressFile && (
                      <span className="text-sm font-medium text-gray-900 mt-1 truncate max-w-[250px]">
                        {proofOfAddressFile.name}
                      </span>
                    )}
                  </div>
                  <span className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
                    {proofOfAddressFile ? "Replace" : "Upload"}
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "address")}
                    className="hidden"
                  />
                </label>
              </div>
            </>
          )}

          {/* ===== STEP 3: UBO INFORMATION ===== */}
          {currentStep === 3 && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">
                Ultimate Beneficial Owner (UBO) Information
              </h3>

              {/* First Name */}
              <div>
                <label className="block text-sm mb-2">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.ubo.firstName}
                  onChange={handleUboInputChange}
                  placeholder="Enter first name"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm mb-2">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.ubo.lastName}
                  onChange={handleUboInputChange}
                  placeholder="Enter last name"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.ubo.email}
                  onChange={handleUboInputChange}
                  placeholder="Enter email"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Phone with Code */}
              <div>
                <label className="block text-sm mb-2">Phone Number*</label>
                <div className="flex gap-2">
                  <div className="relative" ref={uboPhoneCodeRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setUboPhoneCodeOpen((v) => !v);
                        setUboPhoneCodeSearch("");
                      }}
                      className="h-12 px-3 rounded-xl border border-gray-200 flex items-center gap-1.5 text-sm whitespace-nowrap bg-white hover:bg-gray-50 min-w-[90px]"
                    >
                      <span className="text-base leading-none">
                        {selectedUboPhoneOption?.flag}
                      </span>
                      <span className="font-medium">
                        {selectedUboPhoneOption?.dialCode}
                      </span>
                      <svg
                        className="w-3 h-3 text-gray-400 ml-0.5"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>

                    {uboPhoneCodeOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 flex flex-col">
                        <div className="p-2 border-b">
                          <input
                            autoFocus
                            value={uboPhoneCodeSearch}
                            onChange={(e) => setUboPhoneCodeSearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black"
                          />
                        </div>
                        <div className="overflow-y-auto max-h-52" ref={uboPhoneCodeScrollRef}>
                          {filteredUboPhoneCodes.length > 0 ? (
                            filteredUboPhoneCodes.map((opt) => (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  setUboPhoneCode(opt.value);
                                  setUboPhoneCodeOpen(false);
                                  setUboPhoneCodeSearch("");
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 text-sm ${uboPhoneCode === opt.value
                                    ? "bg-gray-50 font-medium"
                                    : ""
                                  }`}
                              >
                                <span className="text-base w-6 text-center leading-none">
                                  {opt.flag}
                                </span>
                                <span className="text-gray-500 w-12 shrink-0">
                                  {opt.dialCode}
                                </span>
                                <span className="truncate text-gray-700">
                                  {opt.name}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-sm text-gray-400 text-center">
                              No results
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    value={uboPhoneNumber}
                    onChange={(e) => setUboPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition text-sm"
                  />
                </div>
              </div>

              {/* Ownership Percent */}
              <div>
                <label className="block text-sm mb-2">Ownership Percent*</label>
                <input
                  type="number"
                  name="ownershipPercent"
                  value={formData.ubo.ownershipPercent}
                  onChange={handleUboInputChange}
                  placeholder="Enter ownership percentage"
                  min="0"
                  max="100"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm mb-2">Birth Date*</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.ubo.birthDate}
                  onChange={handleUboInputChange}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                />
              </div>

              {/* Address */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-medium text-gray-900">Address</h4>

                <div>
                  <label className="block text-sm mb-2">Street Address*</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.ubo.address.street}
                    onChange={handleUboAddressChange}
                    placeholder="Enter street address"
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.ubo.address.city}
                      onChange={handleUboAddressChange}
                      placeholder="Enter city"
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">State/Province*</label>
                    {uboStates.length > 0 ? (
                      <select
                        name="state"
                        value={formData.ubo.address.state}
                        onChange={handleUboAddressChange}
                        disabled={loadingUboStates}
                        className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                      >
                        <option value="">
                          {loadingUboStates ? "Loading..." : "Select state"}
                        </option>
                        {uboStates.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="state"
                        value={formData.ubo.address.state}
                        onChange={handleUboAddressChange}
                        placeholder="Enter state or province"
                        className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Country*</label>
                    <select
                      name="country"
                      value={formData.ubo.address.country}
                      onChange={handleUboAddressChange}
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    >
                      <option value="">Select country</option>
                      {countries.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Postal Code*</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.ubo.address.postalCode}
                      onChange={handleUboAddressChange}
                      placeholder="Enter postal code"
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    />
                  </div>
                </div>
              </div>

              {/* Identity Information */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Identity Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Country Code*</label>
                    <select
                      name="countryCode"
                      value={formData.ubo.identity.countryCode}
                      onChange={handleUboIdentityChange}
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    >
                      {countries.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Document Type*</label>
                    <select
                      name="documentType"
                      value={formData.ubo.identity.documentType}
                      onChange={handleUboIdentityChange}
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                    >
                      {identityDocumentTypes.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Document Number*</label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.ubo.identity.documentNumber}
                    onChange={handleUboIdentityChange}
                    placeholder="Enter document number"
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-black transition"
                  />
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1 || loading}
              className={`px-6 h-12 rounded-full border text-sm font-medium transition ${currentStep === 1 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className={`px-8 h-12 rounded-full text-white text-sm font-medium transition flex items-center gap-2 ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
                }`}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {currentStep === 3
                ? loading
                  ? "Submitting..."
                  : "Complete KYC"
                : loading
                  ? "Loading..."
                  : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
