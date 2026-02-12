import React from "react";
import ProfileMenu from "../components/ProfileMenu";
import BalanceBreakdown from "../components/BalanceBreakdown";
import Image from "next/image";

export default function Dashboard({ onOpenModal }) {
  return (
    <div className="px-8 py-4 space-y-8">
      {/* BALANCE CARD */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">

          {/* LEFT: total balance */}
          <div className="col-span-2 p-8">
            <p className="text-[16px] text-[#6A6A6A] font-medium">
              Total available balance
            </p>
            <p className="text-[#6A6A6A] text-[12px]">(Fiat + stablecoins)</p>
            <p className="text-[54px] font-bold text-gray-900 mt-2">
              $100<span className="text-[#C0C0C0]">.00</span>
            </p>
          </div>

          {/* RIGHT: currencies */}
          <div className="rounded-[32px] bg-[#FAFAFA] p-4 shadow-sm w-[630px] max-w-full">
            <BalanceBreakdown />
          </div>
        </div>

      </div>


      {/* ACTION CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <ActionCard
          title="Deposit"
          bg="bg-[#eaf4f8]"
          icon={
            <PlusIcon className="h-22 w-22 text-[#B0CDD8] group-hover:text-[#5A8EA8] transition-colors" />
          }
        />
        <ActionCard
          title="Get paid"
          bg="bg-[#eef4e4]"
          icon={
            <ArrowDownLeftIcon className="h-22 w-22 text-[#C8D7B5] group-hover:text-[#8FA66E]" />
          }
        />

        <ActionCard
          title="Send"
          bg="bg-[#f5eee6]"
          icon={
            <ArrowUpRightIcon className="h-22 w-22 text-[#DBCAB6] group-hover:text-[#B79A72]" />
          }
        />

      </div>


      {/* SECONDARY ACTIONS */}
      <div className="grid grid-cols-2 gap-6">
        <SecondaryCard
          icons="/icons/members.svg"
          title="Pay team members"
          desc="Send payment to one or multiple recipients"
        />
        <SecondaryCard
          icons="/icons/beneficiaries.svg"
          title="Add Beneficiaries"
          desc="Add employees, vendors, or freelancers"
        />
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Filter active label="All" />
          <Filter label="Deposit" />
          <Filter label="Sent" />
          <Filter label="Received" />
          <Filter label="Onramp" />
          <Filter label="Offramp" />
        </div>

        <div className="text-center py-16 space-y-4">
          <p className="text-sm text-gray-500">
            No transactions yet.
          </p>
          <button className="px-6 py-2 rounded-full bg-black text-white text-sm">
            Deposit
          </button>
          <button
            onClick={() =>
              onOpenModal("add-new-swift")}

          >
            View transaction
          </button>
        </div>
      </div>
    </div >
  );
};

/* -------- SUB COMPONENTS (local & fine) -------- */

function CurrencyRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}



function SecondaryCard({ title, desc, icons }) {
  return (
    <div className="rounded-3xl bg-white p-3 border border-[#D9D9D9] flex justify-between items-center h-[140px]">
      <div className="bg-[#EBEBEB] h-full w-[80px] rounded-2xl flex items-center justify-center">
        <Image
          src={icons}
          alt={title}
          width={8}
          height={8}
          className="h-8 w-8"
        />
      </div>
      <div>
        <p className="font-semibold text-[#333333] text-[20px]">{title}</p>
        <p className="text-[14px]  text-[#6A6A6A]">{desc}</p>
      </div>
      <div className="h-12 w-12  flex justify-center items-center p-2" >
        <svg width="30" height="30" viewBox="0 0 26  26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="text-[#6A6A6A]">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div >
  );
}

function Filter({ label, active }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-full text-sm ${active ? "bg-black text-white" : "border text-gray-600"
        }`}
    >
      {label}
    </button>
  );
}



function ActionCard({ title, bg, icon }) {
  return (
    <div
      className={`
        ${bg}
        h-[270px]
        rounded-[32px]
        p-6
        flex
        flex-col
        justify-between
        group
      `}
    >
      {/* ICON */}
      <div>
        {icon}
      </div>

      {/* TITLE */}
      <div className="text-xl font-semibold text-gray-800">
        {title}
      </div>
    </div>
  );
}



function PlusIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowDownLeftIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M17 7l-10 10M7 7v10h10" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}
