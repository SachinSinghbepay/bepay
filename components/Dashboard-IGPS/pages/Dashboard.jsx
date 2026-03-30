import React, { useEffect, useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import BalanceBreakdown from "../components/BalanceBreakdown";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function Dashboard({ onOpenModal, setActivePage }) {
  const { user, igpsService } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [fiatBalances, setFiatBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [kycDone, setKycDone] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { kycStatus } = useAuth();
  // Function to check KYC completion status
  const checkKYCCompletion = (remainingSteps) => {
    const kycRequiredSteps = ["sender_details_submitted", "documents_uploaded", "ubo_submitted"];
    const needsKYC = kycRequiredSteps.some(step => remainingSteps.includes(step));
    return !needsKYC;
  };

  const fetchData = async () => {
    try {
      if (wallets.length === 0) setLoading(true);
      let currentWallets = [];

      // 1. Try Local Cache (SWR)
      if (igpsService.getLocalBalances) {
        const cached = igpsService.getLocalBalances();
        if (cached && cached.success && Array.isArray(cached.data?.wallets)) {
          const sorted = cached.data.wallets.sort((a, b) => (parseFloat(b.balance) || 0) - (parseFloat(a.balance) || 0));
          currentWallets = sorted;
          setWallets(sorted);
          setFiatBalances(cached.data.fiatBalances || []);
          setTotalBalance(cached.data.totalBalance ?? 0);
        }
      }

      // 2. Fetch Fresh Balances
      try {
        // Fetch fresh balances in background
        const balRes = await igpsService.getWalletBalances();

        if (balRes.success) {
          console.log("Full Balance Response:", balRes.data);

          const wData = balRes.data.wallets || [];
          const fData = balRes.data.fiatBalances || [];
          const sorted = Array.isArray(wData)
            ? wData.sort((a, b) => (parseFloat(b.balance) || 0) - (parseFloat(a.balance) || 0))
            : [];

          setWallets(sorted);
          setFiatBalances(fData);
          // Use backend-computed total (single source of truth)
          setTotalBalance(balRes.data.totalBalance ?? 0);
        }

      } catch (e) {
        console.error("Failed to fetch balances", e);
      }

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

      // Fetch Transactions — always fetch all, filter client-side
      const txnRes = await igpsService.getTransactions({ limit: 20 });
      if (txnRes.success) {
        
        const txns = txnRes.data.transactions || [];
          console.log(txns)

        const mapped = txns.map(tx => {
          const isSent = tx.from?.type === 'user';
          const txType = tx.transactionType || tx.subType || tx.type || "";
          let kind;
          if (txType === 'fiat_to_crypto') kind = 'onramp';
          else if (txType === 'crypto_to_fiat') kind = 'offramp';
          else if (txType === 'fiat_to_fiat') kind = 'transfer';
          else if (txType === 'deposit') kind = 'deposit';
          else kind = isSent ? "sent" : "received";

          const statusRaw = tx.status || "unknown";
          const status = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);

          return {
            id: tx.id,
            amount: tx.amount,
            currency: tx.currency,
            type: isSent ? "sent" : "received",
            kind,
            status,
            statusRaw,
            date: new Date(tx.createdAt).toLocaleString(),
            email: isSent ? (tx.to?.name || tx.to?.email || "Beneficiary") : (tx.from?.name || "Sender"),
            raw: tx
          };
        });

        setAllTransactions(mapped);

        const filtered = activeFilter === "All" ? mapped : mapped.filter(tx =>
          tx.statusRaw === activeFilter.toLowerCase()
        );

        setTransactions(filtered);
      }

      // totalBalance is now set by the API response (includes crypto + fiat)

    } catch (err) {
      console.error("Dashboard fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (user) {
      fetchData();
    }
  }, [user, igpsService, activeFilter]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(true);
    setRefreshing(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-2 lg:space-y-4 overflow-x-hidden">
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
      <div className="rounded-4xl bg-white p-6 border border-gray-100">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-0 justify-between items-start mb-6">


          {/* LEFT */}
          <div className="p-4 lg:p-8 flex-1 min-w-0">
            <div className="flex justify-start items-center gap-2 ">
              <p className="text-[16px] text-[#6A6A6A] font-medium">
                Total available balance
              </p>
              <button
                onClick={handleRefresh}
                className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <svg
                  className={`h-4 w-4 text-gray-600 ${refreshing ? "animate-spin" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4v6h6" />
                  <path d="M20 20v-6h-6" />
                  <path d="M5 15a7 7 0 0011 2l4-4" />
                  <path d="M19 9a7 7 0 00-11-2L4 11" />
                </svg>
              </button>
            </div>
            <p className="text-[#6A6A6A] text-[12px]">
              (Fiat + stablecoins)
            </p>
            {loading && wallets.length === 0 ? (
              <div className="h-[54px] w-[220px] rounded-lg bg-gray-300 animate-pulse mt-2"></div>
            ) : (
              <p className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-gray-900 mt-2">
                ${totalBalance.toFixed(2)}
              </p>
            )}

          </div>

          {/* RIGHT */}
          <div className="rounded-[32px] bg-[#FAFAFA] p-4  w-full xl:max-w-[630px]">
            <BalanceBreakdown wallets={wallets} fiatBalances={fiatBalances} loading={loading} />
          </div>
        </div>
      </div>


      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-3">
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
          icon="/icons/plus.png"
          iconClassName="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mt-3"
        />
        <ActionCard
          title="Get paid"
          bg="bg-[#eef4e4]"
          onClick={() => onOpenModal("get-paid")}
          icon="/icons/get.png"
        />

        <ActionCard
          title="Send"
          bg="bg-[#f5eee6]"
          onClick={() => onOpenModal("new-transfer")}
          icon="/icons/send.png"
        />

      </div>


      {/* SECONDARY ACTIONS */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 auto-rows-fr w-full">
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
      </div> */}

      {/* TRANSACTIONS */}

      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">

        {/* FILTERS */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {["All", ...Array.from(new Set(allTransactions.map(tx => tx.status)))
          ].map(f => (
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
      cursor-pointer
      rounded-3xl bg-white
      p-3 sm:p-4 lg:p-6
      border border-[#D9D9D9]
      flex items-center justify-between
      h-[110px] sm:h-[120px] lg:h-[140px] min-w-0
      ">
      <div className=" h-full w-[60px] sm:w-[70px] lg:w-[80px] rounded-2xl flex items-center justify-center">
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



function ActionCard({ title, bg, icon, iconClassName, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        ${bg}
        h-[180px] sm:h-[220px] lg:h-[270px]
        rounded-4xl
        p-4 sm:p-5 lg:p-6
        flex
        flex-col
        justify-between
        group
      `}
    >
      {/* ICON */}
      <div>
        <Image src={icon} alt="" width={80} height={80} className={iconClassName ?? "h-14 w-14 sm:h-18 sm:w-18 lg:h-22 lg:w-22 object-contain"} />
      </div>

      {/* TITLE */}
      <div className="text-lg lg:text-xl font-semibold text-gray-800">
        {title}
      </div>
    </div>
  );
}



