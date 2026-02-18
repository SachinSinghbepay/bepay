
import React from 'react';
import { User, Building2 } from 'lucide-react';

export default function StepTypeSelection({ selected, onSelect, onNext }) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Choose Account Type</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Select the type of account you want to create to start moving money.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Individual Card */}
                <div
                    onClick={() => onSelect('individual')}
                    className={`relative rounded-lg border p-6 bg-white shadow-sm flex flex-col items-center cursor-pointer hover:border-black transition-all ${selected === 'individual' ? 'border-2 border-black ring-1 ring-black' : 'border-gray-300'
                        }`}
                >
                    <div className="p-3 rounded-full bg-gray-100 mb-4">
                        <User className="h-8 w-8 text-gray-700" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Individual</h4>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        For personal payments, transfers, and managing your own finances.
                    </p>
                </div>

                {/* Business Card */}
                <div
                    onClick={() => onSelect('business')}
                    className={`relative rounded-lg border p-6 bg-white shadow-sm flex flex-col items-center cursor-pointer hover:border-black transition-all ${selected === 'business' ? 'border-2 border-black ring-1 ring-black' : 'border-gray-300'
                        }`}
                >
                    <div className="p-3 rounded-full bg-gray-100 mb-4">
                        <Building2 className="h-8 w-8 text-gray-700" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Business</h4>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        For companies, startups, and organizations to pay vendors and employees globally.
                    </p>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!selected}
                    className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}
