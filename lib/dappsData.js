// DApps and Airdrops data organized by network
// Use 'all' for items that appear on all networks

// Featured DApps - ALWAYS SAME for all networks
export const FEATURED_DAPPS = [
  {
    name: "VVS Finance",
    tag: "DEX",
    logo_url: "/icons/VVS.svg",
    website_url: "https://vvs.finance/",
  },
  {
    name: "Moon-lander",
    tag: "DEX",
    logo_url: "/icons/moon_lander.svg",
    website_url: "https://moonlander.io/",
  },
  {
    name: "Uniswap",
    tag: "DEX",
    logo_url: "/icons/uniswap.svg",
    website_url: "https://app.uniswap.org/",
  },
  {
    name: "Jupiter",
    tag: "DEX",
    logo_url: "/icons/jupiter.svg",
    website_url: "https://jup.ag/",
  },
  {
    name: "AAVE",
    tag: "Lending",
    logo_url: "/icons/aava.svg",
    website_url: "https://app.aave.com/",
  },
];

// Airdrops - ALWAYS SAME for all networks
export const AIRDROPS_DATA = [
  {
    name: "Mitosis airdrop claim",
    description: "Mitosis airdrop checker is LIVE",
    logo_url: "/icons/mitosis.png",
    website_url: "#",
  },
  {
    name: "Somnia airdrop claim",
    description: "Somnia airdrop checker is LIVE",
    logo_url: "/icons/somnia.png",
    website_url: "#",
  },
  {
    name: "Etherscan points",
    description: "Celebrate Etherscan's 10th anniversary with...",
    logo_url: "/icons/etherscan.png",
    website_url: "#",
  },
  {
    name: "Gaia airdrop claim",
    description: "Gaia airdrop checker is LIVE",
    logo_url: "/icons/gaia.png",
    website_url: "#",
  },
  {
    name: "Newton Airdrop claim",
    description: "Newtom airdrop checker is LIVE",
    logo_url: "/icons/newton.png",
    website_url: "#",
  },
  {
    name: "Zora airdrop claim",
    description: "$ZORA is LIVE",
    logo_url: "/icons/zora.png",
    website_url: "#",
  },
];

