"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DeleteAccountPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.reason) {
      setError("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.reason.trim().length < 10) {
      setError("Please provide a detailed reason (at least 10 characters)");
      return false;
    }
    return true;
  };

  const checkExistingRequest = async (email) => {
    try {
      const q = query(
        collection(db, "deleteRequests"),
        where("email", "==", email.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking existing request:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const hasExistingRequest = await checkExistingRequest(formData.email);
      if (hasExistingRequest) {
        setError(
          "A deletion request for this email has already been submitted"
        );
        setIsLoading(false);
        return;
      }

      await addDoc(collection(db, "deleteRequests"), {
        email: formData.email.toLowerCase(),
        password: formData.password,
        reason: formData.reason.trim(),
        timestamp: new Date(),
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      setShowSuccessDialog(true);
      setFormData({
        email: "",
        password: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting deletion request:", error);
      setError("Failed to submit deletion request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Header with Delete Account content and Logo */}
        <div className="bg-gradient-to-br from-[#f5f5f5] to-white backdrop-blur-xl rounded-3xl mx-4  mb-6 shadow-xl border border-white/30">
          <div className="flex items-center justify-between p-8 md:p-12">
            {/* Left side - Content */}
            <div className="flex-1 pr-8">
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
                Delete Account
              </h1>
              <p className="text-sm md:text-lg text-gray-700 leading-relaxed max-w-lg">
                Fill in the form below to remove your bepay.money or bepay.business account.
              </p>
            </div>
            {/* Right side - Logo */}
            <div className="flex-shrink-0">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={80}
                  className="w-auto h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Form */}
        <div className="bg-gradient-to-br from-white via-[#f9f9f9] to-[#f6f6f6] backdrop-blur-xl rounded-3xl mx-4 mb-8 shadow-2xl border border-white/30">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Fill in the form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50/90 backdrop-blur-sm border-red-200/50 rounded-2xl"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email and Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="h-14 bg-white/90 border backdrop-blur-sm border-black/50 rounded-2xl focus:border-black focus:ring-0 text-gray-900 placeholder:text-gray-500 shadow-lg"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="h-14 bg-white/90 backdrop-blur-sm border-black/50 rounded-2xl focus:border-black focus:ring-0 text-gray-900 placeholder:text-gray-500 shadow-lg pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Reason Textarea */}
              <div>
                <Textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Provide reason..."
                  className="min-h-[160px] bg-white/90 backdrop-blur-sm border-black/50 rounded-2xl focus:border-black focus:ring-0 text-gray-900 placeholder:text-gray-500 resize-none shadow-lg"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-12 py-4 h-14 bg-black hover:bg-black/90 cursor-pointer text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-0 min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Request Submitted Successfully
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Your account deletion request has been submitted and is now being
              processed. You will receive a confirmation email within 24-48
              hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-black rounded-full hover:bg-black/90 cursor-pointer h-12"
            >
              Understood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
