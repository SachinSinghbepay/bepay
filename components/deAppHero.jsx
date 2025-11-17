"use client";

import React ,{ useState } from "react";
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import allNetworks from "@/components/allNetworks";
import Link from "next/link";
import { getDAppsByNetwork, getAirdropsByNetwork, getFeaturedDAppsByNetwork } from "@/lib/dappsData";
import { useFavoriteDapps } from "@/hooks/use-favorite-dapps";

// --- Reusable Sub-Components ---
const SectionHeader = ({ title, actionText, secondaryTitle = null, href }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-4">
      {/* Mobile text-[16px] is default, Desktop is lg:text-xl */}
      <h2 className="text-[16px] lg:text-xl font-semibold text-[#080808]">{title}</h2>
      {secondaryTitle && (
        <span className="text-lg text-gray-400">{secondaryTitle}</span>
      )}
    </div>
    {href ? (
      <Link
        href={href}
        // Mobile text-[14px] is default, Desktop is lg:text-base
        className="flex items-center text-[14px] lg:text-base font-medium text-[#6A6A6A] shrink-0 hover:text-gray-900 transition-colors"
      >
        {actionText} <ChevronRight size={16} className="ml-1" />
      </Link>
    ) : (
      <span className="flex items-center text-sm font-semibold text-gray-500 shrink-0">
        {actionText}
      </span>
    )}
  </div>
);

// --- Filter Component ---
const DAppFilter = ({ activeFilter, setActiveFilter, dappCategories = [] }) => {
    // Filter out 'Top dApps' from dappCategories to avoid duplicates, then add it at the beginning
    const uniqueCategories = dappCategories.filter(cat => cat !== 'Top dApps');
    const filters = ['Top dApps', ...uniqueCategories];

    return (
        // Mobile: horizontal scrollable, Desktop: flex-wrap
        <div className="flex lg:flex-wrap gap-2 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide lg:gap-3">
            {filters.map((filter) => {
                const isActive = activeFilter === filter;
                // Base classes are mobile size, Desktop is lg:text-base
                const baseClasses = "text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-colors flex-shrink-0";
                const activeClasses = "bg-[#333333] text-white shadow-lg";
                // Added lg:border-transparent to remove border on desktop but keep it flexible
                const inactiveClasses = "bg-transparent text-gray-600 hover:bg-gray-100 lg:border-transparent";

                return (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        {filter}
                    </button>
                );
            })}
        </div>
    );
};

// Airdrop List Item - Mobile view is preserved
const AirdropListItem = ({ logo_url, name, short_description, website_url, tag }) => (
  <a
    href={website_url}
    target="_blank"
    rel="noopener noreferrer"
    // Mobile: py-4 ml-2. Desktop: hover style, slightly larger icon/text
    className="flex items-center space-x-4 w-full py-4 ml-2 lg:ml-0 lg:py-3 hover:bg-gray-100 transition-colors rounded-xl"
  >
    <Image
      src={logo_url}
      alt={`${name} logo`}
      width={56} // Original mobile size
      height={56}
      // Desktop: lg:w-64 lg:h-64 (if desired, but 56 is often fine for list items)
      className="rounded-xl flex-shrink-0" 
    />
    <div className="flex-grow overflow-hidden">
      <p className="font-semibold text-gray-900 text-[16px] mb-1 lg:text-lg">{name}</p>
      <p className="text-sm text-gray-500 truncate lg:text-base">{short_description}</p>
    </div>
    {/* Added a subtle external link indicator for desktop sidebar */}
    <ArrowUpRight size={20} className="text-gray-400 mr-2 flex-shrink-0 hidden lg:block" />
  </a>
);

// DApp Card - Mobile view is preserved
const DAppCard = ({ logo_url, name, tag, website_url }) => (
  <a
    href={website_url}
    target="_blank"
    rel="noopener noreferrer"
    // Mobile w-24 is default, Desktop w-28/w-32 with padding/hover
    className="flex flex-col items-center flex-shrink-0 w-24 text-center hover:opacity-80 transition-opacity lg:w-28 lg:p-3 lg:hover:bg-gray-50 lg:rounded-xl"
  >
    <Image
      src={logo_url}
      alt={`${name} logo`}
      width={64} // Original mobile size
      height={64}
      className="rounded-2xl mb-2"
    />
    <p className="font-semibold text-gray-800 text-sm">{name}</p>
    <span className="mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
      {tag}
    </span>
  </a>
);