// Main DApps List - FILTERED by network
export const DAPPS_DATA = [
	{
		"id": "uniswap-top-dapps",
		"name": "Uniswap",
		"category": "Top dApps",
		"short_description": "Uniswap is a top dapps application.",
		"long_description": "Uniswap is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png?1720676669",
		"website_url": "https://app.uniswap.org"
	},
	{
		"name": "Aave",
		"category": "Top dApps",
		"short_description": "Aave is a top dapps application.",
		"long_description": "Aave is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png?1720472354",
		"website_url": "https://app.aave.com"
	},
	{
		"name": "PancakeSwap",
		"category": "Top dApps",
		"short_description": "PancakeSwap is a top dapps application.",
		"long_description": "PancakeSwap is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1696512440",
		"website_url": "https://pancakeswap.finance"
	},
	{
		"name": "Curve Finance",
		"category": "Top dApps",
		"short_description": "Curve Finance is a top dapps application.",
		"long_description": "Curve Finance is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12124/large/Curve.png?1696511967",
		"website_url": "https://curve.fi"
	},
	{
		"name": "MetaMask",
		"category": "Top dApps",
		"short_description": "MetaMask is a top dapps application.",
		"long_description": "MetaMask is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Base",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/68451/large/MetaMask-mUSD-Icon-200x200.png?1755878384",
		"website_url": "https://metamask.io"
	},
	{
		"name": "OpenSea",
		"category": "Top dApps",
		"short_description": "OpenSea is a top dapps application.",
		"long_description": "OpenSea is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon",
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/54409/large/dwk05k59_400x400.jpg?1739552142",
		"website_url": "https://opensea.io"
	},
	{
		"name": "Blur",
		"category": "Top dApps",
		"short_description": "Blur is a top dapps application.",
		"long_description": "Blur is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/28453/large/blur.png?1696527448",
		"website_url": "https://blur.io"
	},
	{
		"name": "GMX",
		"category": "Top dApps",
		"short_description": "GMX is a top dapps application.",
		"long_description": "GMX is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Arbitrum",
			"Avalanche"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/18323/large/arbit.png?1696517814",
		"website_url": "https://gmx.io"
	},
	{
		"name": "Compound",
		"category": "Top dApps",
		"short_description": "Compound is a top dapps application.",
		"long_description": "Compound is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/10775/large/COMP.png?1696510737",
		"website_url": "https://compound.finance"
	},
	{
		"name": "MakerDAO",
		"category": "Top dApps",
		"short_description": "MakerDAO is a top dapps application.",
		"long_description": "MakerDAO is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/39790/large/dai.png?1724111653",
		"website_url": "https://makerdao.com"
	},
	{
		"name": "dYdX",
		"category": "Top dApps",
		"short_description": "dYdX is a top dapps application.",
		"long_description": "dYdX is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/32594/large/dydx.png?1698673495",
		"website_url": "https://dydx.trade"
	},
	{
		"name": "Balancer",
		"category": "Top dApps",
		"short_description": "Balancer is a top dapps application.",
		"long_description": "Balancer is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/11683/large/Balancer.png?1696511572",
		"website_url": "https://balancer.fi"
	},
	{
		"name": "Radiant Capital",
		"category": "Top dApps",
		"short_description": "Radiant Capital is a top dapps application.",
		"long_description": "Radiant Capital is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Arbitrum",
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/26536/large/Radiant-Logo-200x200.png?1696525610",
		"website_url": "https://radiant.capital"
	},
	{
		"name": "Rocket Pool",
		"category": "Top dApps",
		"short_description": "Rocket Pool is a top dapps application.",
		"long_description": "Rocket Pool is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/20764/large/reth.png?1696520159",
		"website_url": "https://rocketpool.net"
	},
	{
		"name": "Synthetix",
		"category": "Top dApps",
		"short_description": "Synthetix is a top dapps application.",
		"long_description": "Synthetix is categorized under Top dApps and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/3406/large/SNX.png?1696504103",
		"website_url": "https://synthetix.io"
	},
	{
		"name": "Uniswap",
		"category": "DEX",
		"short_description": "Uniswap is a dex application.",
		"long_description": "Uniswap is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png?1720676669",
		"website_url": "https://app.uniswap.org"
	},
	{
		"name": "PancakeSwap",
		"category": "DEX",
		"short_description": "PancakeSwap is a dex application.",
		"long_description": "PancakeSwap is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1696512440",
		"website_url": "https://pancakeswap.finance"
	},
	{
		"name": "SushiSwap",
		"category": "DEX",
		"short_description": "SushiSwap is a dex application.",
		"long_description": "SushiSwap is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://sushi.com"
	},
	{
		"name": "Curve Finance",
		"category": "DEX",
		"short_description": "Curve Finance is a dex application.",
		"long_description": "Curve Finance is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12124/large/Curve.png?1696511967",
		"website_url": "https://curve.fi"
	},
	{
		"name": "Balancer",
		"category": "DEX",
		"short_description": "Balancer is a dex application.",
		"long_description": "Balancer is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/11683/large/Balancer.png?1696511572",
		"website_url": "https://balancer.fi"
	},
	{
		"name": "Trader Joe",
		"category": "DEX",
		"short_description": "Trader Joe is a dex application.",
		"long_description": "Trader Joe is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Avalanche"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://traderjoexyz.com"
	},
	{
		"name": "QuickSwap",
		"category": "DEX",
		"short_description": "QuickSwap is a dex application.",
		"long_description": "QuickSwap is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13970/large/quick.png?1696513704",
		"website_url": "https://quickswap.exchange"
	},
	{
		"name": "KyberSwap",
		"category": "DEX",
		"short_description": "KyberSwap is a dex application.",
		"long_description": "KyberSwap is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://kyberswap.com"
	},
	{
		"name": "1inch",
		"category": "DEX",
		"short_description": "1inch is a dex application.",
		"long_description": "1inch is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13469/large/1inch-logo.jpeg?1759404663",
		"website_url": "https://1inch.io"
	},
	{
		"name": "Matcha",
		"category": "DEX",
		"short_description": "Matcha is a dex application.",
		"long_description": "Matcha is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon",
			"Base"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://matcha.xyz"
	},
	{
		"name": "Raydium",
		"category": "DEX",
		"short_description": "Raydium is a dex application.",
		"long_description": "Raydium is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13928/large/PSigc4ie_400x400.jpg?1696513668",
		"website_url": "https://raydium.io"
	},
	{
		"name": "Orca",
		"category": "DEX",
		"short_description": "Orca is a dex application.",
		"long_description": "Orca is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/17547/large/Orca_Logo.png?1696517083",
		"website_url": "https://orca.so"
	},
	{
		"name": "Maverick",
		"category": "DEX",
		"short_description": "Maverick is a dex application.",
		"long_description": "Maverick is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/30850/large/MAV_Logo.png?1696529701",
		"website_url": "https://maverick.finance"
	},
	{
		"name": "Bancor",
		"category": "DEX",
		"short_description": "Bancor is a dex application.",
		"long_description": "Bancor is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/736/large/Bancor_Token.png?1710479159",
		"website_url": "https://bancor.network"
	},
	{
		"name": "DODO",
		"category": "DEX",
		"short_description": "DODO is a dex application.",
		"long_description": "DODO is categorized under DEX and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12651/large/dodo_logo.png?1696512458",
		"website_url": "https://dodoex.io"
	},
	{
		"name": "OpenSea",
		"category": "Marketplace",
		"short_description": "OpenSea is a marketplace application.",
		"long_description": "OpenSea is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon",
			"Solana",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/54409/large/dwk05k59_400x400.jpg?1739552142",
		"website_url": "https://opensea.io"
	},
	{
		"name": "Blur",
		"category": "Marketplace",
		"short_description": "Blur is a marketplace application.",
		"long_description": "Blur is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/28453/large/blur.png?1696527448",
		"website_url": "https://blur.io"
	},
	{
		"name": "Magic Eden",
		"category": "Marketplace",
		"short_description": "Magic Eden is a marketplace application.",
		"long_description": "Magic Eden is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/39850/large/_ME_Profile_Dark_2x.png?1734013082",
		"website_url": "https://magiceden.io"
	},
	{
		"name": "Rarible",
		"category": "Marketplace",
		"short_description": "Rarible is a marketplace application.",
		"long_description": "Rarible is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/11845/large/rf_logo_%281%29.jpeg?1711076091",
		"website_url": "https://rarible.com"
	},
	{
		"name": "LooksRare",
		"category": "Marketplace",
		"short_description": "LooksRare is a marketplace application.",
		"long_description": "LooksRare is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/22173/large/circle-black-256.png?1696521517",
		"website_url": "https://looksrare.org"
	},
	{
		"name": "X2Y2",
		"category": "Marketplace",
		"short_description": "X2Y2 is a marketplace application.",
		"long_description": "X2Y2 is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/23633/large/logo-60b81ff87b40b11739105acf5ad1e075.png?1696522837",
		"website_url": "https://x2y2.io"
	},
	{
		"name": "Sudoswap",
		"category": "Marketplace",
		"short_description": "Sudoswap is a marketplace application.",
		"long_description": "Sudoswap is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/27151/large/sudo.png?1696526202",
		"website_url": "https://sudoswap.xyz"
	},
	{
		"name": "Immutable Marketplace",
		"category": "Marketplace",
		"short_description": "Immutable Marketplace is a marketplace application.",
		"long_description": "Immutable Marketplace is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://market.immutable.com"
	},
	{
		"name": "SuperRare",
		"category": "Marketplace",
		"short_description": "SuperRare is a marketplace application.",
		"long_description": "SuperRare is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/17753/large/RARE.png?1709598473",
		"website_url": "https://superrare.com"
	},
	{
		"name": "Foundation",
		"category": "Marketplace",
		"short_description": "Foundation is a marketplace application.",
		"long_description": "Foundation is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/53566/large/aios.jpg?1736686269",
		"website_url": "https://foundation.app"
	},
	{
		"name": "Binance NFT",
		"category": "Marketplace",
		"short_description": "Binance NFT is a marketplace application.",
		"long_description": "Binance NFT is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.binance.com/en/nft/home"
	},
	{
		"name": "Coinbase NFT",
		"category": "Marketplace",
		"short_description": "Coinbase NFT is a marketplace application.",
		"long_description": "Coinbase NFT is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Base"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://nft.coinbase.com"
	},
	{
		"name": "Objkt",
		"category": "Marketplace",
		"short_description": "Objkt is a marketplace application.",
		"long_description": "Objkt is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://objkt.com"
	},
	{
		"name": "JPG Store",
		"category": "Marketplace",
		"short_description": "JPG Store is a marketplace application.",
		"long_description": "JPG Store is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.jpgstore.io"
	},
	{
		"name": "Element",
		"category": "Marketplace",
		"short_description": "Element is a marketplace application.",
		"long_description": "Element is categorized under Marketplace and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/51869/large/Logo.png?1732095523",
		"website_url": "https://element.market"
	},
	{
		"name": "Lido",
		"category": "Staking",
		"short_description": "Lido is a staking application.",
		"long_description": "Lido is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326",
		"website_url": "https://lido.fi"
	},
	{
		"name": "Rocket Pool",
		"category": "Staking",
		"short_description": "Rocket Pool is a staking application.",
		"long_description": "Rocket Pool is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/20764/large/reth.png?1696520159",
		"website_url": "https://rocketpool.net"
	},
	{
		"name": "Marinade Finance",
		"category": "Staking",
		"short_description": "Marinade Finance is a staking application.",
		"long_description": "Marinade Finance is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://marinade.finance"
	},
	{
		"name": "Jito",
		"category": "Staking",
		"short_description": "Jito is a staking application.",
		"long_description": "Jito is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/28046/large/JitoSOL-200.png?1696527060",
		"website_url": "https://jito.network"
	},
	{
		"name": "StakeWise",
		"category": "Staking",
		"short_description": "StakeWise is a staking application.",
		"long_description": "StakeWise is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/33117/large/Frame_27513839.png?1700732599",
		"website_url": "https://stakewise.io"
	},
	{
		"name": "Ankr",
		"category": "Staking",
		"short_description": "Ankr is a staking application.",
		"long_description": "Ankr is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.ankr.com"
	},
	{
		"name": "Benqi Staking",
		"category": "Staking",
		"short_description": "Benqi Staking is a staking application.",
		"long_description": "Benqi Staking is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Avalanche"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.benqi.fi"
	},
	{
		"name": "Everstake",
		"category": "Staking",
		"short_description": "Everstake is a staking application.",
		"long_description": "Everstake is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/69882/large/mEVUSD.png?1759936764",
		"website_url": "https://everstake.one"
	},
	{
		"name": "P2P Validator",
		"category": "Staking",
		"short_description": "P2P Validator is a staking application.",
		"long_description": "P2P Validator is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://p2p.org"
	},
	{
		"name": "StaFi",
		"category": "Staking",
		"short_description": "StaFi is a staking application.",
		"long_description": "StaFi is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12423/large/FIS.png?1696512244",
		"website_url": "https://www.stafi.io"
	},
	{
		"name": "ClayStack",
		"category": "Staking",
		"short_description": "ClayStack is a staking application.",
		"long_description": "ClayStack is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://claystack.com"
	},
	{
		"name": "EtherFi",
		"category": "Staking",
		"short_description": "EtherFi is a staking application.",
		"long_description": "EtherFi is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/31557/large/Logo_2.png?1696530369",
		"website_url": "https://ether.fi"
	},
	{
		"name": "Diva Staking",
		"category": "Staking",
		"short_description": "Diva Staking is a staking application.",
		"long_description": "Diva Staking is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/31792/large/2024-02-17_11.56.27.jpg?1709885558",
		"website_url": "https://www.diva.community"
	},
	{
		"name": "Frax Ether",
		"category": "Staking",
		"short_description": "Frax Ether is a staking application.",
		"long_description": "Frax Ether is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/28284/large/frxETH_icon.png?1696527284",
		"website_url": "https://frax.finance"
	},
	{
		"name": "Coinbase Staking",
		"category": "Staking",
		"short_description": "Coinbase Staking is a staking application.",
		"long_description": "Coinbase Staking is categorized under Staking and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Solana"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.coinbase.com/en/staking"
	},
	{
		"name": "Axie Infinity",
		"category": "Games",
		"short_description": "Axie Infinity is a games application.",
		"long_description": "Axie Infinity is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13029/large/axie_infinity_logo.png?1696512817",
		"website_url": "https://axieinfinity.com"
	},
	{
		"name": "Decentraland",
		"category": "Games",
		"short_description": "Decentraland is a games application.",
		"long_description": "Decentraland is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/878/large/decentraland-mana.png?1696502010",
		"website_url": "https://decentraland.org"
	},
	{
		"name": "The Sandbox",
		"category": "Games",
		"short_description": "The Sandbox is a games application.",
		"long_description": "The Sandbox is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1696511971",
		"website_url": "https://www.sandbox.game"
	},
	{
		"name": "Gods Unchained",
		"category": "Games",
		"short_description": "Gods Unchained is a games application.",
		"long_description": "Gods Unchained is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://godsunchained.com"
	},
	{
		"name": "Illuvium",
		"category": "Games",
		"short_description": "Illuvium is a games application.",
		"long_description": "Illuvium is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/14468/large/logo-200x200.png?1696514154",
		"website_url": "https://www.illuvium.io"
	},
	{
		"name": "Sorare",
		"category": "Games",
		"short_description": "Sorare is a games application.",
		"long_description": "Sorare is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.sorare.com"
	},
	{
		"name": "Star Atlas",
		"category": "Games",
		"short_description": "Star Atlas is a games application.",
		"long_description": "Star Atlas is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/17789/large/POLIS.jpg?1696517312",
		"website_url": "https://staratlas.com"
	},
	{
		"name": "Big Time",
		"category": "Games",
		"short_description": "Big Time is a games application.",
		"long_description": "Big Time is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/32251/large/-6136155493475923781_121.jpg?1696998691",
		"website_url": "https://www.bigtime.gg"
	},
	{
		"name": "Zed Run",
		"category": "Games",
		"short_description": "Zed Run is a games application.",
		"long_description": "Zed Run is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/26607/large/X_-_profile_image_-_ZEDTOKEN_%281%29.jpg?1745053571",
		"website_url": "https://www.zedrun.com"
	},
	{
		"name": "Alien Worlds",
		"category": "Games",
		"short_description": "Alien Worlds is a games application.",
		"long_description": "Alien Worlds is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/14676/large/kY-C4o7RThfWrDQsLCAG4q4clZhBDDfJQVhWUEKxXAzyQYMj4Jmq1zmFwpRqxhAJFPOa0AsW_PTSshoPuMnXNwq3rU7Imp15QimXTjlXMx0nC088mt1rIwRs75GnLLugWjSllxgzvQ9YrP4tBgclK4_rb17hjnusGj_c0u2fx0AvVokjSNB-v2poTj0xT9BZRCbzRE3-lF1.jpg?1696514350",
		"website_url": "https://www.alienworlds.io"
	},
	{
		"name": "DeFi Kingdoms",
		"category": "Games",
		"short_description": "DeFi Kingdoms is a games application.",
		"long_description": "DeFi Kingdoms is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/18570/large/jewel_token_x2.png?1702076846",
		"website_url": "https://www.defikingdoms.com"
	},
	{
		"name": "Gala Games",
		"category": "Games",
		"short_description": "Gala Games is a games application.",
		"long_description": "Gala Games is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://gala.games"
	},
	{
		"name": "Splinterlands",
		"category": "Games",
		"short_description": "Splinterlands is a games application.",
		"long_description": "Splinterlands is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Tron"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/17332/large/splinter.PNG?1696516884",
		"website_url": "https://splinterlands.com"
	},
	{
		"name": "My Neighbor Alice",
		"category": "Games",
		"short_description": "My Neighbor Alice is a games application.",
		"long_description": "My Neighbor Alice is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/14375/large/alice_logo.jpg?1696514067",
		"website_url": "https://www.myneighboralice.com"
	},
	{
		"name": "Pixels",
		"category": "Games",
		"short_description": "Pixels is a games application.",
		"long_description": "Pixels is categorized under Games and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/35100/large/pixel-icon.png?1708339519",
		"website_url": "https://www.pixels.xyz"
	},
	{
		"name": "Bored Ape Yacht Club",
		"category": "NFTs",
		"short_description": "Bored Ape Yacht Club is a nfts application.",
		"long_description": "Bored Ape Yacht Club is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://boredapeyachtclub.com"
	},
	{
		"name": "CryptoPunks",
		"category": "NFTs",
		"short_description": "CryptoPunks is a nfts application.",
		"long_description": "CryptoPunks is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.larvalabs.com/cryptopunks"
	},
	{
		"name": "Azuki",
		"category": "NFTs",
		"short_description": "Azuki is a nfts application.",
		"long_description": "Azuki is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13091/large/bdUBSCo.png?1696512878",
		"website_url": "https://www.azuki.com"
	},
	{
		"name": "Pudgy Penguins",
		"category": "NFTs",
		"short_description": "Pudgy Penguins is a nfts application.",
		"long_description": "Pudgy Penguins is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Base",
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/52622/large/PUDGY_PENGUINS_PENGU_PFP.png?1733809110",
		"website_url": "https://www.pudgypenguins.io"
	},
	{
		"name": "Doodles",
		"category": "NFTs",
		"short_description": "Doodles is a nfts application.",
		"long_description": "Doodles is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/54399/large/doods.png?1739506481",
		"website_url": "https://doodles.app"
	},
	{
		"name": "Moonbirds",
		"category": "NFTs",
		"short_description": "Moonbirds is a nfts application.",
		"long_description": "Moonbirds is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/69732/large/birb-logo.jpg?1759413928",
		"website_url": "https://www.proof.xyz/moonbirds"
	},
	{
		"name": "DeGods",
		"category": "NFTs",
		"short_description": "DeGods is a nfts application.",
		"long_description": "DeGods is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.degods.com"
	},
	{
		"name": "CloneX",
		"category": "NFTs",
		"short_description": "CloneX is a nfts application.",
		"long_description": "CloneX is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.rtfkt.com/clonex"
	},
	{
		"name": "Milady",
		"category": "NFTs",
		"short_description": "Milady is a nfts application.",
		"long_description": "Milady is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.miladymakers.com"
	},
	{
		"name": "World of Women",
		"category": "NFTs",
		"short_description": "World of Women is a nfts application.",
		"long_description": "World of Women is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.worldofwomen.art"
	},
	{
		"name": "OnChainMonkey",
		"category": "NFTs",
		"short_description": "OnChainMonkey is a nfts application.",
		"long_description": "OnChainMonkey is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.onchainmonkey.com"
	},
	{
		"name": "Meebits",
		"category": "NFTs",
		"short_description": "Meebits is a nfts application.",
		"long_description": "Meebits is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/69406/large/aprstr.png?1758524274",
		"website_url": "https://meebits.larvalabs.com"
	},
	{
		"name": "Mutant Ape Yacht Club",
		"category": "NFTs",
		"short_description": "Mutant Ape Yacht Club is a nfts application.",
		"long_description": "Mutant Ape Yacht Club is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.mutantapeyachtclub.com"
	},
	{
		"name": "Captains",
		"category": "NFTs",
		"short_description": "Captains is a nfts application.",
		"long_description": "Captains is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Base"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.captains.wtf"
	},
	{
		"name": "y00ts",
		"category": "NFTs",
		"short_description": "y00ts is a nfts application.",
		"long_description": "y00ts is categorized under NFTs and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Solana"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://www.y00ts.com"
	},
	{
		"name": "Aave",
		"category": "Lending",
		"short_description": "Aave is a lending application.",
		"long_description": "Aave is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png?1720472354",
		"website_url": "https://aave.com"
	},
	{
		"name": "Compound",
		"category": "Lending",
		"short_description": "Compound is a lending application.",
		"long_description": "Compound is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/10775/large/COMP.png?1696510737",
		"website_url": "https://compound.finance"
	},
	{
		"name": "MakerDAO",
		"category": "Lending",
		"short_description": "MakerDAO is a lending application.",
		"long_description": "MakerDAO is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/39790/large/dai.png?1724111653",
		"website_url": "https://makerdao.com"
	},
	{
		"name": "Radiant Capital",
		"category": "Lending",
		"short_description": "Radiant Capital is a lending application.",
		"long_description": "Radiant Capital is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/26536/large/Radiant-Logo-200x200.png?1696525610",
		"website_url": "https://radiant.capital"
	},
	{
		"name": "Morpho",
		"category": "Lending",
		"short_description": "Morpho is a lending application.",
		"long_description": "Morpho is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/29837/large/Morpho-token-icon.png?1726771230",
		"website_url": "https://morpho.org"
	},
	{
		"name": "Fraxlend",
		"category": "Lending",
		"short_description": "Fraxlend is a lending application.",
		"long_description": "Fraxlend is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://frax.finance"
	},
	{
		"name": "Venus Protocol",
		"category": "Lending",
		"short_description": "Venus Protocol is a lending application.",
		"long_description": "Venus Protocol is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://venus.io"
	},
	{
		"name": "Gearbox",
		"category": "Lending",
		"short_description": "Gearbox is a lending application.",
		"long_description": "Gearbox is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/21630/large/gear.png?1696520990",
		"website_url": "https://gearbox.fi"
	},
	{
		"name": "Notional Finance",
		"category": "Lending",
		"short_description": "Notional Finance is a lending application.",
		"long_description": "Notional Finance is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/20282/large/NOTE-340x340.png?1696519687",
		"website_url": "https://notional.finance"
	},
	{
		"name": "Benqi",
		"category": "Lending",
		"short_description": "Benqi is a lending application.",
		"long_description": "Benqi is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Avalanche"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/23657/large/savax_blue.png?1696522860",
		"website_url": "https://www.benqi.fi"
	},
	{
		"name": "Maple Finance",
		"category": "Lending",
		"short_description": "Maple Finance is a lending application.",
		"long_description": "Maple Finance is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/51232/large/_syrup_token_logo.png?1747292046",
		"website_url": "https://maple.finance"
	},
	{
		"name": "Silo Finance",
		"category": "Lending",
		"short_description": "Silo Finance is a lending application.",
		"long_description": "Silo Finance is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/55596/large/silo.png?1746815000",
		"website_url": "https://silo.finance"
	},
	{
		"name": "Euler",
		"category": "Lending",
		"short_description": "Euler is a lending application.",
		"long_description": "Euler is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/26149/large/Coingecko_logo_%281%29.png?1706026067",
		"website_url": "https://euler.finance"
	},
	{
		"name": "Cream Finance",
		"category": "Lending",
		"short_description": "Cream Finance is a lending application.",
		"long_description": "Cream Finance is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://cream.finance"
	},
	{
		"name": "Goldfinch",
		"category": "Lending",
		"short_description": "Goldfinch is a lending application.",
		"long_description": "Goldfinch is categorized under Lending and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/19081/large/GOLDFINCH.png?1696518531",
		"website_url": "https://goldfinch.finance"
	},
	{
		"name": "Zapper",
		"category": "Utilities",
		"short_description": "Zapper is a utilities application.",
		"long_description": "Zapper is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://zapper.fi"
	},
	{
		"name": "Zerion",
		"category": "Utilities",
		"short_description": "Zerion is a utilities application.",
		"long_description": "Zerion is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://zerion.io"
	},
	{
		"name": "MetaMask",
		"category": "Utilities",
		"short_description": "MetaMask is a utilities application.",
		"long_description": "MetaMask is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Base",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/68451/large/MetaMask-mUSD-Icon-200x200.png?1755878384",
		"website_url": "https://metamask.io"
	},
	{
		"name": "Safe",
		"category": "Utilities",
		"short_description": "Safe is a utilities application.",
		"long_description": "Safe is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon",
			"Base"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13905/large/sfp.png?1696513647",
		"website_url": "https://safe.global"
	},
	{
		"name": "WalletConnect",
		"category": "Utilities",
		"short_description": "WalletConnect is a utilities application.",
		"long_description": "WalletConnect is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Base",
			"Polygon",
			"Solana",
			"Tron"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/50390/large/wc-token1.png?1727569464",
		"website_url": "https://walletconnect.com"
	},
	{
		"name": "Chainlink",
		"category": "Utilities",
		"short_description": "Chainlink is a utilities application.",
		"long_description": "Chainlink is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Avalanche",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/877/large/Chainlink_Logo_500.png?1760023405",
		"website_url": "https://chain.link"
	},
	{
		"name": "The Graph",
		"category": "Utilities",
		"short_description": "The Graph is a utilities application.",
		"long_description": "The Graph is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png?1696513159",
		"website_url": "https://thegraph.com"
	},
	{
		"name": "Etherscan",
		"category": "Utilities",
		"short_description": "Etherscan is a utilities application.",
		"long_description": "Etherscan is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://etherscan.io"
	},
	{
		"name": "Debank",
		"category": "Utilities",
		"short_description": "Debank is a utilities application.",
		"long_description": "Debank is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://debank.com"
	},
	{
		"name": "ENS",
		"category": "Utilities",
		"short_description": "ENS is a utilities application.",
		"long_description": "ENS is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/28452/large/ARUsPeNQ_400x400.jpeg?1696527447",
		"website_url": "https://ens.domains"
	},
	{
		"name": "Alchemy",
		"category": "Utilities",
		"short_description": "Alchemy is a utilities application.",
		"long_description": "Alchemy is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Base",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/12390/large/ACH_%281%29.png?1696512213",
		"website_url": "https://alchemy.com"
	},
	{
		"name": "Infura",
		"category": "Utilities",
		"short_description": "Infura is a utilities application.",
		"long_description": "Infura is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://infura.io"
	},
	{
		"name": "Tenderly",
		"category": "Utilities",
		"short_description": "Tenderly is a utilities application.",
		"long_description": "Tenderly is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://tenderly.co"
	},
	{
		"name": "Dune Analytics",
		"category": "Utilities",
		"short_description": "Dune Analytics is a utilities application.",
		"long_description": "Dune Analytics is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://example.com/logo.png",
		"website_url": "https://dune.com"
	},
	{
		"name": "Gelato",
		"category": "Utilities",
		"short_description": "Gelato is a utilities application.",
		"long_description": "Gelato is categorized under Utilities and provides functionalities relevant to decentralized ecosystems.",
		"networks": [
			"Ethereum",
			"Arbitrum",
			"Polygon"
		],
		"logo_url": "https://coin-images.coingecko.com/coins/images/15026/large/Gelato_Icon_Logo_1024x1024.png?1696514687",
		"website_url": "https://gelato.network"
	}
];

/**
 * Filter DApps by network
 * @param {string} networkId - The network ID to filter by ('all' returns all DApps)
 * @returns {array} - Filtered list of DApps
 */
export const getDAppsByNetwork = (networkId = 'all') => {
  if (networkId === 'all') {
    return DAPPS_DATA;
  }
  return DAPPS_DATA.filter(dapp => 
    dapp.networks.some(network => network.toLowerCase() === networkId.toLowerCase())
  );
};

/**
 * Get Airdrops - ALWAYS RETURNS FULL LIST (NO FILTERING)
 * @returns {array} - Full list of Airdrops
 */
export const getAirdropsByNetwork = () => {
  return AIRDROPS_DATA;
};

/**
 * Get Featured DApps - ALWAYS RETURNS FULL LIST (NO FILTERING)
 * @returns {array} - Full list of Featured DApps
 */
export const getFeaturedDAppsByNetwork = () => {
  return FEATURED_DAPPS;
};
