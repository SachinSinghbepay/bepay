const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Generic response handler
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "API Error");
  }
  return data.data;
}

// Get currencies
export async function fetchCurrencies() {
  const res = await fetch(`${BASE_URL}/api/forex/currencies`);
  return handleResponse(res);
}

// Calculate forex conversion
export async function calculateForex({ from, to, amount }) {
  const res = await fetch(`${BASE_URL}/api/forex/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, amount }),
  });

  return handleResponse(res);
}
