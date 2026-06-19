"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import allNetworks from "@/components/allNetworks";
import Link from 'next/link'; // Import the Link component for navigation
import { fetchDApps, fetchTopDApps, /* fetchRecentDApps, */ fetchCategories, trackDAppVisit } from '@/services/dappsService';



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
        {actionText} <ChevronRight size={16} className="ml-1" />
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
    <div className="flex items-center space-x-4 bg-[#C0C0C033]/60 rounded-2xl p-3">
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
          <span className="text-sm font-medium text-[#080808] bg-[#FFFFFF] px-2 py-0.5 rounded-full">{tag}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        <Image src='/icons/aero-right-up.png' width={40} height={40} className='w-4' alt='visit' />
      </a>
    </div>
  );
};

// --- The Main Page Component ---
const DAppPage = () => {
  const [dapps, setDapps] = useState([]);
  const [topDapps, setTopDapps] = useState([]);
  // const [recentDapps, setRecentDapps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState(null);
  const categoryScrollRef = useRef(null);
  const categoryButtonRefs = useRef({});

  const handleCategorySelect = useCallback((cat) => {
    setSelectedCategory(cat);
    const btn = categoryButtonRefs.current[cat];
    const container = categoryScrollRef.current;
    if (btn && container) {
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({ left: btnLeft - containerWidth / 2 + btnWidth / 2, behavior: 'smooth' });
    }
  }, []);

  const isInitialLoad = useRef(true);

  // Fetch dApps from API on mount or when category changes
  useEffect(() => {
    const loadDApps = async () => {
      try {
        if (isInitialLoad.current) {
          setLoading(true);
        } else {
          setFiltering(true);
        }
        const category = selectedCategory === 'all' ? undefined : selectedCategory;
        const data = await fetchDApps({ limit: 100, category });
        setDapps(data.dapps || []);
        setError(null);
      } catch (err) {
        console.error('[DAppPage] Failed to load dApps:', err);
        setError('Failed to load dApps. Please try again later.');
      } finally {
        setLoading(false);
        setFiltering(false);
        isInitialLoad.current = false;
      }
    };

    loadDApps();
  }, [selectedCategory]);

  // Fetch top dApps
  useEffect(() => {
    const loadTopDApps = async () => {
      try {
        const data = await fetchTopDApps();
        setTopDapps(data.dapps || []);
      } catch (err) {
        console.error('[DAppPage] Failed to load top dApps:', err);
      }
    };
    loadTopDApps();
  }, []);

  // Fetch recent dApps — requires auth, skipped until section is re-enabled
  // useEffect(() => {
  //   const loadRecentDApps = async () => {
  //     try {
  //       const data = await fetchRecentDApps();
  //       setRecentDapps(data || []);
  //     } catch (err) {
  //       console.error('[DAppPage] Failed to load recent dApps:', err);
  //     }
  //   };
  //   loadRecentDApps();
  // }, []);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log('[DAppPage] Starting to fetch categories...');
        const data = await fetchCategories();
        console.log('[DAppPage] Loaded categories:', data);
        setCategories(data || []);
      } catch (err) {
        console.error('[DAppPage] Failed to load categories:', err);
      }
    };

    loadCategories();
  }, []);

  // Track dApp visit
  const handleDAppVisit = (dappId) => {
    trackDAppVisit(dappId).catch(err => {
      console.warn('[DAppPage] Failed to track visit:', err);
    });
  };

  const featuredDapps = topDapps
    .slice(0, 6)
    .map(d => ({
      id: d.id,
      name: d.name,
      tag: d.category,
      iconUrl: d.logo_url,
      url: d.website_url,
    }));

  // const recentDappsList = recentDapps
  //   .slice(0, 5)
  //   .map(item => ({
  //     id: item.dapp.id,
  //     name: item.dapp.name,
  //     tag: item.dapp.category,
  //     iconUrl: item.dapp.logo_url,
  //     url: item.dapp.website_url,
  //   }));

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

          {/* <div className="flex items-center justify-between mb-4">

            <div className="flex gap-6">

              <button
                onClick={() => setActiveTab("favourites")}
                className={`text-[16px] font-semibold ${activeTab === "favourites"
                  ? "text-black"
                  : "text-gray-400"
                  }`}
              >
                Favourites
              </button>

              <button
                onClick={() => setActiveTab("recent")}
                className={`text-[16px] font-semibold ${activeTab === "recent"
                  ? "text-black"
                  : "text-gray-400"
                  }`}
              >
                Recent
              </button>

            </div>

<SectionHeader
  actionText="All"
  href={
    activeTab === "recent" && recentDappsList.length > 0
      ? "/dapps/recently-visited"
      : null
  }
/>
          </div>
          {activeTab === "favourites" && (
            <div className="text-center py-6">
              <p className="text-gray-600 font-medium">No favourites yet.</p>
              <p className="text-sm text-gray-400">
                Open a dApp and tap ☆ to add to your favourite list
              </p>
            </div>
          )}

          {activeTab === "recent" && (
            <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
              {recentDappsList.length > 0 ? (
                recentDappsList.map((dapp, index) => (
                  <DAppCard
                    key={dapp.id || `${dapp.name}-recent-${index}`}
                    {...dapp}
                    dappId={dapp.id}
                    onVisit={handleDAppVisit}
                  />
                ))
              ) : (
                <div className="text-center w-full pt-6 pb-2">
                  <p className="text-gray-600 font-medium">No Recent yet.</p>
                  <p className="text-sm text-gray-400">
                    Your recently visited dApps will appear here. Start exploring!
                  </p>
                </div>
              )}
            </div>
          )} */}
          {/* Featured dApps Section */}
          <div className="mb-8 lg:mb-10">
            <SectionHeader title="Featured dApps" actionText="All" href="#" />
            <div className="mt-4 flex gap-4 overflow-x-auto pb-4 lg:gap-6">
              {featuredDapps.map((dapp, index) => (
                <DAppCard key={dapp.id || `${dapp.name}-featured-${index}`} {...dapp} dappId={dapp.id} onVisit={handleDAppVisit} />
              ))}
            </div>
          </div>



          {/* DApps Section Header */}
          <div className="mb-2 lg:mb-6">
            <SectionHeader
              title="DApps"
              actionText="All Networks"
              href="/allNetworks"
            />
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-6 lg:mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
              <div ref={categoryScrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  ref={(el) => { categoryButtonRefs.current['all'] = el; }}
                  onClick={() => handleCategorySelect('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${selectedCategory === 'all'
                    ? 'bg-[#333333] text-[#F9F9F9] shadow-md'
                    : 'text-[#6A6A6A] hover:bg-gray-200'
                    }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    ref={(el) => { categoryButtonRefs.current[category] = el; }}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-all cursor-pointer ${selectedCategory === category
                     ? 'bg-[#333333] text-[#F9F9F9] shadow-md'
                    : 'text-[#6A6A6A] hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* The List at the bottom */}
          <div className={`space-y-3 lg:space-y-4 transition-opacity duration-200 ${filtering ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {dAppList.length > 0 ? (
              dAppList.map((dapp) => (
                <DAppListItem key={dapp.id} {...dapp} dappId={dapp.id} onVisit={handleDAppVisit} />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No dApps available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAppPage;