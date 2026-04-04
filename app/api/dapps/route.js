import { NextResponse } from "next/server"
import { DAPPS_DATA } from "@/lib/dappsData"

/**
 * GET /api/dapps
 * Fetches dapps filtered by category and network
 * 
 * Query Parameters:
 * - category: (optional) Filter by dapp category (e.g., "DEX", "Lending", "Top dApps", "Gaming", "NFT", "Utilities")
 * - network: (optional) Filter by blockchain network
 *   Available networks: Ethereum, Arbitrum, Avalanche, Base, Solana, Polygon, Tron
 * - limit: (optional) Maximum number of results to return (default: no limit)
 * 
 * Example URLs:
 * /api/dapps - Returns all dapps
 * /api/dapps?category=DEX - Returns all DEX dapps
 * /api/dapps?network=Ethereum - Returns all dapps on Ethereum
 * /api/dapps?category=DEX&network=Ethereum - Returns DEX dapps on Ethereum
 * /api/dapps?category=DEX&network=Ethereum&limit=5 - Returns first 5 DEX dapps on Ethereum
 * /api/dapps?network=Arbitrum - Returns all dapps on Arbitrum
 * /api/dapps?network=Solana - Returns all dapps on Solana
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const category = searchParams.get("category")
    const network = searchParams.get("network")
    const limit = searchParams.get("limit")
    
    // Start with all dapps
    let filteredDapps = [...DAPPS_DATA]
    
    // Filter by category if provided
    if (category) {
      filteredDapps = filteredDapps.filter(
        (dapp) => dapp.category && dapp.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Filter by network if provided
    if (network) {
      filteredDapps = filteredDapps.filter(
        (dapp) => 
          dapp.networks && 
          dapp.networks.some(net => net.toLowerCase() === network.toLowerCase())
      )
    }
    
    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      const limitNumber = parseInt(limit)
      if (limitNumber > 0) {
        filteredDapps = filteredDapps.slice(0, limitNumber)
      }
    }
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        count: filteredDapps.length,
        filters: {
          category: category || null,
          network: network || null,
          limit: limit || null,
        },
        data: filteredDapps,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching dapps:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dapps: " + error.message,
      },
      { status: 500 }
    )
  }
}
