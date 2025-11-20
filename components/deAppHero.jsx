"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import allNetworks from "@/components/allNetworks";
import Link from 'next/link'; // Import the Link component for navigation
import { fetchDApps, fetchTopDApps, trackDAppVisit } from '@/services/dappsService';


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

const DAppCard = ({ iconUrl, name, tag, url, dappId, onVisit }) => {
  const [imgError, setImgError] = useState(false);
  
  const handleClick = () => {
    if (onVisit && dappId) {
      onVisit(dappId);
    }
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={handleClick}
      className="flex flex-col items-center flex-shrink-0 w-24 text-center hover:opacity-80 transition-opacity"
    >
      {!imgError && iconUrl ? (
        <Image 
          src={iconUrl} 
          alt={`${name} logo`} 
          width={64}
          height={64}
          className="rounded-2xl mb-2"
          onError={() => {
            console.log('[DAppCard] Image failed to load:', iconUrl);
            setImgError(true);
          }}
          unoptimized
        />
      ) : (
        <div className="w-16 h-16 rounded-2xl mb-2 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <p className="font-semibold text-gray-800 text-sm">{name}</p>
      <span className="mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
    </a>
  );
};

const DAppListItem = ({ iconUrl, name, tag, description, url, dappId, onVisit }) => {
  const [imgError, setImgError] = useState(false);
  
  const handleClick = () => {
    if (onVisit && dappId) {
      onVisit(dappId);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-3">
      {!imgError && iconUrl ? (
        <Image 
          src={iconUrl} 
          alt={`${name} logo`} 
          width={48}
          height={48}
          className="rounded-lg flex-shrink-0"
          onError={() => {
            console.log('[DAppListItem] Image failed to load:', iconUrl);
            setImgError(true);
          }}
          unoptimized
        />
      ) : (
        <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-grow overflow-hidden">
        <div className="flex items-center space-x-2">
          <p className="font-bold text-gray-900">{name}</p>
          <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">{tag}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={handleClick}
        className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        <ArrowUpRight size={20} className="text-gray-600" />
      </a>
    </div>
  );
};

// --- The Main Page Component ---
const DAppPage = () => {
  const [dapps, setDapps] = useState([]);
  const [topDapps, setTopDapps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dApps from API on mount
  useEffect(() => {
    const loadDApps = async () => {
      try {
        setLoading(true);
        const data = await fetchDApps({ limit: 100 });
        console.log('[DAppPage] Loaded dApps:', data.dapps?.length, 'dApps');
        console.log('[DAppPage] Sample logo URL:', data.dapps?.[0]?.logo_url);
        setDapps(data.dapps || []);
        setError(null);
      } catch (err) {
        console.error('[DAppPage] Failed to load dApps:', err);
        setError('Failed to load dApps. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDApps();
  }, []);

  // Fetch top dApps from category endpoint
  useEffect(() => {
    const loadTopDApps = async () => {
      try {
        const data = await fetchTopDApps();
        console.log('[DAppPage] Loaded top dApps:', data.dapps?.length, 'dApps');
        setTopDapps(data.dapps || []);
      } catch (err) {
        console.error('[DAppPage] Failed to load top dApps:', err);
      }
    };

    loadTopDApps();
  }, []);

  // Track dApp visit
  const handleDAppVisit = (dappId) => {
    trackDAppVisit(dappId).catch(err => {
      console.warn('[DAppPage] Failed to track visit:', err);
    });
  };

  // Get featured dApps from the top dApps endpoint
  const featuredDapps = topDapps
    .slice(0, 5)
    .map(d => ({
      id: d.id,
      name: d.name,
      tag: d.category,
      iconUrl: d.logo_url,
      url: d.website_url,
    }));

  // Get all dApps for the list
  const dAppList = dapps.map(d => ({
    id: d.id,
    name: d.name,
    tag: d.category,
    description: d.short_description || d.long_description?.substring(0, 50) + '...',
    iconUrl: d.logo_url,
    url: d.website_url,
  }));

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white max-w-md mx-auto p-4 font-sans">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dApps...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white max-w-md mx-auto p-4 font-sans">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-md mx-auto p-4 font-sans">
      <div className="relative text-white rounded-2xl overflow-hidden mb-8 h-[120px]">
        <Image 
          src="/icons/banner.svg" 
          alt="Staking opportunities background" 
          fill
          style={{ objectFit: 'cover' }}
          className="z-0" 
        />
        <div className="relative z-10 flex items-center p-4 min-h-[120px]">
          {/* Content removed as per your previous edit */}
        </div>
      </div>

      {/* Top dApps Section */}
      <div className="mb-8">
        <SectionHeader title="Top dApps" actionText="All" href="#" />
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
          {featuredDapps.length > 0 ? (
            featuredDapps.map((dapp) => (
              <DAppCard key={dapp.id} {...dapp} dappId={dapp.id} onVisit={handleDAppVisit} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No featured dApps available</p>
          )}
        </div>
      </div>

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

      {/* The List at the bottom */}
      <div className="space-y-3">
        {dAppList.length > 0 ? (
          dAppList.map((dapp) => (
            <DAppListItem key={dapp.id} {...dapp} dappId={dapp.id} onVisit={handleDAppVisit} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-8">No dApps available</p>
        )}

      </div>
    </div>
  );
};

export default DAppPage;