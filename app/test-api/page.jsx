'use client';

import { useEffect, useState } from 'react';

export default function TestApiPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev.bepay.money';
      const url = `${apiUrl}/api/dapps?limit=2&page=1`;
      
      console.log('Testing API at:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      setResult({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        data: data,
      });
    } catch (err) {
      console.error('Test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">API Connection Test</h1>
        
        <div className="mb-4 p-4 bg-blue-50 rounded">
          <p className="font-semibold">API Base URL:</p>
          <p className="font-mono text-sm">{process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev.bepay.money'}</p>
        </div>

        <button
          onClick={testAPI}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 mb-4"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>

        {loading && (
          <div className="p-4 bg-yellow-50 rounded mb-4">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded mb-4">
            <p className="font-semibold text-red-800">Error:</p>
            <p className="text-red-600 font-mono text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="font-semibold text-green-800">Success! Status: {result.status}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <p className="font-semibold mb-2">Response Headers:</p>
              <pre className="text-xs overflow-auto bg-gray-800 text-white p-2 rounded">
                {JSON.stringify(result.headers, null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <p className="font-semibold mb-2">Response Data:</p>
              <pre className="text-xs overflow-auto bg-gray-800 text-white p-2 rounded max-h-96">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>

            {result.data?.data?.dapps && (
              <div className="p-4 bg-gray-50 rounded">
                <p className="font-semibold mb-2">Parsed dApps ({result.data.data.dapps.length}):</p>
                <div className="space-y-2">
                  {result.data.data.dapps.map((dapp) => (
                    <div key={dapp.id} className="p-3 bg-white border rounded flex items-center gap-3">
                      <img src={dapp.logo_url} alt={dapp.name} className="w-12 h-12 rounded" />
                      <div>
                        <p className="font-semibold">{dapp.name}</p>
                        <p className="text-sm text-gray-600">{dapp.category} - {dapp.short_description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
