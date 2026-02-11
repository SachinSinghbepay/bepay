
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IgpsService } from '@/services/igpsService';
import StepTypeSelection from '@/components/igps/onboarding/StepTypeSelection';
import StepBasicDetails from '@/components/igps/onboarding/StepBasicDetails';
import StepDocuments from '@/components/igps/onboarding/StepDocuments';
import StepUBO from '@/components/igps/onboarding/StepUBO';
import { Loader2 } from 'lucide-react';

const igpsService = new IgpsService();

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        type: '', // 'individual' or 'business'
        // Common
        email: '',
        phone: '',
        address: { street: '', city: '', state: '', postalCode: '', country: '' },
        // Individual
        firstName: '',
        lastName: '',
        birthDate: '',
        occupation: '',
        // Business
        organizationName: '', // Usually pre-filled from signup
        identificationNumber: '',
        registrationDate: '',
        businessType: '',
        // Docs
        documents: [],
        // UBO (Array of UBOs)
        ubos: []
    });

    // Load initial user data (to pre-fill email/name/org)
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await igpsService.getProfile();
                if (response.success) {
                    const user = response.data.user;
                    const org = response.data.organization;

                    setFormData(prev => ({
                        ...prev,
                        email: user.email,
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        organizationName: org?.name || ''
                    }));
                } else {
                    // If fetching profile fails (likely auth), redirect to login
                    router.push('/igps/login');
                }
            } catch (error) {
                console.error("Error loading profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [router]);


    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const submitOnboarding = async () => {
        setLoading(true);
        try {
            // 1. Create Sender
            const senderData = {
                type: formData.type,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                ...(formData.type === 'individual' ? {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    birthDate: formData.birthDate,
                    occupation: formData.occupation
                } : {
                    fullName: formData.organizationName, // Use Org Name as Full Name for Business
                    identificationNumber: formData.identificationNumber,
                    registrationDate: formData.registrationDate,
                    businessType: formData.businessType
                })
            };

            const senderRes = await igpsService.createSender(senderData);
            if (!senderRes.success) throw new Error(senderRes.message || "Failed to create sender profile");

            const senderId = senderRes.data.id;

            // 2. Upload Documents
            for (const doc of formData.documents) {
                // Assuming doc has { buffer (base64 subset), fileName, type }
                // In a real app we'd likely use FormData or a pre-signed URL. 
                // The Service expects { fileName, type, blob (base64) }
                await igpsService.uploadSenderDocument(senderId, {
                    fileName: doc.fileName,
                    type: doc.type,
                    blob: doc.base64 // Ensure this is the raw base64 string
                });
            }

            // 3. Create UBOs (if Business)
            if (formData.type === 'business' && formData.ubos.length > 0) {
                for (const ubo of formData.ubos) {
                    await igpsService.createUBO(senderId, ubo);
                }
            }

            // 4. Verify (Trigger backend verification process)
            await igpsService.verifySender(senderId);

            // Success -> Dashboard
            router.push('/igps/dashboard');

        } catch (error) {
            console.error(error);
            alert(`Onboarding failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin h-8 w-8 text-black" />
            </div>
        );
    }

    // Calculate generic progress
    const steps = formData.type === 'business' ? 4 : 3;
    // Business: Type -> Details -> Docs -> UBO
    // Indiv: Type -> Details -> Docs

    const progress = (currentStep / steps) * 100;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-3xl space-y-8">

                {/* Header/Stepper */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Complete your profile</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Step {currentStep} of {steps}
                    </p>
                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-black h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {currentStep === 1 && (
                        <StepTypeSelection
                            selected={formData.type}
                            onSelect={(type) => updateFormData({ type })}
                            onNext={nextStep}
                        />
                    )}

                    {currentStep === 2 && (
                        <StepBasicDetails
                            type={formData.type}
                            data={formData}
                            onChange={updateFormData}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {currentStep === 3 && (
                        <StepDocuments
                            type={formData.type}
                            documents={formData.documents}
                            onChange={(docs) => updateFormData({ documents: docs })}
                            onNext={() => formData.type === 'business' ? nextStep() : submitOnboarding()}
                            onBack={prevStep}
                            isSubmitting={loading && formData.type === 'individual'}
                        />
                    )}

                    {currentStep === 4 && formData.type === 'business' && (
                        <StepUBO
                            ubos={formData.ubos}
                            onChange={(ubos) => updateFormData({ ubos })}
                            onSubmit={submitOnboarding}
                            onBack={prevStep}
                            isSubmitting={loading}
                        />
                    )}

                </div>
            </div>
        </div>
    );
}
