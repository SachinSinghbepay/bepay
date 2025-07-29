import {
  Bell,
  Globe,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowRightLeft,
  Search,
  Plus,
  Bitcoin,
  CircleDollarSign,
  ListFilter,
} from "lucide-react";
import Image from "next/image";
import { ActionButton } from "../action-button";

const assets = [
  {
    icon: <Image src="/images/crypto/btcoin.png" width={24} height={24} alt="Bitcoin" />,
    name: "BTC",
    value: "$104,075",
    balance: "0.25",
    change: "+1.09%",
  },
  {
    icon: <Image src="/images/crypto/usdt.png" width={24} height={24} alt="USDT" />,
    name: "USDT (ERC 20)",
    value: "$0.9994",
    balance: "200",
    change: "+1.09%",
  },
  {
    icon: <Image src="/images/crypto/eth.png" width={24} height={24} alt="ETH" />,
    name: "Ethereum",
    value: "$2,340",
    balance: "0.08",
    change: "-3.09%",
  },
  {
    icon: <Image src="/images/crypto/ton.png" width={24} height={24} alt="TON" />,
    name: "TON",
    value: "$1,185",
    balance: "0.25",
    change: "+1.09%",
  },
];

export function CryptoWalletView() {
  return (
    <div className="flex h-full flex-col bg-white p-4 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/crypto/profile.png"
            width={32}
            height={32}
            alt="User"
            className="rounded-full"
          />
          <span className="font-semibold">bepay</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-gray-500" />
          <Globe className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="my-4">
        <p className="text-xs text-gray-500">Wallet balance</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">1,450.08</p>
          <div className="flex items-center text-[10px] text-gray-500">
            <span>USD</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <ActionButton icon={<ArrowDown size={20} />} label="Receive" />
        <ActionButton icon={<ArrowUp size={20} />} label="Send" />
        <ActionButton icon={<ArrowRightLeft size={20} />} label="Swap" />
        <ActionButton icon={<CircleDollarSign size={20} />} label="Buy" />
      </div>
      <div className="my-4 flex items-center gap-4  pb-2 text-xs font-medium text-gray-500">
        <span className="whitespace-nowrap text-black">Services</span>
        <span className="whitespace-nowrap">Assets</span>
        <span className="whitespace-nowrap">Fiat</span>
        <span className="whitespace-nowrap">NFT</span>
        <span className="whitespace-nowrap">Airdrops</span>
      </div>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg border bg-gray-50 py-2 pl-9 pr-9 text-sm"
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-gray-400">
          <ListFilter size={14} />
          <Plus size={14} />
        </div>
      </div>
      <div className="flex-grow space-y-2 overflow-y-auto pr-2">
        {assets.map((asset) => (
          <div key={asset.name} className="flex rounded-2xl bg-gray-100 p-2 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full ">
                {asset.icon}
              </div>
              <div>
                <p className="font-medium">{asset.name}</p>
                <p className="text-xs text-gray-500">{asset.value}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{asset.balance}</p>
              <p
                className={`text-xs ${
                  asset.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {asset.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
