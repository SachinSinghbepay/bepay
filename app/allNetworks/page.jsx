"use client";
import React from 'react';
import { Globe, Search, ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // 👈 1. Import the Image component

const ASSET_BASE_URL = 'https://assets.bepay.money/nework_assets/';
const NETWORK_STORAGE_KEY = 'bepay_selected_network'; // Key for localStorage

// --- Reusable Row Component for Navigation (No changes needed here) ---
const NetworkLinkItem = ({ icon, name, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center py-4 text-left transition-colors duration-150 px-2 rounded-lg ${
      isSelected ? 'bg-transparent' : 'hover:bg-gray-50'
    }`}
  >
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full mr-4 p-1 flex-shrink-0">
      {typeof icon === 'string' ? (
          <Image 
          src={icon} 
          alt={`${name} logo`} 
          width={24} 
          height={24} 
          className="rounded-full" 
          priority={true} // Optional: for icons above the fold
        />      ) : (
        <div className="text-gray-600">{icon}</div>
      )}
    </div>
    
    <span className="flex-grow font-medium text-gray-800 text-lg">
      {name}
    </span>
    
    {isSelected && <Check size={24} className="text-green-500 flex-shrink-0 ml-2" />}
  </button>
);

// --- Main Page Component ---
const NetworkSelectionPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedNetwork, setSelectedNetwork] = React.useState(null);
  const router = useRouter();

  /**
   * REVISED useEffect to prioritize the selection from URL, then from localStorage.
   */
  React.useEffect(() => {
    const updateSelectedNetworkFromUrl = () => {
      let networkId = null;

      // 1. Check URL Query Parameter (Highest Priority)
      const params = new URLSearchParams(window.location.search);
      const networkFromUrl = params.get('network');

      if (networkFromUrl) {
        networkId = networkFromUrl;
      } else {
        // 2. Check Local Storage (Fallback for Persistence)
        const networkFromStorage = localStorage.getItem(NETWORK_STORAGE_KEY);
        if (networkFromStorage) {
          networkId = networkFromStorage;
        }
      }

      // 3. Update the component state
      setSelectedNetwork(networkId);
      
      // OPTIONAL: If a network was found in storage but not in the URL, you may
      // want to push it to the URL here to keep the URL path consistent.
      // E.g., if (networkId && !networkFromUrl) { router.replace(`/dapps?network=${networkId}`); }
    };

    updateSelectedNetworkFromUrl();

    // Attach listener for 'popstate' (back/forward button)
    window.addEventListener('popstate', updateSelectedNetworkFromUrl);
    
    return () => window.removeEventListener('popstate', updateSelectedNetworkFromUrl);
  }, []); 

  const handleBack = () => {
    router.push('/dapps');
  };

  const networks = [
    { id: 'all', name: 'All networks', icon: <Globe size={20} /> },
    { id: 'ethereum', name: 'Ethereum', icon: ASSET_BASE_URL + 'evm/ethereum/ethereum_evm.png' },
    { id: 'arbitrum', name: 'Arbitrum', icon: ASSET_BASE_URL + 'evm/arbitrum/arb_arbitrum.png' },
    { id: 'avalanche', name: 'Avalanche', icon: ASSET_BASE_URL + 'evm/avalanche/avax_avalanche.png' },
    { id: 'base', name: 'Base', icon: ASSET_BASE_URL + 'evm/base/Base_network.png' },
    { id: 'polygon', name: 'Polygon', icon: ASSET_BASE_URL + 'evm/polygon/matic_polygon.png' },
    { id: 'solana', name: 'Solana', icon: ASSET_BASE_URL + 'solana/solana/sol_solana.png' },
    { id: 'tron', name: 'TRON', icon: ASSET_BASE_URL + 'tron/tron/trx_tron.png' },
  ];

  const handleNetworkClick = (networkId) => {
    // 1. Store the selection for persistence
    localStorage.setItem(NETWORK_STORAGE_KEY, networkId);

    // 2. Update the URL query parameter for immediate navigation state
    router.push(`/dapps?network=${networkId}`);
    
    // 3. Optimistically update local state for immediate visual feedback
    setSelectedNetwork(networkId);
  };

  // Filter networks based on search query (No change needed)
  const filteredNetworks = networks.filter((network) =>
    network.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // ... JSX structure is the same as before ...
    <div className="bg-white min-h-screen max-w-lg mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center text-center px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <button 
          onClick={handleBack}
          className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Networks</h1>
      </div>

      {/* Content Area */}
      <div className="p-5">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search network"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 text-base"
          />
        </div>

        {/* Networks List */}
        <div className="flex flex-col">
          {filteredNetworks.length > 0 ? (
            filteredNetworks.map((network) => (
              <div key={network.id} className="border-b border-gray-100 last:border-b-0 py-1">
                <NetworkLinkItem
                  name={network.name}
                  icon={network.icon}
                  onClick={() => handleNetworkClick(network.id)}
                  isSelected={selectedNetwork === network.id}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No networks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkSelectionPage;