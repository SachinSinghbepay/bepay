// app/networks/[networkId]/page.jsx

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image'; // Import the Next.js Image component

// --- Direct SVG imports (treated as components) ---
import AaveIcon from '@/public/icons/aava.svg';
import UniSwapIcon from '@/public/icons/uniswap.svg';
// import InchIcon from '@/public/icons/1inch.svg'; // Assuming this would be an SVG component as well

// --- Static image imports (treated as objects with a 'src' property) ---
import ByBarterIcon from '@/public/icons/barter.png';
import inchIcon from '@/public/icons/inch.png';
import ContangoIcon from '@/public/icons/contango.png';
import CowSwapIcon from '@/public/icons/cowswap.png';
import MatchaIcon from '@/public/icons/matcha.png';
import MeldIcon from '@/public/icons/meld.png';
import OrcaIcon from '@/public/icons/orca.png';
import OxIcon from '@/public/icons/ox.png';
import PwnIcon from '@/public/icons/pwn.png';
import RaydiumIcon from '@/public/icons/raydium.png';
import SphereIcon from '@/public/icons/sphere.png';

// --- Data Structure with Corrected Icon Usage ---
// SVG and PNG icons are now both passed as the imported object itself
const DAPPS_BY_NETWORK = {
  ethereum: [
    {
      name: 'Ox',
      description: '0x provides flexible smart contracts to build decentralized exchanges and trading protocols.',
      icon: OxIcon, // PNG
      link: 'https://0x.org/',
    },
    {
      name: 'UniSwap',
      category: 'Staking',
      description: 'Uniswap is the first Ethereum-based DEX enabling the swapping of ERC-20 tokens via liquidity pools.',
      icon: UniSwapIcon, // CORRECTED
      link: 'https://uniswap.org/',
    },
    {
      name: 'CowSwap',
      category: 'Staking',
      description: 'Cowswap is a DEX facilitating trade of Ethereum-based tokens by matching supply with demand.',
      icon: CowSwapIcon, // PNG
      link: 'https://cow.fi/',
    }
  ],
  arbitrum: [
    {
      name: 'Ox',
      description: '0x provides flexible smart contracts to build decentralized exchanges and trading protocols.',
      icon: OxIcon, // PNG
      link: 'https://0x.org/',
    },
    {
      name: 'UniSwap',
      category: 'Staking',
      description: 'Uniswap is the first Ethereum-based DEX enabling the swapping of ERC-20 tokens via liquidity pools.',
      icon: UniSwapIcon, // CORRECTED
      link: 'https://uniswap.org/',
    },
    {
      name: 'CowSwap',
      category: 'Staking',
      description: 'Cowswap is a DEX facilitating trade of Ethereum-based tokens by matching supply with demand.',
      icon: CowSwapIcon, // PNG
      link: 'https://cow.fi/',
    }
  ],
  avalanche: [
    {
      name: 'Aave',
      description: 'Aave protocol allows users to borrow and lend with both fixed and variable interest rates.',
      icon: AaveIcon, // CORRECTED
      link: 'https://aave.com/',
    },
    {
      name: 'Matcha',
      category: 'Staking',
      description: 'Matcha is a DEX aggregator offering swaps and limit orders for 6+ million tokens across 9 networks.',
      icon: MatchaIcon, // PNG
      link: 'https://www.matcha.xyz/',
    },
    {
      name: '1Inch',
      category: 'Staking',
      description: '1inch is a DEX aggregator powering flexible swaps and trades through their native protocol.',
      icon: inchIcon,
      link: 'https://1inch.io/',
    }
  ],
  base: [
    {
      name: 'Matcha',
      category: 'Staking',
      description: 'Matcha is a DEX aggregator offering swaps and limit orders for 6+ million tokens across 9 networks.',
      icon: MatchaIcon, // PNG
      link: 'https://www.matcha.xyz/',
    },
    {
      name: 'PWN',
      category: 'Staking',
      description: 'The PWN platform allows users to put digital assets up as collateral for loans.',
      icon: PwnIcon, // PNG
      link: 'https://www.pwn.xyz/',
    },
    {
      name: 'Contango',
      category: 'Staking',
      description: 'Contango offers perps built via _looping_ on money markets.',
      icon: ContangoIcon, // PNG
      link: 'https://contango.exchange/',
    }
  ],
  solana: [
    {
      name: 'Raydium',
      category: 'DEX',
      description: 'Raydium is a DEX offering fast swapping of Solana tokens and a central order book for limit orders.',
      icon: RaydiumIcon, // PNG
      link: 'https://raydium.io/',
    },
    {
      name: 'Orca',
      category: 'Staking',
      description: 'Orca is a DEX deployed on Solana offering SPL token trading and incentivized token pools.',
      icon: OrcaIcon, // PNG
      link: 'https://www.orca.so/',
    },
    {
      name: 'Matcha',
      category: 'Staking',
      description: 'Matcha is a DEX aggregator offering swaps and limit orders for 6+ million tokens across 9 networks.',
      icon: MatchaIcon, // PNG
      link: 'https://www.matcha.xyz/',
    }
  ],
  polygon: [
    {
      name: 'Matcha',
      category: 'Staking',
      description: 'Matcha is a DEX aggregator offering swaps and limit orders for 6+ million tokens across 9 networks.',
      icon: MatchaIcon, // PNG
      link: 'https://www.matcha.xyz/',
    },
    {
      name: '1Inch',
      category: 'Staking',
      description: '1inch is a DEX aggregator powering flexible swaps and trades through their native protocol.',
      icon: inchIcon,
      link: 'https://1inch.io/',
    },
    {
      name: 'Aave',
      description: 'Aave protocol allows users to borrow and lend with both fixed and variable interest rates.',
      icon: AaveIcon, // CORRECTED
      link: 'https://aave.com/',
    }
  ],
  tron: [
    {
      name: 'Meld',
      category: 'Staking',
      description: 'Multiple crypto ramps like MoonPay, Banxa, Transak, etc aggregated through a single integration & UI',
      icon: MeldIcon, // PNG
      link: 'https://www.meld.com/',
    },
    {
      name: 'Sphere',
      category: 'Staking',
      description: 'Payments infrastructure for the next generation of the internet.',
      icon: SphereIcon, // PNG
      link: 'https://sphere.so/',
    },
    {
      name: 'ByBarter',
      description: 'ByBarter enables users to convert fiat to crypto & vice versa directly from their wallets.',
      icon: ByBarterIcon, // PNG
      link: 'https://bybarter.com/',
    }
  ]
};