// Favorite DApp Card - For displaying user's favorite dapps
const FavoriteDAppCard = ({ logo_url, name, tag, website_url, isFavorited, onToggleFavorite }) => (
  <div className="relative group flex flex-col items-center flex-shrink-0 w-24 text-center lg:w-28 lg:p-3 lg:hover:bg-gray-50 lg:rounded-xl">
    <a
      href={website_url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex flex-col items-center hover:opacity-80 transition-opacity"
    >
      <Image
        src={logo_url}
        alt={`${name} logo`}
        width={64}
        height={64}
        className="rounded-2xl mb-2"
      />
      <p className="font-semibold text-gray-800 text-sm">{name}</p>
      <span className="mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
        {tag}
      </span>
    </a>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite({ logo_url, name, tag, website_url });
      }}
      className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors lg:opacity-0 lg:group-hover:opacity-100"
    >
      <Star
        size={16}
        className={`${isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    </button>
  </div>
);

// DApp List Item with favorite button - Mobile view is preserved
const DAppListItem = ({ logo_url, name, tag, short_description, website_url, isFavorited, onToggleFavorite }) => (
  <div className="group relative flex items-center gap-3 bg-[#C0C0C033] rounded-2xl p-4 min-h-[80px] hover:bg-[#C0C0C055] transition-colors lg:min-h-[90px] lg:p-5">
    <Link
      href={`/dapps/${encodeURIComponent(name)}`}
      className="flex items-center gap-3 min-w-0 flex-1"
    >
      <Image
        src={logo_url}
        alt={`${name} logo`}
        width={48} // Original mobile size
        height={48}
        className="rounded-lg flex-shrink-0 lg:w-56 lg:h-56 lg:rounded-xl" // Slightly bigger icon on desktop
      />
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <p className="font-semibold text-[14px] text-gray-900 lg:text-lg truncate mb-1">
          {name}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {short_description}
        </p>
      </div>
    </Link>
    <Link
      href={`/dapps/${encodeURIComponent(name)}?showWarning=true`}
      onClick={(e) => e.stopPropagation()}
      className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition lg:p-3 lg:rounded-xl"
    >
      <ArrowUpRight size={20} className="text-gray-600" />
    </Link>
  </div>
);

// --- The Main Page Component ---
const DAppPage = () => {
  const searchParams = useSearchParams();
  const networkId = searchParams.get('network') || 'all';

  const dAppList = getDAppsByNetwork(networkId);
  const [activeCategory, setActiveCategory] = useState('Top dApps');
  const [expandedCategories, setExpandedCategories] = useState(new Set()); // Start with no categories expanded
  
  // Load favorite dapps
  const { favorites, isLoading: favoritesLoading, toggleFavorite, isFavorited } = useFavoriteDapps();
  
  const featuredDapps = getFeaturedDAppsByNetwork();
  const airdropList = getAirdropsByNetwork();

  // Extract unique categories from DApps
  const dappCategories = [...new Set(dAppList.map(dapp => dapp.category))].sort();

  // Filter DApps based on active category
  const filteredDappList = activeCategory === 'Top dApps' 
    ? dAppList 
    : dAppList.filter(dapp => dapp.category === activeCategory);

  // Check if current category is expanded
  const isCategoryExpanded = expandedCategories.has(activeCategory);
  
  // Show max 6 dapps if not expanded, show all if expanded
  const displayedDappList = isCategoryExpanded 
    ? filteredDappList 
    : filteredDappList.slice(0, 6);
  
  // Check if there are more dapps to show
  const hasMoreDapps = filteredDappList.length > 6;

  const toggleCategoryExpansion = () => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(activeCategory)) {
      newExpanded.delete(activeCategory);
    } else {
      newExpanded.add(activeCategory);
    }
    setExpandedCategories(newExpanded);
  };

  const getNetworkName = () => {
    const networkNames = {
      all: 'All Networks',
      ethereum: 'Ethereum',
      arbitrum: 'Arbitrum',
      avalanche: 'Avalanche',
      base: 'Base',
      polygon: 'Polygon',
      solana: 'Solana',
      tron: 'TRON',
    };
    return networkNames[networkId] || 'DApps';
  };

  return (
    // Mobile: max-w-md mx-auto p-4. Desktop: max-w-7xl, larger padding
    <div className="bg-white max-w-md mx-auto p-4 font-sans lg:max-w-7xl lg:px-8 lg:py-10">
      
      {/* 1. Header/Banner Area (Wider on desktop) */}
      <div className="relative text-white rounded-2xl overflow-hidden mb-4 cursor-pointer lg:rounded-3xl lg:mb-6">
        <Image
          src="/icons/banner.svg"
          alt="Staking opportunities background chart"
          width={800}
          height={180}
          className="w-full h-[100px] lg:h-[160px] object-cover"
          priority
        />
        {/* Added overlay content for desktop banner visibility */}
       
      </div>
      
      {/* 2. Main Content Layout (Desktop Grid - Mobile is single column default) */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* === LEFT COLUMN: Primary DApp List (Takes 2/3 width on desktop) === */}
        <div className="lg:col-span-2">
          
          {/* Featured dApps Section */}
          <div className="mb-8 lg:mb-10">
            <SectionHeader title="Featured dApps" actionText="All" href="#" />
            {/* Mobile and Desktop: horizontal scroll with gap */}
            <div className="mt-4 flex gap-4 overflow-x-auto pb-4 lg:gap-6">
              {featuredDapps.map((dapp, index) => (
                <DAppCard key={dapp.id || `${dapp.name}-featured-${index}`} {...dapp} />
              ))}
            </div>
          </div>

          {/* Favorite dApps Section - Show only if user has favorites */}
          {!favoritesLoading && favorites.length > 0 && (
            <div className="mb-8 lg:mb-10">
              <SectionHeader title="⭐ Your Favorites" actionText={`${favorites.length}`} />
              {/* Mobile and Desktop: horizontal scroll with gap */}
              <div className="mt-4 flex gap-4 overflow-x-auto pb-4 lg:gap-6">
                {favorites.map((dapp, index) => (
                  <FavoriteDAppCard 
                    key={dapp.id || `${dapp.name}-favorite-${index}`} 
                    {...dapp}
                    isFavorited={isFavorited(dapp.name)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* DApps Section Header & Filter */}
          <div className="mb-2 lg:mb-6">
            <SectionHeader
              title="DApps"
              actionText="All Networks"
              href="/allNetworks"
            />
          </div>

          <div className="mb-6">
            <DAppFilter activeFilter={activeCategory} setActiveFilter={setActiveCategory} dappCategories={dappCategories} />
          </div>

          {/* The List at the bottom */}
          <div className="space-y-3 lg:space-y-4">
            {displayedDappList.map((dapp, index) => (
              <DAppListItem 
                key={dapp.id || `${dapp.category}-${dapp.name}-${index}`} 
                {...dapp}
                isFavorited={isFavorited(dapp.name)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* View All button for current category */}
          {hasMoreDapps && !isCategoryExpanded && (
            <div className="flex justify-center mt-6">
              <button
                onClick={toggleCategoryExpansion}
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              >
                View all
              </button>
            </div>
          )}

          {/* Show Less button when expanded */}
          {hasMoreDapps && isCategoryExpanded && (
            <div className="flex justify-center mt-6">
              <button
                onClick={toggleCategoryExpansion}
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              >
                Show less
              </button>
            </div>
          )}
          
          {/* Mobile Airdrops Section Header - Hidden on desktop */}
          <div className="mb-0 mt-8 lg:hidden">
            <SectionHeader
              title="Airdrops"
              actionText="All"
              href="/airdrops"
              secondaryTitle={
                <ChevronRight size={20} className="ml-1 text-gray-500" />
              }
            />
          </div>
          
          {/* Mobile Airdrop List - Hidden on desktop */}
          <div className="space-y-[2px] lg:hidden">
            {airdropList.map((airdrop, index) => (
              <AirdropListItem key={airdrop.id || `${airdrop.name}-mobile-${index}`} {...airdrop} />
            ))}
          </div>
        </div>

        {/* === RIGHT COLUMN: Airdrops/Sidebar (Takes 1/3 width on desktop) === */}
        <div className="hidden lg:block lg:col-span-1"> {/* Hidden on mobile (default) */}
          <div className="sticky top-10 p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-100">
            {/* Airdrops Section Header for Sidebar */}
            <div className="mb-2">
              <SectionHeader
                title="✨ Airdrops & Rewards"
                actionText="View All"
                href="/airdrops"
              />
            </div>
            
            {/* Airdrop List */}
            <div className="space-y-0 divide-y divide-gray-200 -mx-2">
              {/* Only show top 4 for a concise sidebar on desktop */}
              {airdropList.slice(0, 4).map((airdrop, index) => (
                <AirdropListItem key={airdrop.id || `${airdrop.name}-desktop-${index}`} {...airdrop} />
              ))}
            </div>
            
            {/* View All link for Sidebar */}
            <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/airdrops"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors flex items-center"
              >
                View all Airdrop opportunities <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DAppPage;