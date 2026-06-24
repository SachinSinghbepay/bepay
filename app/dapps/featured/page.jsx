"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchTopDApps, trackDAppVisit } from '@/services/dappsService';

const FeaturedDAppsPage = () => {
  const router = useRouter();
  const [dapps, setDapps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopDApps()
      .then(data => setDapps(data.dapps || []))
      .catch(err => console.error('[FeaturedDApps] Failed to load:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleVisit = (dappId) => {
    trackDAppVisit(dappId).catch(() => {});
  };

  return (
    <div className="bg-white max-w-md mx-auto p-4 font-sans lg:max-w-3xl lg:px-8 lg:py-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[#080808]">Featured dApps</h1>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="space-y-3">
          {dapps.map((d) => (
            <DAppRow
              key={d.id}
              id={d.id}
              name={d.name}
              tag={d.category}
              description={d.short_description || d.long_description?.substring(0, 60) + '...'}
              iconUrl={d.logo_url}
              url={d.website_url}
              onVisit={handleVisit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DAppRow = ({ id, name, tag, description, iconUrl, url, onVisit }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center space-x-4 bg-[#C0C0C033]/60 rounded-2xl p-3">
      {!imgError && iconUrl ? (
        <Image
          src={iconUrl}
          alt={`${name} logo`}
          width={48}
          height={48}
          className="rounded-lg shrink-0"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <div className="w-12 h-12 rounded-lg shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-grow overflow-hidden">
        <div className="flex items-center space-x-2">
          <p className="font-bold text-gray-900">{name}</p>
          <span className="text-sm font-medium text-[#080808] bg-white px-2 py-0.5 rounded-full">{tag}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onVisit(id)}
        className="shrink-0 bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        <Image src='/icons/aero-right-up.png' width={40} height={40} className='w-4' alt='visit' />
      </a>
    </div>
  );
};

export default FeaturedDAppsPage;
