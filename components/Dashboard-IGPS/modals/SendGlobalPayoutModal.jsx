import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useState, useRef, useEffect } from "react";
import { IgpsService } from "../../../services/igpsService";

const igpsService = new IgpsService();

export default function SendGlobalPayoutModal({
    onClose,
    onBack,
    onOpenModal,
    beneficiary, // Pre-selected beneficiary if any
}) {

    const scrollRef = useRef(null);

    // Form State
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(beneficiary || null);
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USDC"); // Source currency
    const [purposeCode, setPurposeCode] = useState("");
    const [sourceOfFunds, setSourceOfFunds] = useState("");
    const [relationship, setRelationship] = useState("");

    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [invoice, setInvoice] = useState(null);

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

        // Simple mapping - in real app, better to have country info object
        const map = {
            "India": "INR", "IN": "INR",
            "United Kingdom": "GBP", "GB": "GBP",
            "Germany": "EUR", "DE": "EUR",
            "France": "EUR", "FR": "EUR",
            "Ireland": "EUR", "IE": "EUR",
            "Netherlands": "EUR", "NL": "EUR",
            "United States": "USD", "US": "USD"
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

    // Fetch beneficiaries & currencies
    // Fetch beneficiaries & currencies
    useEffect(() => {
        const loadData = async () => {
            try {
                const [benRes, walletRes] = await Promise.all([
                    igpsService.listBeneficiaries(),
                    igpsService.listWallets()
                ]);

                if (benRes.success && Array.isArray(benRes.data)) {
                    setBeneficiaries(benRes.data);
                }

                if (walletRes.success && walletRes.data && Array.isArray(walletRes.data.wallets)) {
                    setSourceCurrencies(walletRes.data.wallets);
                    if (walletRes.data.wallets.length > 0) {
                        setCurrency(walletRes.data.wallets[0].fullCurrency);
                    }
                } else {
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
            if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
                setQuote(null);
                return;
            }

            // Find selected wallet to get correct currency code and network
            const selectedWallet = sourceCurrencies.find(w => w.fullCurrency === currency);
            // If strictly matching wallet not found (e.g. initial load or fallback), might default or return
            // For now, if we have wallets, we expect a match. If no wallets (fallback), we might use raw string?
            // Let's assume strict match if wallets exist.

            let reqSourceCurrency = currency;
            let reqNetwork = "ETH";

            if (selectedWallet) {
                reqSourceCurrency = selectedWallet.currency;
                // Parse network from fullCurrency (USDT_TRX -> TRX) or map chain
                const parts = selectedWallet.fullCurrency.split('_');
                if (parts.length > 1) reqNetwork = parts[1];
            } else if (currency === "USDC") {
                // Fallback default
                reqSourceCurrency = "USDC";
                reqNetwork = "ETH";
            }

            setLoadingQuote(true);
            setQuoteError("");

            try {
                const res = await igpsService.createQuote({
                    sourceCurrency: reqSourceCurrency,
                    targetCurrency: targetCurrency,
                    sourceAmount: parseFloat(amount),
                    network: reqNetwork
                });

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
    }, [amount, currency, targetCurrency, sourceCurrencies]);

    const handleSend = () => {
        if (!quote || !selectedBeneficiary) return;

        onOpenModal("confirm-globalpayout", {
            quote: quote,
            beneficiary: selectedBeneficiary,
            paymentDetails: {
                purpose: purposeCode,
                sourceOfFunds: sourceOfFunds,
                beneficiaryRelationship: relationship,
                documents: invoice ? [invoice] : []
            },
            onBack: () => onOpenModal("send-globalpayout"), // Return here
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
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button onClick={onBack} className="absolute left-8 text-xl text-gray-500">
                        <img src="/icons/back.svg" alt="" />
                    </button>
                    <h2 className="text-lg font-medium">Send Global Payout</h2>
                    <button onClick={onClose} className="absolute right-8 text-xl text-gray-500">✕</button>
                </div>

                {/* BODY */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">

                    {/* BENEFICIARY SELECT */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Beneficiary</label>
                        {selectedBeneficiary ? (
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50">
                                <div className="font-medium">{selectedBeneficiary.type === 'business' ? selectedBeneficiary.fullName : selectedBeneficiary.firstName + ' ' + selectedBeneficiary.lastName}</div>
                                <button onClick={() => setSelectedBeneficiary(null)} className="text-sm text-red-500">Change</button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <select
                                    className="w-full h-12 rounded-xl border px-4 outline-none"
                                    onChange={(e) => {
                                        const b = beneficiaries.find(x => x.id === e.target.value);
                                        setSelectedBeneficiary(b);
                                    }}
                                    value=""
                                >
                                    <option value="" disabled>Select a beneficiary</option>
                                    {beneficiaries.map(b => (
                                        <option key={b.id} value={b.id}>
                                            {b.type === 'business' ? b.fullName : `${b.firstName} ${b.lastName}`}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => onOpenModal("add-new-swift")}
                                    className="text-sm text-blue-600 font-medium pl-1"
                                >
                                    + Add new beneficiary
                                </button>
                            </div>
                        )}
                    </div>

                    {/* AMOUNT */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">You send</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-14 rounded-xl border px-4 text-lg outline-none pr-32"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="bg-transparent font-medium text-gray-700 outline-none cursor-pointer appearance-none pr-4 text-right"
                                    style={{ textAlignLast: 'right' }}
                                >
                                    {Array.isArray(sourceCurrencies) && sourceCurrencies.map(c => (
                                        <option key={c.fullCurrency} value={c.fullCurrency}>
                                            {c.currency} ({c.chain})
                                        </option>
                                    ))}
                                    {(!Array.isArray(sourceCurrencies) || sourceCurrencies.length === 0) && <option value="USDC">USDC (Loading...)</option>}
                                </select>
                                {/* We could dynamic load icons, for now keep static or simple */}
                                {/* <img src="/icons/usdc.svg" className="w-6 h-6" alt="USDC" /> */}
                            </div>
                        </div>
                    </div>

                    {/* QUOTE SUMMARY */}
                    {(loadingQuote || quote) && (
                        <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                            {loadingQuote ? (
                                <p className="text-center text-gray-500">Fetching rate...</p>
                            ) : quote ? (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Exchange Rate</span>
                                        <span className="font-medium">1 {quote.sourceCurrency} = {quote.exchangeRate} {quote.targetCurrency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Fees</span>
                                        <span className="font-medium">{quote.fee} {quote.sourceCurrency}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 mt-2">
                                        <span className="text-gray-900 font-medium">Recipient gets</span>
                                        <span className="font-bold text-lg">{quote.targetAmount} {quote.targetCurrency}</span>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    )}
                    {quoteError && <p className="text-red-500 text-sm">{quoteError}</p>}

                    {/* PURPOSE */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Purpose code</label>
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

                    {/* INVOICE UPLOAD */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Invoice (Required for Goods & Services)</label>
                        <div className="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept=".pdf,.png,.jpg,.jpeg"
                            />
                            {invoice ? (
                                <div className="flex items-center gap-2 text-green-600 font-medium">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="truncate max-w-[200px]">{invoice.fileName}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <span className="text-2xl mb-1">+</span>
                                    <span className="text-sm">Upload Invoice</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-8 py-6 border-t bg-white">
                    <button
                        onClick={handleSend}
                        disabled={!quote || !selectedBeneficiary}
                        className={`w-full h-14 rounded-2xl text-white text-base font-medium transition-all
                            ${(!quote || !selectedBeneficiary) ? "bg-gray-300 cursor-not-allowed" : "bg-black hover:bg-gray-800"}
                        `}
                    >
                        Send payment
                    </button>
                </div>
            </div>
        </ModalFrame>
    );
}