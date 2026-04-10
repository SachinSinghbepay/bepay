import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useState, useRef, useEffect, useMemo } from "react";
import { IgpsService } from "../../../services/igpsService";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const CURRENCY_TO_COUNTRY = {
    USD: 'us', EUR: 'eu', GBP: 'gb', INR: 'in', BRL: 'br', AED: 'ae',
    ZAR: 'za', MXN: 'mx', SGD: 'sg', PHP: 'ph', IDR: 'id', THB: 'th',
    VND: 'vn', MYR: 'my', COP: 'co', ARS: 'ar', JPY: 'jp', AUD: 'au',
    CAD: 'ca', CHF: 'ch', SEK: 'se', NOK: 'no', DKK: 'dk', NZD: 'nz',
    HKD: 'hk', KRW: 'kr', CNY: 'cn', NGN: 'ng', KES: 'ke', GHS: 'gh',
    EGP: 'eg', PKR: 'pk', BDT: 'bd', LKR: 'lk', NPR: 'np', PEN: 'pe',
    CLP: 'cl', UYU: 'uy', TRY: 'tr', SAR: 'sa', QAR: 'qa', KWD: 'kw',
    BHD: 'bh', OMR: 'om', JOD: 'jo', ILS: 'il',
};

function getCurrencyFlagUrl(currency) {
    const code = CURRENCY_TO_COUNTRY[currency?.toUpperCase()];
    if (code) return `https://flagcdn.com/w80/${code}.png`;
    return "/icons/usa.svg";
}

export default function SendGlobalPayoutModal({
    onClose,
    onBack,
    onOpenModal,
    beneficiary, // Pre-selected beneficiary if any
    preselectEmail, // Email from transaction history to auto-match beneficiary
}) {
    const { igpsService } = useAuth();
    const scrollRef = useRef(null);
    // same scroll lock pattern
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);



    // Form State
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(beneficiary || null);
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USDC"); // Source currency
    const [sourceType, setSourceType] = useState("crypto"); // "crypto" | "fiat"
    const [transferType, setTransferType] = useState("WIRE"); // ACH | RTP | WIRE | SWIFT
    const [purposeCode, setPurposeCode] = useState("");
    const [sourceOfFunds, setSourceOfFunds] = useState("");
    const [relationship, setRelationship] = useState("");

    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [customerReferenceId, setCustomerReferenceId] = useState("");
    const [invoice, setInvoice] = useState(null);
    const [fiatBalances, setFiatBalances] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            // Remove data URL prefix (e.g. "data:image/png;base64,")
            const base64Data = base64String.split(',')[1];
            setInvoice({
                fileName: file.name,
                blob: base64Data,
                type: "invoice"
            });
        };
        reader.readAsDataURL(file);
    };

    // Amount & Currency Logic
    // Detect target currency based on beneficiary country
    useEffect(() => {
        if (!selectedBeneficiary) return;

        console.log("Selected Beneficiary:", selectedBeneficiary);
        // Backend returns flattened addressCountry sometimes (e.g. "IN") or nested address.country
        const country = selectedBeneficiary.addressCountry || selectedBeneficiary.address?.country;
        console.log("Beneficiary Country (Resolved):", country);
        console.log("BENEFICIARY FULL:", selectedBeneficiary);

        // Simple mapping - in real app, better to have country info object
        const map = {
            "India": "INR", "IN": "INR",
            "United Kingdom": "GBP", "GB": "GBP",
            "Germany": "EUR", "DE": "EUR",
            "France": "EUR", "FR": "EUR",
            "Ireland": "EUR", "IE": "EUR",
            "Netherlands": "EUR", "NL": "EUR",
            "United States": "USD", "US": "USD",
            "Brazil": "BRL", "BR": "BRL",
            "United Arab Emirates": "AED", "AE": "AED",
            "Mexico": "MXN", "MX": "MXN",
            "South Africa": "ZAR", "ZA": "ZAR",
            "Philippines": "PHP", "PH": "PHP",
            "Indonesia": "IDR", "ID": "IDR",
            "Thailand": "THB", "TH": "THB",
            "Vietnam": "VND", "VN": "VND",
            "Malaysia": "MYR", "MY": "MYR",
            "Colombia": "COP", "CO": "COP",
            "Argentina": "ARS", "AR": "ARS",
            "Singapore": "SGD", "SG": "SGD",
            "Japan": "JPY", "JP": "JPY",
            "Australia": "AUD", "AU": "AUD",
            "Canada": "CAD", "CA": "CAD",
        };

        const target = map[country] || map[country?.toUpperCase()] || "USD";
        console.log("Setting Target Currency to:", target);
        setTargetCurrency(target);
    }, [selectedBeneficiary]);

    // Data State
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [sourceCurrencies, setSourceCurrencies] = useState([]);
    const [quote, setQuote] = useState(null);
    const [loadingQuote, setLoadingQuote] = useState(false);
    const [quoteError, setQuoteError] = useState("");
    const [walletBalances, setWalletBalances] = useState([]);



    const selectedWalletBalance = useMemo(() => {
        if (['USD', 'EUR', 'GBP'].includes(currency)) {
            const fiat = fiatBalances.find(f => f.currency === currency);
            return fiat ? { balance: fiat.balance, currency: fiat.currency } : null;
        }
        const chainMap = {
            solana: "SOL",
            ethereum: "ETH",
            polygon: "POL",
            tron: "TRX"
        };
        return walletBalances.find(w => {
            const normalized = `${w.currency}_${chainMap[w.chain]}`;
            return normalized === currency;
        });
    }, [walletBalances, fiatBalances, currency]);


    // Fetch beneficiaries & currencies

    useEffect(() => {
        const loadData = async () => {
            try {
                const [benRes, walletRes, balanceRes] = await Promise.all([
                    igpsService.listBeneficiaries(),
                    igpsService.listWallets(),
                    igpsService.getWalletBalances()
                ]);
                console.log("========== FULL BENEFICIARIES RESPONSE ==========");
                console.dir(benRes, { depth: null });

                console.log("========== FULL WALLETS RESPONSE ==========");
                console.dir(walletRes, { depth: null });

                // console.log("========== FULL WALLETS BALANCE   ==========");
                // console.dir(balanceRes, { depth: null });

                console.log("WALLET RESPONSE STRUCTURE:", {
                    hasData: !!walletRes.data,
                    dataKeys: walletRes.data ? Object.keys(walletRes.data) : [],
                    fullData: walletRes.data
                })
                // Optional: JSON stringify version
                console.log("BEN JSON:", JSON.stringify(benRes, null, 2));
                console.log("WALLET JSON:", JSON.stringify(walletRes, null, 2));
                if (benRes.success && Array.isArray(benRes.data)) {
                    setBeneficiaries(benRes.data);

                    // Auto-select beneficiary from transaction history
                    if (!beneficiary && preselectEmail) {
                        const match = benRes.data.find((b) => {
                            const name = b.type === "business"
                                ? b.fullName
                                : `${b.firstName} ${b.lastName}`;
                            return (
                                b.email === preselectEmail ||
                                name?.toLowerCase() === preselectEmail?.toLowerCase()
                            );
                        });
                        if (match) setSelectedBeneficiary(match);
                    }
                }

                if (walletRes.success && Array.isArray(walletRes.data?.wallets)) {
                    setSourceCurrencies(walletRes.data.wallets);

                    if (walletRes.data.wallets.length > 0) {
                        setCurrency(walletRes.data.wallets[0].fullCurrency);
                    }
                }

                if (balanceRes.success && Array.isArray(balanceRes.data?.wallets)) {
                    setWalletBalances(balanceRes.data.wallets);
                }

                if (balanceRes.success && Array.isArray(balanceRes.data?.fiatBalances)) {
                    setFiatBalances(balanceRes.data.fiatBalances);
                }

                if (!walletRes.success) {
                    // Fallback defaults
                    setSourceCurrencies([]);
                }
            } catch (err) {
                console.error("Error loading initial data", err);
            }
        };
        loadData();
    }, []);

    // Get Quote Debounced
    useEffect(() => {
        const fetchQuote = async () => {
            const amt = parseFloat(amount);

            // basic validation
            if (!amount || isNaN(amt) || amt <= 0) {
                setQuote(null);
                setQuoteError("");
                return;
            }

            if (amt < 50) {
                setQuote(null);
                setQuoteError("Minimum amount should be $50");
                return;
            }

            // Check if source is fiat (USD, EUR, GBP) or crypto (USDC_POL, etc.)
            const isFiatSource = ['USD', 'EUR', 'GBP'].includes(currency);

            // Update sourceType state
            setSourceType(isFiatSource ? 'fiat' : 'crypto');

            let reqSourceCurrency = currency;
            let reqNetwork = "ETH";

            if (isFiatSource) {
                // Fiat source: no network needed
                reqSourceCurrency = currency;
                reqNetwork = null;
            } else {
                // Find selected wallet to get correct currency code and network
                const selectedWallet = sourceCurrencies.find(w => w.fullCurrency === currency);
                if (selectedWallet) {
                    reqSourceCurrency = selectedWallet.currency;
                    const parts = selectedWallet.fullCurrency.split('_');
                    if (parts.length > 1) reqNetwork = parts[1];
                } else if (currency === "USDC") {
                    reqSourceCurrency = "USDC";
                    reqNetwork = "ETH";
                }
            }

            setLoadingQuote(true);
            setQuoteError("");
            try {
                const quotePayload = {
                    sourceCurrency: reqSourceCurrency,
                    targetCurrency: targetCurrency,
                    sourceAmount: parseFloat(amount),
                };

                // Only add network for crypto sources
                if (reqNetwork) {
                    quotePayload.network = reqNetwork;
                }

                // Add transferType for fiat sources (required for FIAT_TO_FIAT)
                if (isFiatSource) {
                    quotePayload.transferType = transferType;
                } else if (selectedBeneficiary?.paymentInfo?.transferType) {
                    quotePayload.transferType = selectedBeneficiary.paymentInfo.transferType;
                }

                const res = await igpsService.createQuote(quotePayload);

                if (res.success) {
                    setQuote(res.data);
                } else {
                    setQuoteError(res.error || "Failed to get quote");
                    setQuote(null);
                }
            } catch (err) {
                setQuoteError("Error fetching quote");
            } finally {
                setLoadingQuote(false);
            }
        };

        const timer = setTimeout(fetchQuote, 500);
        return () => clearTimeout(timer);
    }, [amount, currency, targetCurrency, sourceCurrencies, transferType]);

    const handleSend = () => {
        if (!quote || !selectedBeneficiary) return;

        const senderWallet = sourceCurrencies.find(w => w.fullCurrency === currency) || null;

        onOpenModal("confirm-globalpayout", {
            quote: quote,
            beneficiary: selectedBeneficiary,
            sourceType,
            senderWallet,
            transferType: sourceType === 'fiat' ? transferType : undefined,
            paymentDetails: {
                purpose: purposeCode,
                sourceOfFunds: sourceOfFunds,
                beneficiaryRelationship: relationship,
                customerReferenceId: customerReferenceId || undefined,
                documents: invoice ? [invoice] : []
            },
            onBack: () => onOpenModal("send-globalpayout"),
            onConfirm: () => onOpenModal("transfer-request-submitted"),
        });
    };

    const formatOption = (val) => ({
        label: val.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        value: val
    });

    const purposeOptions = [
        "payroll", "operational_expense", "vendor_payment", "subsidiary_transfer",
        "accounting_services", "administrative_expenses", "business_profits", "business_travel",
        "educational_expenses", "employee_salary", "family_maintenance_saving", "financial_lease",
        "fines_and_penalties", "freelancer_payment", "hotel_expenses", "insurance_premium",
        "interest_on_loans", "investment_in_real_estate", "investment_in_securities",
        "investment_in_shares", "legal_services", "medical_expenses", "other_personal_services",
        "payment_for_goods_and_services", "personal_travel_and_tour", "pilgrimage_religious_related",
        "repayment_of_loan", "research_and_development_services", "tax_payment",
        "telecommunication_services", "workers_remittances"
    ].map(formatOption);

    const sourceOptions = [
        "advance_from_director", "advance_from_shareholder", "business_income", "claims",
        "compensation", "financial_support_from_children", "financial_support_from_parents",
        "financial_support_from_spouse", "freelance_income", "gambling", "insurance",
        "interest_income", "dividend_income", "issue_of_bond", "issue_of_debenture",
        "issue_of_share", "loans", "property_investment", "rental_income", "leasing_income",
        "retirement_funds", "salary", "saving", "sales_of_assets", "share_investment",
        "tax_refund", "venture_capital"
    ].map(formatOption);

    const relationshipOptions = [
        "business_partner", "children", "colleague", "creditor", "customer", "debtor",
        "director", "employee", "franchisee", "holding_company", "self", "subsidiary_company",
        "supplier", "parents", "relative", "sibling"
    ].map(formatOption);

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">
                {/* HEADER */}
                <div className="relative flex items-center justify-center px-2 sm:px-8 pt-6 mb-8">
                    <button onClick={onBack} className="absolute left-8 text-xl text-gray-500 cursor-pointer">
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={18}
                            height={18}
                        />
                    </button>
                    <h2 className="text-lg font-medium">Global Payout</h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500 cursor-pointer"><Image src="/icons/close.png" alt="close" width={16} height={16} /></button>
                </div>

                {/* BODY */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">

                    {/* BENEFICIARY SELECT */}
                    <Section
                        title="Beneficiary"
                        right={
                            selectedBeneficiary && (
                                <button
                                    onClick={() => setSelectedBeneficiary(null)}
                                    className="text-sm underline cursor-pointer"
                                >
                                    Change
                                </button>
                            )
                        }
                    >
                        {selectedBeneficiary ? (
                            <div className="flex items-center gap-4 bg-[#F7F7F7] rounded-2xl p-4">
                                <div className="p-[1.5px] rounded-xl bg-[#CECECE]">
                                    <div className="bg-[#F5F5F5] rounded-xl p-2">
                                        <img
                                            src={selectedBeneficiary.countryFlagUrl || "/icons/usa.svg"}
                                            alt={selectedBeneficiary.countryName || ""}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <p className="font-medium">
                                        {selectedBeneficiary.type === "business"
                                            ? selectedBeneficiary.fullName
                                            : `${selectedBeneficiary.firstName} ${selectedBeneficiary.lastName}`}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {selectedBeneficiary.bankName || "Bank"}{" "}
                                        {selectedBeneficiary.accountNumber
                                            ? `- ${selectedBeneficiary.accountNumber.slice(-4)}`
                                            : ""}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <CustomSelect
                                    options={beneficiaries.map((b) => ({
                                        value: b.id,
                                        label: b.type === "business"
                                            ? b.fullName
                                            : `${b.firstName} ${b.lastName}`,
                                    }))}
                                    value={selectedBeneficiary?.id || ""}
                                    onChange={(id) => {
                                        const b = beneficiaries.find((x) => x.id === id);
                                        setSelectedBeneficiary(b);
                                    }}
                                    placeholder="Select a beneficiary"
                                />

                                <button
                                    onClick={() => onOpenModal("add-beneficiary")}
                                    className="text-sm text-blue-600 font-medium cursor-pointer"
                                >
                                    + Add new beneficiary
                                </button>
                            </div>
                        )}
                    </Section>


                    {/* AMOUNT */}
                    <Section
                        title="Amount"
                        right={
                            <p className="text-sm text-gray-500">
                                Available balance: <b>
                                    {selectedWalletBalance
                                        ? `${parseFloat(selectedWalletBalance.balance || 0).toFixed(2)} ${selectedWalletBalance.currency}`
                                        : `0.00 ${currency.split('_')[0]}`
                                    }
                                </b>
                            </p>
                        }
                    >
                        <AmountBox
                            amount={amount}
                            setAmount={setAmount}
                            quote={quote}
                            currency={currency}
                            setCurrency={setCurrency}
                            targetCurrency={targetCurrency}
                            sourceCurrencies={sourceCurrencies}
                            fiatBalances={fiatBalances}
                            setSourceType={setSourceType}
                            availableBalance={parseFloat(selectedWalletBalance?.balance || 0)}
                        />
                    </Section>

                    {quoteError && (
                        <p className="text-red-500 text-sm -mt-3">{quoteError}</p>
                    )}


                    {/* TRANSFER TYPE — fiat only */}
                    {sourceType === 'fiat' && (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-500">Transfer Type</label>
                            <CustomSelect
                                options={[
                                    { label: "WIRE", value: "WIRE" },
                                    { label: "ACH", value: "ACH" },
                                    { label: "SWIFT", value: "SWIFT" },
                                    { label: "RTP", value: "RTP" },
                                ]}
                                value={transferType}
                                onChange={setTransferType}
                                placeholder="Select transfer type"
                            />
                        </div>
                    )}

                    {/* PURPOSE */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Purpose</label>
                        <CustomSelect
                            options={purposeOptions}
                            value={purposeCode}
                            onChange={setPurposeCode}
                            placeholder="Select purpose code"
                        />
                    </div>

                    {/* SOURCE */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Source of funds</label>
                        <CustomSelect
                            options={sourceOptions}
                            value={sourceOfFunds}
                            onChange={setSourceOfFunds}
                            placeholder="Select source of funds"
                        />
                    </div>

                    {/* RELATIONSHIP */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Beneficiary Relationship</label>
                        <CustomSelect
                            options={relationshipOptions}
                            value={relationship}
                            onChange={setRelationship}
                            placeholder="Select relationship"
                        />
                    </div>

                    {/* REFERENCE */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Reference <span className="text-gray-400">(optional)</span></label>
                        <input
                            type="text"
                            value={customerReferenceId}
                            onChange={(e) => setCustomerReferenceId(e.target.value)}
                            placeholder="e.g. INV-2026-001, PO#1234"
                            className="w-full h-12 px-4 rounded-2xl bg-[#F7F7F7] text-sm text-gray-800 placeholder:text-gray-400 border border-transparent focus:border-gray-300 focus:outline-none"
                        />
                    </div>

                    {/* INVOICE UPLOAD */}
                    <Section title="Upload invoice or proof of funds">

                        {!invoice ? (
                            /* ===== Upload Box ===== */
                            <label className="w-full h-14 rounded-2xl bg-[#F7F7F7] flex items-center justify-center gap-3 cursor-pointer border">
                                <Image src="/icons/upload.svg" alt="" width={20} height={20} />

                                <span className="text-sm font-medium">
                                    Upload invoice or proof of funds
                                </span>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleFileChange}
                                />
                            </label>
                        ) : (
                            /* ===== Uploaded File Row ===== */
                            <div className="rounded-2xl bg-[#F7F7F7] p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src="/icons/file.svg" alt="" width={20} height={20} />
                                    <span className="text-sm font-medium">
                                        {invoice.fileName}
                                    </span>
                                </div>

                                <button
                                    onClick={() => setInvoice(null)}
                                    className="text-xl text-gray-400 hover:text-gray-600"
                                >
                                    <Image src="/icons/close.png" alt="close" width={20} height={20} />
                                </button>
                            </div>
                        )}

                        {!invoice && (
                            <p className="text-xs text-[#BC4242] mt-2">
                                Source of funds document is required for business-to-business transfers
                                to comply with regulatory requirements.
                            </p>
                        )}

                    </Section>


                    {/* SUMMARY */}

                    {(loadingQuote || quote) && (
                        <>
                            <hr />
                            <div className="grid grid-cols-2 gap-y-4 text-sm pt-4 lg:px-20">

                                {loadingQuote ? (
                                    <div className="col-span-2 text-center text-gray-500 py-4">
                                        Fetching rate...
                                    </div>
                                ) : quote ? (
                                    <>
                                        <SummaryRow
                                            label="Exchange rate"
                                            value={`1 ${quote.sourceCurrency} ≈ ${parseFloat(quote.exchangeRate || 0).toFixed(4)} ${quote.targetCurrency}`}
                                        />

                                        <SummaryRow
                                            label="Processing fee"
                                            value={`${parseFloat(quote.totalFee || 0).toFixed(2)} ${quote.sourceCurrency}`}
                                        // info={<FeeInfo />}
                                        />

                                        <SummaryRow
                                            label="Total receivable"
                                            value={`≈ ${quote.targetAmount} ${quote.targetCurrency}`}
                                            bold
                                        />

                                        <SummaryRow
                                            label="Processing time"
                                            value="1–3 business days"
                                        />
                                    </>
                                ) : null}

                            </div>
                        </>

                    )}
                    {/* FOOTER */}
                    <div className=" py-6 bg-white">
                        <button
                            onClick={handleSend}
                            disabled={!quote || !selectedBeneficiary}
                            className={`w-full h-14 rounded-2xl text-white text-base font-medium transition-all cursor-pointer
                            ${(!quote || !selectedBeneficiary) ? "bg-gray-300 cursor-not-allowed" : "bg-black hover:bg-gray-800"}
                        `}
                        >
                            Send payment
                        </button>

                        <p className="text-[#6A6A6A] text-xs text-center mt-5">We’ll notify you via email once the payment is successful</p>
                    </div>

                </div>


            </div>
        </ModalFrame>
    );
}

function Section({ title, right, children }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{title}</p>
                {right}
            </div>
            {children}
        </div>
    );
}


function AmountBox({
    amount,
    setAmount,
    quote,
    currency,
    setCurrency,
    targetCurrency,
    sourceCurrencies,
    fiatBalances = [],
    setSourceType,
    availableBalance = 0,
}) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const networkIcons = {
        ethereum: "/icons/eth.svg",
        polygon: "/icons/polygon.svg",
        solana: "/icons/solana.svg",
        tron: "/icons/trx.svg"
    };
    return (
        <div className="rounded-2xl space-y-6">

            {/* TOP: Amount */}
            <div className="flex flex-col sm:flex-row justify-between items-start bg-[#F7F7F7] p-5 rounded-xl pl-6">
                {/* dropdown for mobile */}
                <div className=" mb-2 relative">
                    <div className="flex sm:hidden items-center gap-3 bg-[#EBEBEB] py-2 px-2 rounded-xl w-full lg:w-50">

                        {/* TOKEN + NETWORK ICONS */}
                        {fiatBalances.some(f => f.currency === currency) ? (
                            <div className="relative h-10 w-10 pl-2">
                                <img src={getCurrencyFlagUrl(currency)} alt={currency} className="w-8 h-8 rounded-full mt-1 object-cover" />
                            </div>
                        ) : sourceCurrencies.filter(w => w.fullCurrency === currency).map(w => (
                            <div key={w.fullCurrency} className="relative h-10 w-10 pl-2">
                                {w.tokenUrl && (
                                    <Image src={w.tokenUrl} alt="token" width={32} height={32} className="rounded-full mt-1" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                )}
                                {w.networkUrl && (
                                    <Image src={w.networkUrl} alt="network" width={16} height={16} className="absolute -bottom-1 -right-2 rounded-full border-2 border-white" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                )}
                            </div>
                        ))}
                        {/* SELECT DROPDOWN */}
                        <div ref={dropdownRef} className="relative">

                            {/* BUTTON */}
                            <button
                                onClick={() => {
                                    if (sourceCurrencies.length > 0 || fiatBalances.length > 0) {
                                        setOpen(v => !v);
                                    }
                                }}
                                className="flex items-center gap-3 bg-[#EBEBEB] px-4 py-3 rounded-xl border text-[18px] font-semibold min-w-[120px]"
                            >
                                {sourceCurrencies.length === 0 && fiatBalances.length === 0 ? (
                                    <span className="text-gray-400 text-sm">Loading...</span>
                                ) : (
                                    <>
                                        <span>
                                            {sourceCurrencies.find(c => c.fullCurrency === currency)?.currency || currency.split('_')[0]}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* DROPDOWN */}
                            {open && (sourceCurrencies.length > 0 || fiatBalances.some(f => f.currency === 'USD')) && (
                                <div className="absolute mt-2 -right-2 bg-white border rounded-xl shadow-lg z-50 w-45 max-h-64 overflow-y-auto">
                                    {fiatBalances.some(f => f.currency === 'USD') && (
                                        <>
                                            <div className="px-4 py-1.5 text-xs text-gray-400 font-medium border-b">Fiat</div>
                                            {fiatBalances.filter(f => f.currency === 'USD').map((f) => (
                                                <button
                                                    key={f.currency}
                                                    onClick={() => {
                                                        setCurrency(f.currency);
                                                        setSourceType('fiat');
                                                        setOpen(false);
                                                    }}
                                                    className="text-[#6A6A6A] w-full text-left px-6 py-3 font-medium hover:bg-gray-100 text-sm"
                                                >
                                                    {f.currency}{" "}
                                                    <span className="font-light">
                                                        (${parseFloat(f.balance || 0).toFixed(2)})
                                                    </span>
                                                </button>
                                            ))}
                                        </>
                                    )}
                                    {sourceCurrencies.length > 0 && (
                                        <>
                                            <div className="px-4 py-1.5 text-xs text-gray-400 font-medium border-b">Crypto</div>
                                            {sourceCurrencies.map((c) => (
                                                <button
                                                    key={c.fullCurrency}
                                                    onClick={() => {
                                                        setCurrency(c.fullCurrency);
                                                        setSourceType('crypto');
                                                        setOpen(false);
                                                    }}
                                                    className="text-[#6A6A6A] w-full text-left px-6 py-3 font-medium hover:bg-gray-100 text-sm"
                                                >
                                                    {c.currency}{" "}
                                                    <span className="font-light">
                                                        ({c.chain})
                                                    </span>
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>


                    </div>

                </div>

                <div className="flex-1 ">
                    <div className="flex  justify-start gap-8 items-center">
                        <p className="text-sm text-gray-500 mb-2 font-medium">
                            Amount you want to send
                        </p>

                        <div className="gap-4 text-sm text-gray-400 pb-1 font-medium hidden md:flex ">
                            <button onClick={() => setAmount((availableBalance * 0.1).toFixed(2))} className="cursor-pointer hover:text-gray-700">
                                10%
                            </button>
                            <button onClick={() => setAmount((availableBalance * 0.25).toFixed(2))} className="cursor-pointer hover:text-gray-700">
                                25%
                            </button>
                            <button onClick={() => setAmount((availableBalance * 0.5).toFixed(2))} className="cursor-pointer hover:text-gray-700">
                                50%
                            </button>
                            <button onClick={() => setAmount(availableBalance.toFixed(2))} className="cursor-pointer hover:text-gray-700">
                                MAX
                            </button>
                        </div>
                    </div>

                    <div className="flex items-end gap-4">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            placeholder="0"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*\.?\d*$/.test(val)) setAmount(val);
                            }}
                            className="
                               w-full 
                                bg-transparent
                                text-[32px]
                                font-semibold
                                outline-none
                                border-b-1
                                mb-2 sm:mb-0
                            "
                        />
                    </div>
                </div>

                {/* dropdown for Desktop */}

                <div className="relative">
                    <div className="hidden sm:flex items-center gap-3 bg-[#EBEBEB] py-2 px-2 rounded-xl  md:w-50">

                        {/* TOKEN + NETWORK ICONS */}
                        {fiatBalances.some(f => f.currency === currency) ? (
                            <div className="relative h-10 w-10 pl-2">
                                <img src={getCurrencyFlagUrl(currency)} alt={currency} className="w-8 h-8 rounded-full mt-1 object-cover" />
                            </div>
                        ) : sourceCurrencies.filter(w => w.fullCurrency === currency).map(w => (
                            <div key={w.fullCurrency} className="relative h-10 w-10 pl-2">
                                {w.tokenUrl && (
                                    <Image src={w.tokenUrl} alt="token" width={32} height={32} className="rounded-full mt-1" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                )}
                                {w.networkUrl && (
                                    <Image src={w.networkUrl} alt="network" width={16} height={16} className="absolute -bottom-1 -right-2 rounded-full border-2 border-white" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                )}
                            </div>
                        ))}
                        {/* SELECT DROPDOWN */}
                        <div ref={dropdownRef} className="relative ">

                            {/* BUTTON */}
                            <button
                                onClick={() => {
                                    if (sourceCurrencies.length > 0 || fiatBalances.length > 0) {
                                        setOpen(v => !v);
                                    }
                                }}
                                className="flex items-center gap-3 bg-[#EBEBEB] px-4 py-3 rounded-xl text-[18px] font-semibold min-w-[120px] cursor-pointer"
                            >
                                {sourceCurrencies.length === 0 && fiatBalances.length === 0 ? (
                                    <span className="text-gray-400 text-sm">Loading...</span>
                                ) : (
                                    <>
                                        <span>
                                            {sourceCurrencies.find(c => c.fullCurrency === currency)?.currency || currency.split('_')[0]}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* DROPDOWN */}
                            {open && (sourceCurrencies.length > 0 || fiatBalances.some(f => f.currency === 'USD')) && (
                                <div className="absolute mt-2 -right-2 bg-white border rounded-xl shadow-lg z-50 w-45 max-h-64 overflow-y-auto ">
                                    {fiatBalances.some(f => f.currency === 'USD') && (
                                        <>
                                            <div className="px-4 py-1.5 text-xs text-gray-400 font-medium border-b">Fiat</div>
                                            {fiatBalances.filter(f => f.currency === 'USD').map((f) => (
                                                <button
                                                    key={f.currency}
                                                    onClick={() => {
                                                        setCurrency(f.currency);
                                                        setSourceType('fiat');
                                                        setOpen(false);
                                                    }}
                                                    className="text-[#6A6A6A] w-full text-left px-6 py-3 font-medium hover:bg-gray-100 text-sm cursor-pointer"
                                                >
                                                    {f.currency}{" "}
                                                    <span className="font-light ">
                                                        (${parseFloat(f.balance || 0).toFixed(2)})
                                                    </span>
                                                </button>
                                            ))}
                                        </>
                                    )}
                                    {sourceCurrencies.length > 0 && (
                                        <>
                                            <div className="px-4 py-1.5 text-xs text-gray-400 font-medium border-b">Crypto</div>
                                            {sourceCurrencies.map((c) => (
                                                <button
                                                    key={c.fullCurrency}
                                                    onClick={() => {
                                                        setCurrency(c.fullCurrency);
                                                        setSourceType('crypto');
                                                        setOpen(false);
                                                    }}
                                                    className="text-[#6A6A6A] w-full text-left px-6 py-3 font-medium hover:bg-gray-100 text-sm cursor-pointer"
                                                >
                                                    {c.currency}{" "}
                                                    <span className="font-light">
                                                        ({c.chain})
                                                    </span>
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>


                    </div>

                </div>

            </div>

            {/* CENTER ARROW */}
            <div className="flex justify-center">
                <div className="h-14 w-14 -mt-12 rounded-full bg-white shadow-md flex items-center justify-center text-lg">
                    <Image
                        src="/icons/back.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="rotate-270"
                    />
                </div>
            </div>

            {/* BOTTOM: Recipient */}
            <div className="flex justify-between items-end bg-[#F7F7F7] px-5 py-6 rounded-xl pl-6 -mt-10">
                <div>
                    <p className="text-sm text-gray-500 mb-1">
                        Recipient receives
                    </p>

                    <p className="text-3xl font-semibold">
                        {quote ? quote.targetAmount : "0.00"}
                    </p>
                </div>

                <CurrencyPill
                    label={targetCurrency || "USD"}
                    icon={getCurrencyFlagUrl(targetCurrency || "USD")}
                />
            </div>
        </div>
    );
}

function CurrencyDropdown({ label, icon }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* BUTTON */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="
                flex items-center gap-2
                rounded-xl bg-[#EBEBEB] px-3 py-3
                border shadow-sm w-[160px]
                "
            >
                <Image
                    src={icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 flex justify-center items-center pt-1"
                />
                <Image
                    src={icon}
                    alt=""
                    width={32}
                    height={32}
                />
                <span className="text-[20px] font-bold ">{label}</span>
                <span className="text-gray-400 ">
                    <svg

                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
            absolute right-0 mt-2 w-36
            rounded-xl bg-white border shadow-lg
            overflow-hidden z-50
          "
                >
                    <DropdownItem label="USDC" icon="/icons/usdc.png" />
                    <DropdownItem label="USDT" icon="/icons/usdt.png" />
                    <DropdownItem label="DAI" icon="/icons/dai.png" />
                </div>
            )}
        </div>
    );
}

function CurrencyPill({ label, icon }) {
    return (
        <div className="flex justify-center items-center gap-2 bg-[#EBEBEB] border rounded-xl px-3 py-4 w-30 sm:w-50">
            <Image
                src={icon}
                alt=""
                width={28}
                height={28}
                className="rounded-sm w-8 h-5"
            />
            <span className="text-[20px] font-semibold">{label}</span>
        </div>
    );
}

function DropdownItem({ label, icon }) {
    return (
        <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
        >
            <Image
                src={icon}
                alt=""
                width={16}
                height={16}
            />
            {label}
        </button>
    );
}


function SummaryRow({ label, value, bold, info }) {
    return (
        <>
            <span className="text-gray-500 text-[16px]">{label}</span>

            <span
                className={`text-right flex items-center justify-end gap-2
        ${bold ? "font-semibold" : "font-medium"}`}
            >
                {value}
                {info && info}
            </span>
        </>
    );
}

function FeeInfo() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div ref={ref} className="relative inline-block ">
            {/* i BUTTON */}
            <button onClick={() => setOpen(v => !v)}>
                <Image
                    src="/icons/i.svg"
                    alt="info"
                    width={16}
                    height={16}
                    className="w-4"
                />
            </button>

            {/* POPUP */}
            {open && (
                <div className="w-[320px] absolute  top-10 right-full  -translate-y-1/2 ml-4 bg-white rounded-2xl shadow-xl p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fixed cost per transaction</span>
                        <span className="font-medium">USD 10</span>
                    </div>

                    <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-500">Payout fee (0.50%)</span>
                        <span className="font-medium">USD 0.45</span>
                    </div>
                </div>
            )}
        </div>
    );
}