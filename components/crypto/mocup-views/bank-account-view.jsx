"use client";

import { MoreVertical, ChevronDown } from "lucide-react";

const accounts = [
  { name: "USD", flag: "🇺🇸", balance: "$1190", sub: "$1190" },
  { name: "EUR", flag: "🇪🇺", balance: "€200", sub: "$230" },
  { name: "CHF", flag: "🇨🇭", balance: "₣49", sub: "$60" },
  { name: "YUAN", flag: "🇨🇳", balance: "¥49", sub: "$60" },
];

export function BankAccountView({ setActiveView }) {
  return (
    <div className="flex h-full flex-col bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex  items-center  rounded-full border border-black/10   text-sm font-medium">
          <button
            onClick={() => setActiveView("debit-card")}
            className="px-4 py-2 text-gray-500"
          >
            Card
          </button>
          <button
            onClick={() => setActiveView("bank-account")}
            className="rounded-full  bg-black px-4 py-2 text-white"
          >
            Bank account
          </button>
        </div>
        <MoreVertical className="h-6 w-6 text-gray-400" />
      </div>
      <div className="my-4">
        <p className="text-sm text-gray-500">Bank account balance</p>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold">1,450</p>
          <div className="flex items-center text-[10px] text-gray-500">
            <span>USD</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="flex-grow space-y-3 overflow-y-auto pr-2">
        {accounts.map((account) => (
          <div
            key={account.name}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{account.flag}</div>
              <div>
                <p className="font-medium">{account.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{account.balance}</p>
              <p className="text-xs text-gray-500">{account.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-full text-[12px] bg-black py-3 font-medium text-white">
        Get a free swiss bank account
      </button>
    </div>
  );
}
