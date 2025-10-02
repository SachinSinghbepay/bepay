import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import Image from 'next/image';

// --- Base URL for all network assets ---
const ASSET_BASE_URL = 'https://assets.bepay.money/nework_assets/';

// --- Reusable Row Component ---
const NetworkItem = ({ icon, name, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center py-4 text-left hover:bg-gray-50 transition-colors duration-150"
  >
    {/* Icon */}
    <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full mr-4">
      {/* This logic handles both string URLs (from assets) and JSX icons like <Globe /> */}
      {typeof icon === 'string' ? (
        <Image src={icon} alt={`${name} logo`} width={24} height={24} />
      ) : (
        <div className="text-white">{icon}</div>
      )}
    </div>
    
    {/* Network Name */}
    <span className="flex-grow font-medium text-gray-800 text-lg">
      {name}
    </span>
    
    {/* Checkmark (only shows if selected) */}
    {isSelected && (
      <Check size={24} className="text-blue-600 flex-shrink-0" />
    )}
  </button>
);

// --- Main Page Component ---
const NetworkSelectionPage = () => {
  // State to keep track of the selected network's ID
  const [selectedNetworkId, setSelectedNetworkId] = useState('all');

  // Corrected Data for all the networks
  const networks = [
    { id: 'all', name: 'All networks', icon: <Globe size={20} /> },
    
    // Remote Assets (using full URLs)
    { id: 'ethereum', name: 'Ethereum', icon: ASSET_BASE_URL + 'evm/ethereum/ethereum_evm.png' },
    { id: 'arbitrum', name: 'Arbitrum', icon: ASSET_BASE_URL + 'evm/arbitrum/arb_arbitrum.png' },
    { id: 'avalanche', name: 'Avalanche', icon: ASSET_BASE_URL + 'evm/avalanche/avax_avalanche.png' },
    { id: 'base', name: 'Base', icon: ASSET_BASE_URL + 'evm/base/Base_network.png' },
    { id: 'polygon', name: 'Polygon', icon: ASSET_BASE_URL + 'evm/polygon/matic_polygon.png' },
    { id: 'solana', name: 'Solana', icon: ASSET_BASE_URL + 'solana/solana/sol_solana.png' },
    { id: 'tron', name: 'TRON', icon: ASSET_BASE_URL + 'tron/tron/trx_tron.png' },

    // Placeholder/Original Local Assets (You may need to change these to remote URLs as well)
    { id: 'btc', name: 'BTC', icon: '/icons/networks/btc.svg' },
    { id: 'ton', name: 'TON', icon: '/icons/networks/ton.svg' },
    { id: 'xrpl', name: 'XRPL', icon: '/icons/networks/xrpl.svg' },
    { id: 'sui', name: 'SUI', icon: '/icons/networks/sui.svg' },
  ];

  return (
    <div className="bg-white max-w-lg mx-auto p-4 sm:p-6 font-sans">
      <div className="flex flex-col">
        {networks.map((network) => (
          <div key={network.id} className="border-b border-gray-100 last:border-b-0">
            <NetworkItem
              name={network.name}
              icon={network.icon}
              isSelected={selectedNetworkId === network.id}
              onClick={() => setSelectedNetworkId(network.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSelectionPage;