
import React from 'react';

export default function StepBasicDetails({ type, data, onChange, onNext, onBack }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested address fields
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            onChange({
                address: {
                    ...data.address,
                    [field]: value
                }
            });
        } else {
            onChange({ [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {type === 'individual' ? 'Personal Details' : 'Business Information'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Please provide correct details as they appear on your official documents.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                {/* === INDIVIDUAL FIELDS === */}
                {type === 'individual' && (
                    <>
                        <div className="sm:col-span-3">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    autoComplete="given-name"
                                    required
                                    value={data.firstName}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    autoComplete="family-name"
                                    required
                                    value={data.lastName}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    name="birthDate"
                                    id="birthDate"
                                    required
                                    value={data.birthDate}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="occupation"
                                    id="occupation"
                                    value={data.occupation}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* === BUSINESS FIELDS === */}
                {type === 'business' && (
                    <>
                        <div className="sm:col-span-6">
                            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Company Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="organizationName"
                                    id="organizationName"
                                    required
                                    value={data.organizationName}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="identificationNumber"
                                    id="identificationNumber"
                                    required
                                    value={data.identificationNumber}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Date of Incorporation</label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    name="registrationDate"
                                    id="registrationDate"
                                    required
                                    value={data.registrationDate}
                                    onChange={handleChange}
                                    className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type</label>
                            <select
                                id="businessType"
                                name="businessType"
                                required
                                value={data.businessType}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md border"
                            >
                                <option value="">Select Type</option>
                                <option value="corporation">Corporation</option>
                                <option value="llc">LLC</option>
                                <option value="partnership">Partnership</option>
                                <option value="sole_proprietorship">Sole Proprietorship</option>
                            </select>
                        </div>
                    </>
                )}

                {/* === COMMON FIELDS === */}
                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={data.email}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            required
                            value={data.phone}
                            onChange={handleChange}
                            placeholder="+1234567890"
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                {/* Address Section */}
                <div className="sm:col-span-6 pt-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Address</h4>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="address.street"
                            id="street"
                            required
                            value={data.address.street}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="address.city"
                            id="city"
                            required
                            value={data.address.city}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="address.state"
                            id="state"
                            required
                            value={data.address.state}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="address.postalCode"
                            id="postalCode"
                            required
                            value={data.address.postalCode}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <div className="mt-1">
                        <select
                            id="country"
                            name="address.country"
                            autoComplete="country-name"
                            required
                            value={data.address.country}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="IN">India</option>
                            {/* Add more countries as needed */}
                        </select>
                    </div>
                </div>

            </div>

            <div className="flex justify-between pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
                >
                    Next Step
                </button>
            </div>
        </form>
    );
}
