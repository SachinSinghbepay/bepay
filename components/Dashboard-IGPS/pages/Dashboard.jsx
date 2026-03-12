import React, { useEffect, useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import BalanceBreakdown from "../components/BalanceBreakdown";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function Dashboard({ onOpenModal, setActivePage }) {
  const { user, igpsService } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [kycDone, setKycDone] = useState(null);
  const { kycStatus } = useAuth();
  // Function to check KYC completion status
  const checkKYCCompletion = (remainingSteps) => {
    const kycRequiredSteps = ["sender_details_submitted", "documents_uploaded", "ubo_submitted"];
    const needsKYC = kycRequiredSteps.some(step => remainingSteps.includes(step));
    return !needsKYC;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let currentWallets = [];

        // 1. Try Local Cache (SWR)
        if (igpsService.getLocalBalances) {
          const cached = igpsService.getLocalBalances();
          if (cached && cached.success && Array.isArray(cached.data?.wallets)) {
            const sorted = cached.data.wallets.sort((a, b) => (parseFloat(b.balance) || 0) - (parseFloat(a.balance) || 0));
            currentWallets = sorted;
            setWallets(sorted);
            setTotalBalance(sorted.reduce((acc, w) => acc + (parseFloat(w.balance || 0)), 0));
          }
        }

        // 2. Fetch Fresh Balances
        try {
          const balRes = await igpsService.getWalletBalances();
          if (balRes.success) {
            console.log("Full Balance Response:", balRes.data);
            const wData = balRes.data.wallets || [];

            if (Array.isArray(wData)) {
              currentWallets = wData.sort((a, b) => {
                return (parseFloat(b.balance) || 0) - (parseFloat(a.balance) || 0);
              });
              setWallets(currentWallets);
              setTotalBalance(currentWallets.reduce((acc, w) => acc + (parseFloat(w.balance || 0)), 0));
            } else {
              console.warn("Expected array in data.wallets", balRes.data);
            }
          }
        } catch (e) {
          console.error("Failed to fetch balances", e);
        }

        setWallets(currentWallets);

        // 3. Fetch KYC Status
        try {
          const kycRes = await igpsService.getKYCStatus();
          if (kycRes.success) {
            const isKYCComplete = checkKYCCompletion(kycRes.data.remainingSteps);
            setKycDone(isKYCComplete);
          }
        } catch (e) {
          console.error("Failed to fetch KYC status", e);
        }

        // Fetch Transactions
        let queryParams = { limit: 5 };
        if (activeFilter !== "All") {
          if (activeFilter !== "All") {
            const f = activeFilter.toLowerCase();
            if (f === 'onramp') queryParams.status = 'fiat_to_crypto';
            else if (f === 'offramp') queryParams.status = 'crypto_to_fiat';
            else queryParams.status = f;
          }
        }

        const txnRes = await igpsService.getTransactions(queryParams);
        if (txnRes.success) {
          const txns = txnRes.data.transactions || [];
          const mapped = txns.map(tx => {
            const isSent = tx.from?.type === 'user';

            let otherParty = isSent
              ? (tx.to?.name || tx.to?.email || "Beneficiary")
              : (tx.from?.name || "Sender");

            return {
              id: tx.id,
              amount: tx.amount,
              currency: tx.currency,
              type: isSent ? "sent" : "received",
              status: (tx.status || "Unknown").charAt(0).toUpperCase() + (tx.status || "").slice(1),
              date: new Date(tx.createdAt).toLocaleString(),
              email: otherParty,
              raw: tx
            };
          });
          setTransactions(mapped);
        }

        // Calculate Total Balance
        const total = currentWallets.reduce((acc, w) => acc + (parseFloat(w.balance || 0)), 0);
        setTotalBalance(total);

      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, igpsService, activeFilter]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 lg:space-y-8 overflow-x-hidden">
  {kycStatus === "incomplete" && (
        <div className="w-full bg-[#E7DED1] rounded-[40px] px-6 py-8 flex flex-col  items-start justify-between gap-3">

          {/* LEFT SIDE */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-xl  flex items-center justify-center">
              <Image
                width={10}
                height={10}
                src='/icons/kyc.svg'
                alt="kyc"
                className="w-10"
              />
            </div>
            <div>
              <p className="text-[14px] sm:text-[16px]  font-medium text-black">
                Complete your KYB/KYC verification to enable bank withdrawals,
                global payouts & full account access.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-6 flex-wrap">

            <button
              onClick={() => setActivePage("kyc")}
              className="px-8 py-4 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition"
            >
              Complete verification
            </button>
            {/* 
            <button className="text-gray-700 hover:text-black transition flex items-center gap-2">
              See what you can do without verification
              <span>›</span>
            </button> */}

          </div>



        </div>
      )}
      {/* BALANCE CARD */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-0 justify-between items-start mb-6">


          {/* LEFT */}
          <div className="p-4 lg:p-8 flex-1 min-w-0">
            <p className="text-[16px] text-[#6A6A6A] font-medium">
              Total available balance
            </p>
            <p className="text-[#6A6A6A] text-[12px]">
              (Fiat + stablecoins)
            </p>
            <p className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-gray-900 mt-2">
              ${totalBalance.toFixed(2)}
            </p>
          </div>

          {/* RIGHT */}
          <div className="rounded-[32px] bg-[#FAFAFA] p-4 shadow-sm w-full xl:max-w-[630px]">
            <BalanceBreakdown wallets={wallets} />
          </div>
        </div>
      </div>


      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <ActionCard
          title="Deposit"
          bg="bg-[#eaf4f8]"
          onClick={() =>
            onOpenModal("deposit-select", {
              showOtherTokens: true,
              showBackButton: false,
              heading: "Deposit",
              previousModal: null
            })
          }
          icon={
            <PlusIcon className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-[#B0CDD8] group-hover:text-[#5A8EA8] transition-colors" />
          }
        />
        <ActionCard
          title="Get paid"
          bg="bg-[#eef4e4]"
          onClick={() => onOpenModal("get-paid")}
          icon={
            <ArrowDownLeftIcon className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-[#C8D7B5] group-hover:text-[#8FA66E]" />
          }
        />

        <ActionCard
          title="Send"
          bg="bg-[#f5eee6]"
          onClick={() => onOpenModal("new-transfer")}
          icon={
            <ArrowUpRightIcon className="h-22 w-22 text-[#DBCAB6] group-hover:text-[#B79A72]" />
          }
        />

      </div>


      {/* SECONDARY ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 auto-rows-fr w-full">
        <SecondaryCard
          icons="/icons/members.svg"
          title="Pay team members"
          desc="Send payment to one or multiple recipients"
        />
        <SecondaryCard
          icons="/icons/beneficiaries.svg"
          title="Add Beneficiaries"
          desc="Add employees, vendors, or freelancers"
          onClick={() => onOpenModal("add-beneficiary")}
        />
      </div>

      {/* TRANSACTIONS */}

      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">

        {/* FILTERS */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {["All", "Deposit", "Sent", "Received", "Onramp", "Offramp"].map(f => (
            <Filter
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : transactions.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-16 space-y-4">
            <p className="text-sm text-gray-500">
              No transactions yet.
            </p>
            <button className="px-6 py-2 rounded-full bg-black text-white text-sm">
              Deposit
            </button>
          </div>
        ) : (
          /* TABLE */
          <div className="space-y-4">

            {/* TABLE HEADER */}
            <div className="hidden lg:grid lg:grid-cols-5 text-sm text-[#6A6A6A] border-b pb-3">
              <span>Amount</span>
              <span>Date</span>
              <span>Status</span>
              <span>To/From</span>
              <span className="text-right">Txn. details</span>
            </div>

            {/* TABLE ROWS */}
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="hidden lg:grid lg:grid-cols-5 items-center py-3 border-b text-sm"
              >
                {/* Amount */}
                <span className={`font-medium ${tx.type === 'sent' ? "text-red-500" : "text-green-500"}`}>
                  {tx.type === 'sent' ? "-" : "+"}
                  {tx.amount} {tx.currency}
                </span>

                {/* Date */}
                <span className="text-[#6A6A6A]">
                  {tx.date}
                </span>

                {/* Status */}
                <span className="flex items-center gap-2 text-[#6A6A6A]">
                  {tx.status}

                  <div
                    className={`h-7 w-7 flex items-center justify-center
    ${tx.type === "sent" ? "bg-red-100" : "bg-green-100"}
    rounded-lg
  `}
                  >
                    <Image
                      src={
                        tx.type === "sent"
                          ? "/icons/redaero.svg"
                          : "/icons/greenaero.svg"
                      }
                      alt=""
                      width={16}
                      height={16}
                    />
                  </div>
                </span>


                {/* Email / Address */}
                <span className="text-[#6A6A6A]  truncate">
                  {tx.email}
                </span>

                {/* View */}
                <button
                  onClick={() =>
                    onOpenModal("txn-details", { transaction: tx })
                  }
                  className="text-right underline text-[#6A6A6A] hover:text-black"
                >
                  View txn. details
                </button>
              </div>
            ))}

            <div className="lg:hidden space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="border rounded-2xl p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between text-sm font-medium">
                    <span className={tx.type === 'sent' ? "text-red-500" : "text-green-500"}>
                      {tx.type === 'sent' ? "-" : "+"}
                      {tx.amount} {tx.currency}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {tx.date}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    {tx.email}
                  </div>

                  <button
                    onClick={() => onOpenModal("txn-details", { transaction: tx })}
                    className="mt-2 text-xs underline text-gray-600"
                  >
                    View details
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

    </div >
  );
}

/* -------- SUB COMPONENTS (local & fine) -------- */

function CurrencyRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}



function SecondaryCard({ title, desc, icons, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
      w-full
      rounded-3xl bg-white
      p-3 sm:p-4 lg:p-6
      border border-[#D9D9D9]
      flex items-center justify-between
      h-[110px] sm:h-[120px] lg:h-[140px] min-w-0
      ">
      <div className="bg-[#EBEBEB] h-full w-[60px] sm:w-[70px] lg:w-[80px] rounded-2xl flex items-center justify-center">
        <Image
          src={icons}
          alt={title}
          width={8}
          height={8}
          className="h-8 w-8"
        />
      </div>
      <div className="flex-1 min-w-0 px-2 sm:px-3">
        <p className="font-semibold text-[#333333] text-base sm:text-lg lg:text-[20px] ml-2">{title}</p>
        <p className="text-xs sm:text-sm lg:text-[14px]  text-[#6A6A6A] ml-2">{desc}</p>
      </div>
      <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12  flex justify-center items-center p-2" >
        <svg width="30" height="30" viewBox="0 0 26  26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="text-[#6A6A6A]">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div >
  );
}

function Filter({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm ${active ? "bg-black text-white" : "border text-gray-600"
        }`}
    >
      {label}
    </button>
  );
}



function ActionCard({ title, bg, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        ${bg}
        h-[180px] sm:h-[220px] lg:h-[270px]
        rounded-[32px]
        p-4 sm:p-5 lg:p-6
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
      <div className="text-lg lg:text-xl font-semibold text-gray-800">
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
