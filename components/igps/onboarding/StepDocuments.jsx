
import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

const DOC_TYPES = {
    individual: [
        { value: 'national_id', label: 'National ID' },
        { value: 'passport', label: 'Passport' },
        { value: 'drivers_license', label: 'Driver\'s License' },
        { value: 'address_proof', label: 'Proof of Address' },
    ],
    business: [
        { value: 'business_registration_proof', label: 'Business Registration' },
        { value: 'address_proof', label: 'Company Address Proof' },
        { value: 'invoice', label: 'Sample Invoice' },
        { value: 'other', label: 'Other' },
    ]
};

export default function StepDocuments({ type, documents, onChange, onNext, onBack, isSubmitting }) {
    const [selectedType, setSelectedType] = useState(DOC_TYPES[type][0].value);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const processFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Result is data:image/png;base64,.....
            // We need to strip the prefix for the API usually, but sometimes API handles it.
            // igpsService.uploadSenderDocument expects 'blob' which is base64 string.
            // Let's keep the full string for now or strip if backend requires raw base64.
            // Usually standard is to send the base64 part.
            const base64 = reader.result.toString().split(',')[1];

            const newDoc = {
                fileName: file.name,
                type: selectedType,
                base64: base64,
                preview: file.type.startsWith('image') ? reader.result : null
            };

            onChange([...documents, newDoc]);
        };
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const removeDoc = (index) => {
        const newDocs = [...documents];
        newDocs.splice(index, 1);
        onChange(newDocs);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Upload Documents</h3>
                <p className="mt-1 text-sm text-gray-500">
                    We need to verify your identity. Your documents are handled securely.
                </p>
            </div>

            {/* Upload Area */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Document Type</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md border"
                    >
                        {DOC_TYPES[type].map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div
                    className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${dragActive ? 'border-black bg-gray-50' : 'border-gray-300'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} accept="image/*,.pdf" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                </div>
            </div>

            {/* Uploaded List */}
            {documents.length > 0 && (
                <div className="bg-gray-50 rounded-md p-4 space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Attached Documents</h4>
                    {documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                            <div className="flex items-center space-x-3">
                                {doc.preview ? (
                                    <img src={doc.preview} alt="preview" className="h-8 w-8 object-cover rounded" />
                                ) : (
                                    <FileText className="h-8 w-8 text-gray-400" />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{doc.fileName}</p>
                                    <p className="text-xs text-gray-500 capitalize">{doc.type.replace(/_/g, ' ')}</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => removeDoc(idx)} className="text-gray-400 hover:text-red-500">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
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
                    onClick={onNext}
                    disabled={isSubmitting || documents.length === 0}
                    className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isSubmitting ? 'Submitting...' : (type === 'individual' ? 'Submit Application' : 'Next Step')}
                </button>
            </div>
        </div>
    );
}
