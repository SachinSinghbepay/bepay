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
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>{secondaryTitle && <span className="text-lg text-gray-400">{secondaryTitle}</span>}
    </div>{href ? (
      <Link href={href} className="flex items-center text-[14px] font-medium text-[#6A6A6A] shrink-0">{actionText} <ChevronRight size={16} className="ml-1" /></Link>
    ) : (
       <span className="flex items-center text-sm font-semibold text-gray-500 shrink-0">{actionText}</span>
    )}
  </div>
);

// Airdrop List Item - Simplified for minimal look, adjusted spacing
const AirdropListItem = ({ logo_url, name, description, website_url, tag }) => (
  <a href={website_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 w-full py-4 ml-2">
    <Image src={logo_url} alt={`${name} logo`} width={56} height={56} className="rounded-xl flex-shrink-0" />
    <div className="flex-grow overflow-hidden">
      <p className="font-semibold text-gray-900 text-[16px] mb-1">
        {name}
      </p>
      <p className="text-sm text-gray-500 truncate">
        {description}
      </p>
    </div>
  </a>
);


const DAppCard = ({ logo_url, name, tag, website_url }) => (
  <a href={website_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center flex-shrink-0 w-24 text-center hover:opacity-80 transition-opacity">
    <Image src={logo_url} alt={`${name} logo`} width={64} height={64} className="rounded-2xl mb-2" />
    <p className="font-semibold text-gray-800 text-sm">{name}</p>
    <span className="mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
  </a>
);

const DAppListItem = ({ logo_url, name, tag, description, website_url }) => (
  <div className="flex items-center space-x-4 bg-[#C0C0C033] rounded-2xl p-4 min-h-[80px]">
    <Image src={logo_url} alt={`${name} logo`} width={48} height={48} className="rounded-lg flex-shrink-0" />
    <div className="flex-grow overflow-hidden">
      <div className="flex items-center space-x-2">
        <p className="font-semibold text-[14px] text-gray-900 whitespace-nowrap">{name}</p>
        <span className="text-[12px] font-medium text-[#080808] bg-[#FFFFFF] px-2 py-0.5 rounded-full">{tag}</span>
      </div>
      <p className="text-sm text-gray-500 truncate">{description}</p>
    </div>
    <a href={website_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"><ArrowUpRight size={20} className="text-gray-600" /></a>
  </div>
);

// --- The Main Page Component ---
const DAppPage = () => {
  const featuredDapps = [
    { name: 'VVS Finance', tag: 'DEX', logo_url: '/icons/VVS.svg', website_url: 'https://vvs.finance/' },
    { name: 'Moon-lander', tag: 'DEX', logo_url: '/icons/moon_lander.svg', website_url: 'https://moonlander.io/' },
    { name: 'Uniswap',     tag: 'DEX', logo_url: '/icons/uniswap.svg', website_url: 'https://app.uniswap.org/' },
    { name: 'Jupiter',     tag: 'DEX', logo_url: '/icons/jupiter.svg', website_url: 'https://jup.ag/' },
    { name: 'AAVE',        tag: 'Lending', logo_url: '/icons/aava.svg', website_url: 'https://app.aave.com/' },
  ];

  // Airdrop Data to match the image
  const airdropList = [
    { name: 'Mitosis airdrop claim', description: 'Mitosis airdrop checker is LIVE', logo_url: '/icons/mitosis.png', website_url: '#' },
    { name: 'Somnia airdrop claim', description: 'Somnia airdrop checker is LIVE', logo_url: '/icons/somnia.png', website_url: '#' },
    { name: 'Etherscan points', description: 'Celebrate Etherscan\'s 10th anniversary with...', logo_url: '/icons/etherscan.png', website_url: '#' },
    { name: 'Gaia airdrop claim', description: 'Gaia airdrop checker is LIVE', logo_url: '/icons/gaia.png', website_url: '#' },
    { name: 'Newton Airdrop claim', description: 'Newtom airdrop checker is LIVE', logo_url: '/icons/newton.png', website_url: '#' },
    { name: 'Zora airdrop claim', description: '$ZORA is LIVE', logo_url: '/icons/zora.png', website_url: '#' },
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
      <div className="relative text-white rounded-2xl overflow-hidden mb-8 min-h-[120px] cursor-pointer"> 
        
        {/* The background image - Assumes /icons/banner.svg is the dark chart background */}
        <Image 
          src="/icons/banner.svg" 
          alt="Staking opportunities background chart" 
          layout="fill" 
          objectFit="contain" // 💡 Changed from "cover" to "contain"
          className="z-0" 
          priority 
        />
        
        {/* The Content layer: Icon, Text, and Arrow */}
       
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
      {/* View All link - Positioned above the Airdrops section, centered, and clickable */}
      <div className="flex justify-center mb-6">
        <Link href="/airdrops" className="mt-10 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors">
          View all
        </Link>
      </div>
      {/* Airdrops Section Header */}
      <div className="mb-0">
        <SectionHeader
          title="Airdrops"
          actionText="All"
          href="/airdrops"
          secondaryTitle={<ChevronRight size={20} className="ml-1 text-gray-500" />} />
      </div><div className="space-y-[2px]">{airdropList.map((airdrop) => (
          <AirdropListItem key={airdrop.name} {...airdrop} />
        ))}</div>
    </div>
  );
};

export default DAppPage;