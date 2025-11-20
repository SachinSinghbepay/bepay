"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchRecentDApps, trackDAppVisit } from '@/services/dappsService';

const DAppListItem = ({ iconUrl, name, tag, description, url, dappId, lastVisited, visitCount, onVisit }) => {
  const [imgError, setImgError] = useState(false);
  
  const handleClick = () => {
    if (onVisit && dappId) {
      onVisit(dappId);
    }
  };

  // Format the last visited date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
      {!imgError && iconUrl ? (
        <Image 
          src={iconUrl} 
          alt={`${name} logo`} 
          width={56}
          height={56}
          className="rounded-xl flex-shrink-0"
          onError={() => {
            console.log('[DAppListItem] Image failed to load:', iconUrl);
            setImgError(true);
          }}
          unoptimized
        />
      ) : (
        <div className="w-14 h-14 rounded-xl flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-grow overflow-hidden">
        <div className="flex items-center space-x-2 mb-1">
          <p className="font-bold text-gray-900 text-lg">{name}</p>
          <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">{tag}</span>
        </div>
        {description && <p className="text-sm text-gray-500 truncate mb-1">{description}</p>}
        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <span className="flex items-center">
            <Clock size={12} className="mr-1" />
            {formatDate(lastVisited)}
          </span>
          <span>•</span>
          <span>{visitCount} {visitCount === 1 ? 'visit' : 'visits'}</span>
        </div>
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={handleClick}
        className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-blue-50 transition"
      >
        <ArrowUpRight size={20} className="text-gray-600" />
      </a>
    </div>
  );
};

const RecentlyVisitedPage = () => {
  const [recentDapps, setRecentDapps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recently visited dApps
  useEffect(() => {
    const loadRecentDApps = async () => {
      try {
        setLoading(true);
        console.log('[RecentlyVisitedPage] Starting to fetch recent dApps...');
        const data = await fetchRecentDApps();
        console.log('[RecentlyVisitedPage] Loaded recent dApps:', data);
        setRecentDapps(data || []);
        setError(null);
      } catch (err) {
        console.error('[RecentlyVisitedPage] Failed to load recent dApps:', err);
        setError('Failed to load recently visited dApps. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadRecentDApps();
  }, []);

  // Track dApp visit
  const handleDAppVisit = (dappId) => {
    trackDAppVisit(dappId).catch(err => {
      console.warn('[RecentlyVisitedPage] Failed to track visit:', err);
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto p-4 lg:px-8 lg:py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recently visited dApps...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto p-4 lg:px-8 lg:py-10">
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
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-4 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dapps" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to dApps
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Recently Visited
          </h1>
          <p className="text-gray-600">
            Your browsing history of dApps you've visited
          </p>
        </div>

        {/* Recently Visited List */}
        <div className="space-y-4">
          {recentDapps.length > 0 ? (
            recentDapps.map((item, index) => (
              <DAppListItem 
                key={item.dapp.id || `recent-${index}`}
                id={item.dapp.id}
                name={item.dapp.name}
                tag={item.dapp.category}
                description={item.dapp.short_description || item.dapp.long_description?.substring(0, 80) + '...'}
                iconUrl={item.dapp.logo_url}
                url={item.dapp.website_url}
                dappId={item.dapp.id}
                lastVisited={item.last_visited}
                visitCount={item.visit_count}
                onVisit={handleDAppVisit}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="mb-4">
                <Clock size={64} className="mx-auto text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Recently Visited dApps
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring dApps and they'll appear here
              </p>
              <Link 
                href="/dapps"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore dApps
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyVisitedPage;