// --- Reusable DApp Card Component ---
const DappCard = ({ name, category, description, icon, link }) => {

  const renderIcon = () => {
    // This now works for both PNGs and SVGs since both are imported as objects with a .src property
    if (icon && typeof icon === 'object' && icon.src) {
      return (
        <Image
          src={icon}
          alt={`${name} icon`}
          width={48} // Corresponds to w-12
          height={48} // Corresponds to h-12
          className="rounded-full"
        />
      );
    }
    
    // This check can remain for flexibility, in case you ever pass a pre-built element
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: "w-12 h-12 text-gray-800 rounded-full" });
    }

    // Fallback if no icon is provided
    return <div className="w-12 h-12 bg-gray-200 rounded-full" />;
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full p-4 mb-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      <div className="flex-shrink-0 mr-4 self-center">
        {renderIcon()}
      </div>

      <div className="flex-grow">
        <div className="flex items-center">
          <h3 className="font-bold text-lg text-gray-900">{name}</h3>
          {category && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
              {category}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      <div className="flex-shrink-0 ml-4 p-2 border border-gray-200 rounded-full self-start hover:bg-gray-50">
        <ArrowUpRight size={20} className="text-gray-500" />
      </div>
    </a>
  );
};


// --- Main Page Component ---
const NetworkDetailPage = ({ params }) => {
  const { networkId } = params;
  const dapps = DAPPS_BY_NETWORK[networkId] || [];

  return (
    <div className="bg-gray-50 min-h-screen w-full font-sans">
      <div className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 capitalize">
          Explore {networkId}
        </h1>
        <div>
          {dapps.length > 0 ? (
            dapps.map((dapp, index) => (
              <DappCard
                key={`${dapp.name}-${index}`}
                name={dapp.name}
                category={dapp.category}
                description={dapp.description}
                icon={dapp.icon}
                link={dapp.link}
              />
            ))
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-2xl border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">Coming Soon</h2>
                <p className="text-gray-500 mt-2">
                    No featured dApps for this network yet. Check back later!
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkDetailPage;