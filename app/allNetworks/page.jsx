"use client";
import React from 'react';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import the router

const ASSET_BASE_URL = 'https://assets.bepay.money/nework_assets/';

// --- Reusable Row Component for Navigation ---
// It's good practice to make it clear this is a link/navigation item
const NetworkLinkItem = ({ icon, name, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center py-4 text-left hover:bg-gray-50 transition-colors duration-150"
  >
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full mr-4 p-1">
      {typeof icon === 'string' ? (
        <Image src={icon} alt={`${name} logo`} width={24} height={24} className="rounded-full" />
      ) : (
        <div className="text-gray-600">{icon}</div>
      )}
    </div>
    
    <span className="flex-grow font-medium text-gray-800 text-lg">
      {name}
    </span>
  </button>
);

// --- Main Page Component ---
const NetworkSelectionPage = () => {
  // Initialize the router
  const router = useRouter();

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

  // This handler will navigate to the dynamic page
  const handleNetworkClick = (networkId) => {
    router.push(`/networks/${networkId}`);
  };

  return (
    <div className="bg-white max-w-lg mx-auto p-4 sm:p-6 font-sans">
      <div className="flex flex-col">
        {networks.map((network) => (
          <div key={network.id} className="border-b border-gray-100 last:border-b-0">
            <NetworkLinkItem
              name={network.name}
              icon={network.icon}
              onClick={() => handleNetworkClick(network.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSelectionPage;