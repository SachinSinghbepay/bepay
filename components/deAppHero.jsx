'use client';

import React from 'react';
import { ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import allNetworks from "@/components/allNetworks";
import Link from 'next/link'; // Import the Link component for navigation

// --- Reusable Sub-Components ---
const SectionHeader = ({ title, actionText, secondaryTitle = null, href }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {secondaryTitle && <span className="text-lg text-gray-400">{secondaryTitle}</span>}
    </div>
    {/* Use a Link if href is provided, otherwise it's just text */}
    {href ? (
      <Link href={href} className="flex items-center text-sm font-semibold text-blue-600 shrink-0">
        {actionText} <ChevronRight size={16} className="ml-1" />
      </Link>
    ) : (
       <span className="flex items-center text-sm font-semibold text-gray-500 shrink-0">{actionText}</span>
    )}
  </div>
);

const DAppCard = ({ iconUrl, name, tag, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center flex-shrink-0 w-24 text-center hover:opacity-80 transition-opacity">
    <Image src={iconUrl} alt={`${name} logo`} width={64} height={64} className="rounded-2xl mb-2" />
    <p className="font-semibold text-gray-800 text-sm">{name}</p>
    <span className="mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
  </a>
);

const DAppListItem = ({ iconUrl, name, tag, description, url }) => (
  <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-3">
    <Image src={iconUrl} alt={`${name} logo`} width={48} height={48} className="rounded-lg flex-shrink-0" />
    <div className="flex-grow overflow-hidden">
      <div className="flex items-center space-x-2">
        <p className="font-bold text-gray-900">{name}</p>
        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">{tag}</span>
      </div>
      <p className="text-sm text-gray-500 truncate">{description}</p>
    </div>
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"><ArrowUpRight size={20} className="text-gray-600" /></a>
  </div>
);

// --- The Main Page Component ---
const DAppPage = () => {
  const featuredDapps = [
    { name: 'VVS Finance', tag: 'DEX', iconUrl: '/icons/VVS.svg', url: 'https://vvs.finance/' },
    { name: 'Moon-lander', tag: 'DEX', iconUrl: '/icons/moon_lander.svg', url: 'https://moonlander.io/' },
    { name: 'Uniswap',     tag: 'DEX', iconUrl: '/icons/uniswap.svg', url: 'https://app.uniswap.org/' },
    { name: 'Jupiter',     tag: 'DEX', iconUrl: '/icons/jupiter.svg', url: 'https://jup.ag/' },
    { name: 'AAVE',        tag: 'Lending', iconUrl: '/icons/aava.svg', url: 'https://app.aave.com/' },
  ];
  
  const dAppList = [
    { name: 'Hyperliquid bridge', tag: 'Bridge', description: 'Hyperliquid is a decentralized perp...', iconUrl: '/icons/hyperliquid.svg', url: 'https://app.hyperliquid.xyz/bridge' },
    { name: 'Aave', tag: 'Lending', description: 'Aave is an open source and non-cu...', iconUrl: '/icons/aava.svg', url: 'https://app.aave.com/' },
    { name: 'Jupiter', tag: 'DEX', description: 'Best exchange in DeFi. Full stack...', iconUrl: '/icons/jupiter.svg', url: 'https://jup.ag/' },
    { name: 'Morpho', tag: 'Lending', description: 'Morpho is a permissionless decent...', iconUrl: '/icons/morpho.svg', url: 'https://app.morpho.org/' },
    { name: 'EigenLayer', tag: 'Staking', description: 'EigenLayer is a protocol built on Eth...', iconUrl: '/icons/layer.svg', url: 'https://app.eigenlayer.xyz/' },
    { name: 'Lido', tag: 'Staking', description: 'Liquid staking for Ethereum and Pol...', iconUrl: '/icons/liquid.svg', url: 'https://lido.fi/' },
    { name: 'Jito', tag: 'Staking', description: 'Jito network powers the Solana ec...', iconUrl: '/icons/jito.svg', url: 'https://www.jito.network/' },
  ];

  return (
    <div className="bg-white max-w-md mx-auto p-4 font-sans">
      <div className="relative text-white rounded-2xl overflow-hidden mb-8">
        <Image src="/icons/banner.svg" alt="Staking opportunities background" layout="fill" objectFit="cover" className="z-0" />
        <div className="relative z-10 flex items-center p-4 min-h-[120px]">
          {/* Content removed as per your previous edit */}
        </div>
      </div>

      {/* Featured dApps Section */}
      <div className="mb-8">
        <SectionHeader title="Featured dApps" actionText="All" href="#" />
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
          {featuredDapps.map((dapp) => (<DAppCard key={dapp.name} {...dapp} />))}
        </div>
      </div>

      {/* DApps Section */}
      <div className="mb-8">
        {/* THIS IS THE CLICKABLE LINK TO THE NEW PAGE */}
        <SectionHeader 
          title="DApps" 
          actionText="All Networks" 
          href="/allNetworks" 
        />
      </div>

      {/* The List at the bottom */}
      <div className="space-y-3">
        {dAppList.map((dapp) => (
          <DAppListItem key={dapp.name} {...dapp} />
        ))}
      </div>
    </div>
  );
};

export default DAppPage;
