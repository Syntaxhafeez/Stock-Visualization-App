import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { StockData } from './types';
import CompanyList from './components/CompanyList';
import StockChart from './components/StockChart';
import { LineChart, TrendingUp } from 'lucide-react';

function App() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [indices, setIndices] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/dump.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const csvText = await response.text();
        console.log('CSV content:', csvText); // Debug log
        
        const results = Papa.parse<StockData>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        console.log('Parsed data:', results.data); // Debug log

        if (results.errors.length > 0) {
          console.error('Parse errors:', results.errors); // Debug log
          throw new Error('Failed to parse CSV data');
        }

        const data = results.data.filter((item) => item.index_name);
        setStockData(data);

        const uniqueIndices = Array.from(
          new Set(data.map((item) => item.index_name))
        );
        setIndices(uniqueIndices);
        setSelectedIndex(uniqueIndices[0]);
      } catch (err) {
        console.error('Error loading data:', err); // Debug log
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedIndexData = stockData.filter(
    (item) => item.index_name === selectedIndex
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl">Error loading data:</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <LineChart className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">NSE Index Visualization</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <CompanyList
              indices={indices}
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
            />
          </div>
          <div className="md:col-span-2">
            {selectedIndex && selectedIndexData.length > 0 ? (
              <StockChart data={selectedIndexData} index={selectedIndex} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select an index to view its data</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;