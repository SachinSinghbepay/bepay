
import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { useEffect } from 'react';
import { IgpsService } from '@/services/igpsService';
import CustomSelect from '@/components/Dashboard-IGPS/components/CustomSelect';

const igpsService = new IgpsService();

export default function StepUBO({ ubos, onChange, onSubmit, onBack, isSubmitting }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingStates, setLoadingStates] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [newUbo, setNewUbo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        ownershipPercent: '',
        address: { street: '', city: '', state: '', postalCode: '', country: '' },
        identity: { countryCode: '', documentType: 'NATIONAL_ID', documentNumber: '' }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setNewUbo(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setNewUbo(prev => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const res = await igpsService.getCountries();
                if (res.success && Array.isArray(res.data)) {
                    const formatted = res.data.map(c => ({
                        label: c.name,
                        value: c.code
                    }));
                    setCountries(formatted);
                }
            } catch (err) {
                console.error("Failed to load countries", err);
            }
        };

        loadCountries();
    }, []);

    useEffect(() => {
        if (!newUbo.address.country) {
            setStates([]);
            return;
        }

        const loadStates = async () => {
            setLoadingStates(true);

            try {
                const res = await igpsService.getStates(newUbo.address.country);

                if (res.success && Array.isArray(res.data)) {
                    const formatted = res.data.map(s => ({
                        label: s.name,
                        value: s.code
                    }));
                    setStates(formatted);
                } else {
                    setStates([]);
                }
            } catch (err) {
                console.error("Failed to load states", err);
                setStates([]);
            }

            setLoadingStates(false);
        };

        loadStates();
    }, [newUbo.address.country]);
    const handleFileChange = async (e, field) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Store base64 without prefix if API expects raw base64, usually APIs expect the full string or just content.
                // The error said "should not be empty", let's assume raw base64 content.
                // IgpsService usually expects Base64.
                const base64String = reader.result.includes(',') ? reader.result.split(',')[1] : reader.result;
                setNewUbo(prev => ({
                    ...prev,
                    identity: { ...prev.identity, [field]: base64String }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addUbo = (e) => {
        e.preventDefault();
        onChange([...ubos, { ...newUbo, ownershipPercent: Number(newUbo.ownershipPercent) }]);
        setNewUbo({
            firstName: '', lastName: '', email: '', phone: '', birthDate: '', ownershipPercent: '',
            address: { street: '', city: '', state: '', postalCode: '', country: '' },
            identity: { countryCode: '', documentType: 'NATIONAL_ID', documentNumber: '' }
        });
        setShowForm(false);
    };

    const editUbo = (index) => {
        setNewUbo(ubos[index]);
        // Remove from list so it can be re-added after editing
        const updated = [...ubos];
        updated.splice(index, 1);
        onChange(updated);
        setShowForm(true);
    };

    const removeUbo = (index) => {
        const updated = [...ubos];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Beneficial Owners</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Add details of individuals who own 25% or more of the company.
                </p>
            </div>

            {/* List of Added UBOs */}
            <div className="space-y-3">
                {ubos.map((ubo, idx) => (
                    <div
                        key={idx}
                        onClick={() => editUbo(idx)}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div>
                            <p className="font-medium text-gray-900">{ubo.firstName} {ubo.lastName}</p>
                            <p className="text-sm text-gray-500">{ubo.ownershipPercent}% Ownership • {ubo.email}</p>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeUbo(idx); }}
                            className="text-red-500 hover:text-red-700 p-2"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add New UBO Form */}
            {showForm ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">New UBO Details</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <input type="text" name="firstName" placeholder="First Name" required value={newUbo.firstName} onChange={handleInputChange} className="p-2 border rounded" />
                        <input type="text" name="lastName" placeholder="Last Name" required value={newUbo.lastName} onChange={handleInputChange} className="p-2 border rounded" />
                        <input type="email" name="email" placeholder="Email" required value={newUbo.email} onChange={handleInputChange} className="p-2 border rounded" />
                        <input type="text" name="phone" placeholder="Phone" required value={newUbo.phone} onChange={handleInputChange} className="p-2 border rounded" />
                        <input type="date" name="birthDate" required value={newUbo.birthDate} onChange={handleInputChange} className="p-2 border rounded" />
                        <input type="number" name="ownershipPercent" placeholder="Ownership %" required value={newUbo.ownershipPercent} onChange={handleInputChange} className="p-2 border rounded" />
                        <div className="sm:col-span-2">
                            <CustomSelect
                                options={countries}
                                value={newUbo.address.country}
                                onChange={(val) =>
                                    setNewUbo(prev => ({
                                        ...prev,
                                        address: {
                                            ...prev.address,
                                            country: val,
                                            state: "" // reset state
                                        }
                                    }))
                                }
                                placeholder="Select Country"
                            />
                        </div>
                        {/* Address */}
                        <input type="text" name="address.street" placeholder="Street" required value={newUbo.address.street} onChange={handleInputChange} className="p-2 border rounded sm:col-span-2" />
                        <input type="text" name="address.city" placeholder="City" required value={newUbo.address.city} onChange={handleInputChange} className="p-2 border rounded" />

                        <div className="">
                            {states.length > 0 ? (
                                <CustomSelect
                                    options={states}
                                    value={newUbo.address.state}
                                    onChange={(val) =>
                                        setNewUbo(prev => ({
                                            ...prev,
                                            address: {
                                                ...prev.address,
                                                state: val
                                            }
                                        }))
                                    }
                                    placeholder={loadingStates ? "Loading..." : "Select State"}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={newUbo.address.state}
                                    onChange={(e) =>
                                        setNewUbo(prev => ({
                                            ...prev,
                                            address: {
                                                ...prev.address,
                                                state: e.target.value
                                            }
                                        }))
                                    }
                                    className="p-2 border rounded"
                                    placeholder="Enter State"
                                />
                            )}
                        </div>
                        <input type="text" name="address.postalCode" placeholder="Postal Code" required value={newUbo.address.postalCode} onChange={handleInputChange} className="p-2 border rounded" />

                        {/* Identity */}
                        <div className="sm:col-span-2 pt-2 border-t mt-2">
                            <p className="text-xs font-medium text-gray-500 mb-2">Identification</p>
                            <div className="grid grid-cols-3 gap-2">
                                <CustomSelect
                                    options={countries}
                                    value={newUbo.identity.countryCode}
                                    onChange={(val) =>
                                        setNewUbo(prev => ({
                                            ...prev,
                                            identity: {
                                                ...prev.identity,
                                                countryCode: val
                                            }
                                        }))
                                    }
                                    placeholder="Select Issue Country"
                                />                                <select name="identity.documentType" value={newUbo.identity.documentType} onChange={handleInputChange} className="p-2 border rounded">
                                    <option value="NATIONAL_ID">National ID</option>
                                    <option value="PASSPORT">Passport</option>
                                </select>
                                <input type="text" name="identity.documentNumber" placeholder="Doc Number" required value={newUbo.identity.documentNumber} onChange={handleInputChange} className="p-2 border rounded" />
                            </div>

                            {/* File Uploads */}
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Document Front</label>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileChange(e, 'documentFront')}
                                        className="mt-1 text-xs"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Document Back</label>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileChange(e, 'documentBack')}
                                        className="mt-1 text-xs"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                        <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                        <button type="button" onClick={addUbo} className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800">Add Owner</button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Beneficial Owner
                </button>
            )}

            <div className="flex justify-between pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting} // Can submit with 0 UBOs if accurate, or enforce >0
                    className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
            </div>
        </div>
    );
}
