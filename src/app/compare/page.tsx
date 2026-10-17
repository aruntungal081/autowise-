'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart2, Search, ExternalLink, Filter, ShieldCheck, ArrowUpDown, Clock, Tag, ShoppingCart } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const [partNumber, setPartNumber] = useState(searchParams.get('partNumber') || '55810M68P00');
  const [sortBy, setSortBy] = useState<'lowest_cost' | 'seller_rating' | 'best_compatibility'>('lowest_cost');
  const [condition, setCondition] = useState<'all' | 'genuine' | 'aftermarket'>('all');
  const [retailer, setRetailer] = useState<string>('all');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComparisons = async (queryPart: string) => {
    setIsLoading(true);
    try {
      const url = new URL('/api/prices', window.location.origin);
      url.searchParams.set('partNumber', queryPart);
      url.searchParams.set('sortBy', sortBy);
      url.searchParams.set('condition', condition);
      if (retailer !== 'all') url.searchParams.set('retailer', retailer);

      const res = await fetch(url.toString());
      const resData = await res.json();
      if (resData.success) {
        setData(resData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pParam = searchParams.get('partNumber');
    if (pParam) {
      setPartNumber(pParam);
      fetchComparisons(pParam);
    } else {
      fetchComparisons(partNumber);
    }
  }, [searchParams, sortBy, condition, retailer]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <BarChart2 className="w-3.5 h-3.5" /> Multi-Marketplace Automotive Price Aggregator
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Compare Spare Parts Prices</h1>
        <p className="text-slate-400 text-sm mt-1">
          Compare verified prices, shipping fees, delivery speeds, and warranty across Boodmo, Amazon.in, eBay, and direct auto parts distributors in Indian Rupees (INR).
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              placeholder="Enter Part Number or Component Name (e.g. 55810M68P00, SILKR6F11)"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue font-mono"
            />
          </div>
          <button
            onClick={() => fetchComparisons(partNumber)}
            disabled={isLoading || !partNumber.trim()}
            className="px-6 py-2.5 bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {isLoading ? 'Aggregating Stores...' : 'Compare Prices'}
          </button>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-navy-850 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </div>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as any)}
              className="bg-navy-950 border border-navy-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-blue text-xs"
            >
              <option value="all">All Conditions</option>
              <option value="genuine">OEM Genuine Only</option>
              <option value="aftermarket">Aftermarket Only</option>
            </select>

            <select
              value={retailer}
              onChange={(e) => setRetailer(e.target.value)}
              className="bg-navy-950 border border-navy-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-blue text-xs"
            >
              <option value="all">All Marketplaces</option>
              <option value="Boodmo">Boodmo (India)</option>
              <option value="Amazon">Amazon India</option>
              <option value="eBay">eBay</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-navy-950 border border-navy-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-blue text-xs font-medium"
            >
              <option value="lowest_cost">Lowest Total Cost (Price + Shipping)</option>
              <option value="seller_rating">Top Rated Sellers First</option>
              <option value="best_compatibility">Best Fitment Confidence</option>
            </select>
          </div>
        </div>
      </div>

      {/* Part Overview Header */}
      {data?.part && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/30">
              {data.part.category}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{data.part.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Part #: <span className="font-mono text-slate-200">{data.part.partNumber}</span> • OEM Ref: {data.part.oemNumber || 'Verified Match'}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 block">Lowest Total Cost</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              ₹{data.listings?.[0]?.totalCost?.toLocaleString() || 'N/A'}
            </span>
            <span className="text-[10px] text-slate-400 block">incl. verified shipping</span>
          </div>
        </div>
      )}

      {/* Price Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">
          Active Store Listings ({data?.listings?.length || 0})
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {data?.listings?.map((listing: any) => (
            <div
              key={listing.id}
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Product Info */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white">{listing.retailerName}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                    listing.condition === 'genuine'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {listing.condition}
                  </span>
                  {listing.isVerifiedCompatible && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Compatible Fit
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">
                  {listing.productTitle}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span>Seller: <strong className="text-slate-300">{listing.sellerName || 'Verified Merchant'}</strong></span>
                  {listing.sellerRating && (
                    <span className="text-amber-400">★ {listing.sellerRating}</span>
                  )}
                  {listing.deliveryEstimate && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {listing.deliveryEstimate}
                    </span>
                  )}
                  {listing.warrantyMonths && (
                    <span>Warranty: {listing.warrantyMonths} months</span>
                  )}
                </div>

                <div className="text-[10px] text-slate-400">
                  Source: {listing.sourceAttribution} • Checked: {new Date(listing.lastChecked).toLocaleDateString()}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-navy-850">
                <div className="text-left md:text-right">
                  <div className="text-lg font-bold text-white">
                    ₹{listing.totalCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Item: ₹{listing.price.toLocaleString()} + Ship: ₹{listing.shippingCost.toLocaleString()}
                  </div>
                </div>

                <a
                  href={listing.retailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 shadow-md"
                >
                  Visit Store <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unavailable External Sources Section (Section 6 requirement) */}
      {data?.unavailableSources && data.unavailableSources.length > 0 && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            External Marketplaces Requiring Developer Credentials
          </h3>
          <p className="text-xs text-slate-400">
            When third-party API credentials are not entered in <code className="text-brand-lightBlue">.env</code>, AutoWise AI avoids inventing fake prices and provides direct live search links instead:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {data.unavailableSources.map((source: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-navy-850 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white">{source.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{source.reason}</div>
                </div>
                <a
                  href={source.directSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-brand-lightBlue border border-navy-700 text-xs font-semibold shrink-0 flex items-center gap-1 transition"
                >
                  Direct Search <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Price Comparisons...</div>}>
      <CompareContent />
    </Suspense>
  );
}
