// app/dapps/directory/page.jsx

const dapps = [
  { name: "Uniswap", developer: "Uniswap Labs", url: "https://uniswap.org", category: "top" },
  { name: "Aave", developer: "Aave", url: "https://aave.com", category: "top" },
  { name: "Blur", developer: "Blur", url: "https://blur.io", category: "top" },
  { name: "GMX", developer: "GMX", url: "https://gmx.io", category: "top" },
  { name: "Balancer", developer: "Balancer Labs", url: "https://balancer.fi", category: "top" },
  { name: "Synthetix", developer: "Synthetix", url: "https://synthetix.io", category: "top" },
  { name: "Curve Finance", developer: "Curve", url: "https://curve.fi", category: "top" },
  { name: "Compound", developer: "Compound Labs", url: "https://compound.finance", category: "top" },
  { name: "Rocket Pool", developer: "Rocket Pool", url: "https://rocketpool.net", category: "top" },
  { name: "MetaMask", developer: "MetaMask", url: "https://metamask.io", category: "top" },
  { name: "MakerDAO", developer: "MakerDAO", url: "https://makerdao.com", category: "top" },
  { name: "dYdX", developer: "dYdX", url: "https://dydx.exchange", category: "top" },
  { name: "Radiant Capital", developer: "Radiant Capital", url: "https://radiant.capital", category: "top" },

  { name: "SushiSwap", developer: "Sushi", url: "https://sushi.com", category: "dex" },
  { name: "KyberSwap", developer: "Kyber Network", url: "https://kyberswap.com", category: "dex" },
  { name: "QuickSwap", developer: "QuickSwap", url: "https://quickswap.exchange", category: "dex" },
  { name: "Raydium", developer: "Raydium", url: "https://raydium.io", category: "dex" },
  { name: "Orca", developer: "Orca", url: "https://orca.so", category: "dex" },
  { name: "DODO", developer: "DODO", url: "https://dodoex.io", category: "dex" },

  { name: "LooksRare", developer: "LooksRare", url: "https://looksrare.org", category: "marketplace" },
  { name: "Sudoswap", developer: "Sudoswap", url: "https://sudoswap.xyz", category: "marketplace" },
  { name: "CloneX", developer: "RTFKT", url: "https://rtfkt.com", category: "nfts" },

  { name: "P2P Validator", developer: "P2P.org", url: "https://p2p.org", category: "staking" },
  { name: "Coinbase Staking", developer: "Coinbase", url: "https://coinbase.com/staking", category: "staking" },
  { name: "Marinade Finance", developer: "Marinade", url: "https://marinade.finance", category: "staking" },
  { name: "Jito", developer: "Jito", url: "https://jito.network", category: "staking" },
  { name: "StakeWise", developer: "StakeWise", url: "https://stakewise.io", category: "staking" },
  { name: "StaFi", developer: "StaFi", url: "https://stafi.io", category: "staking" },
  { name: "Diva Staking", developer: "Diva", url: "https://divastaking.com", category: "staking" },
  { name: "Frax Ether", developer: "Frax Finance", url: "https://frax.finance", category: "staking" },

  { name: "Morpho", developer: "Morpho", url: "https://morpho.xyz", category: "lending" },
  { name: "Fraxlend", developer: "Frax Finance", url: "https://frax.finance", category: "lending" },

  { name: "Safe", developer: "Safe", url: "https://safe.global", category: "utilities" },
  { name: "Dune Analytics", developer: "Dune", url: "https://dune.com", category: "utilities" },

  { name: "Sorare", developer: "Sorare", url: "https://sorare.com", category: "gaming" },
  { name: "Star Atlas", developer: "Star Atlas", url: "https://staratlas.com", category: "gaming" },
  { name: "Zed Run", developer: "Zed Run", url: "https://zed.run", category: "gaming" },
  { name: "Gala Games", developer: "Gala Games", url: "https://gala.games", category: "gaming" },
  { name: "Big Time", developer: "Big Time Studios", url: "https://bigtime.gg", category: "gaming" },
  { name: "DeFi Kingdoms", developer: "Kingdom Studios", url: "https://defikingdoms.com", category: "gaming" },
  { name: "Splinterlands", developer: "Splinterlands", url: "https://splinterlands.com", category: "gaming" },
];

const categoryOrder = [
  "top",
  "dex",
  "marketplace",
  "nfts",
  "staking",
  "lending",
  "utilities",
  "gaming",
];

const categoryLabels = {
  top: "Top dApps",
  dex: "DEX",
  marketplace: "Marketplace",
  nfts: "NFTs",
  staking: "Staking",
  lending: "Lending",
  utilities: "Utilities",
  gaming: "Gaming",
};

export default function DappsDirectoryPage() {
  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: dapps.filter((d) => d.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>bepay dApp Index</h1>
      <p style={{ marginBottom: 12 }}>
        This page lists externally accessible third-party dApps available through bepay’s web3 browser interface.
      </p>
      <p style={{ marginBottom: 28 }}>
        Each entry includes the application name, developer/provider, and destination URL.
      </p>

      {grouped.map((group) => (
        <section key={group.category} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 24, marginBottom: 14 }}>{categoryLabels[group.category] ?? group.category}</h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #ddd",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Developer</th>
                  <th style={thStyle}>URL</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item) => (
                  <tr key={`${group.category}-${item.name}`}>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>{item.developer}</td>
                    <td style={tdStyle}>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </main>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #ddd",
  background: "#f7f7f7",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
};