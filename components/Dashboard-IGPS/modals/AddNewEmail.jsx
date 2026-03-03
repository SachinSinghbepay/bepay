import React, { useState } from 'react'
import ModalFrame from "./ModalFrame";
import Image from "next/image";


export default function AddNewEmail({ onClose, onBack }) {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const isFormValid =
        email.trim() && nickname.trim();

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    {/* Back */}
                    <button
                        className="absolute left-8 text-xl text-gray-500"
                        onClick={onBack}
                    >
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </button>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Pay to email
                    </h2>

                    {/* Close */}
                    <button
                        className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* body */}
                <div className='px-10 py-8 space-y-8 flex flex-col justify-between h-full'>
                    <div className='space-y-8'>
                        <div className=''>
                            <label className="text-sm font-medium text-[#6A6A6A] " >Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                className="w-full rounded-xl border px-4 py-3 pr-28 mt-2 text-[#C0C0C0]"
                            />
                            <div className='mt-1 flex gap-1 justify-items-start items-center'>
                                <Image
                                    src="/icons/i.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="w-4"
                                />
                                <p className='text-sm text-[#6A6A6A]'>Funds will be sent to this email address.</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#6A6A6A] ">Nickname</label>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter nickname for this email"
                                className="w-full rounded-xl border px-4 py-3 pr-28 mt-2 text-[#C0C0C0]"
                            />
                        </div>
                    </div>
                    {/* FOOTER */}
                    <div className=" py-6 bg-white ">
                        <button
                            disabled={!isFormValid}
                            className={`w-full py-4 rounded-2xl transition-colors duration-200
                    ${isFormValid
                                    ? "bg-black text-white"
                                    : "bg-[#6A6A6A] text-white cursor-not-allowed"
                                }`}
                        >
                            Save Contact
                        </button>


                    </div>
                </div>
            </div>
        </ModalFrame>
    )
}

