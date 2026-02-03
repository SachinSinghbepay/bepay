import { NextResponse } from "next/server"
import { AVAILABLE_NETWORKS } from "../route"

/**
 * GET /api/dapps/networks
 * Returns the list of available networks for filtering dapps
 * This is synchronized with app/networks/[networkId]/page.jsx
 */
export async function GET(request) {
  try {
    return NextResponse.json(
      {
        success: true,
        count: AVAILABLE_NETWORKS.length,
        data: AVAILABLE_NETWORKS,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching networks:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch networks: " + error.message,
      },
      { status: 500 }
    )
  }
}
