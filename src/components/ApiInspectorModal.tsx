import React, { useState } from 'react';
import { X, Play, CheckCircle2, AlertCircle, RefreshCw, Server, ExternalLink } from 'lucide-react';

interface ApiInspectorModalProps {
  onClose: () => void;
}

export const ApiInspectorModal: React.FC<ApiInspectorModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'health' | 'lta' | 'onemap-geo' | 'onemap-route'>('health');
  const [busStopCode, setBusStopCode] = useState('83139');
  const [serviceNo, setServiceNo] = useState('15');
  const [searchVal, setSearchVal] = useState('raffles place');
  const [startCoord, setStartCoord] = useState('1.320981,103.844150');
  const [endCoord, setEndCoord] = useState('1.326762,103.8559');

  const [loading, setLoading] = useState(false);
  const [responseJson, setResponseJson] = useState<unknown | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const runTest = async (tab: typeof activeTab) => {
    setLoading(true);
    setErrorMsg(null);
    setResponseJson(null);

    let url = '';
    if (tab === 'health') {
      url = '/api/health';
    } else if (tab === 'lta') {
      url = `/api/bus?action=arrival&busStopCode=${encodeURIComponent(busStopCode)}${
        serviceNo ? `&serviceNo=${encodeURIComponent(serviceNo)}` : ''
      }`;
    } else if (tab === 'onemap-geo') {
      url = `/api/bus?action=geocode&searchVal=${encodeURIComponent(searchVal)}`;
    } else if (tab === 'onemap-route') {
      url = `/api/bus?action=route&start=${encodeURIComponent(startCoord)}&end=${encodeURIComponent(
        endCoord
      )}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponseJson(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Request failed';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Live Data Mall & OneMap API Explorer
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Test /api/health and /api/bus endpoints directly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto">
          {[
            { id: 'health', label: '1. /api/health' },
            { id: 'lta', label: '2. LTA Next Bus (v3)' },
            { id: 'onemap-geo', label: '3. OneMap Geocode' },
            { id: 'onemap-route', label: '4. OneMap Walk Route' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as typeof activeTab);
                setResponseJson(null);
                setErrorMsg(null);
              }}
              className={`py-2 px-3 text-xs font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'health' && (
            <div className="space-y-3">
              <p className="text-slate-600 dark:text-slate-300">
                Pings <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">/api/health</code> to inspect server uptime and verify LTA DataMall AccountKey & OneMap token status.
              </p>
              <button
                onClick={() => runTest('health')}
                disabled={loading}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Fetch Health Status</span>
              </button>
            </div>
          )}

          {activeTab === 'lta' && (
            <div className="space-y-3">
              <div className="text-slate-500 dark:text-slate-400">
                Calls LTA DataMall v3 BusArrival endpoint:
                <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 mt-1 break-all">
                  https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode={busStopCode}&ServiceNo={serviceNo}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Bus Stop Code
                  </label>
                  <input
                    type="text"
                    value={busStopCode}
                    onChange={(e) => setBusStopCode(e.target.value)}
                    placeholder="e.g. 83139"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Service No (Optional)
                  </label>
                  <input
                    type="text"
                    value={serviceNo}
                    onChange={(e) => setServiceNo(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={() => runTest('lta')}
                disabled={loading}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Query LTA Bus Arrival</span>
              </button>
            </div>
          )}

          {activeTab === 'onemap-geo' && (
            <div className="space-y-3">
              <div className="text-slate-500 dark:text-slate-400">
                Calls OneMap Elastic Search Geocoding:
                <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 mt-1 break-all">
                  https://www.onemap.gov.sg/api/common/elastic/search?searchVal={encodeURIComponent(searchVal)}&returnGeom=Y&getAddrDetails=Y&pageNum=1
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Search Query / Postal Code
                </label>
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="e.g. raffles place or 048581"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <button
                onClick={() => runTest('onemap-geo')}
                disabled={loading}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Search OneMap</span>
              </button>
            </div>
          )}

          {activeTab === 'onemap-route' && (
            <div className="space-y-3">
              <div className="text-slate-500 dark:text-slate-400">
                Calls OneMap Routing Service (walk mode):
                <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 mt-1 break-all">
                  https://www.onemap.gov.sg/api/public/routingsvc/route?start={startCoord}&end={endCoord}&routeType=walk
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Start (lat,lng)
                  </label>
                  <input
                    type="text"
                    value={startCoord}
                    onChange={(e) => setStartCoord(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    End (lat,lng)
                  </label>
                  <input
                    type="text"
                    value={endCoord}
                    onChange={(e) => setEndCoord(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={() => runTest('onemap-route')}
                disabled={loading}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Calculate Walking Route</span>
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Response JSON Output */}
          {responseJson !== null && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Response (Live JSON)
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> HTTP 200 OK
                </span>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-64 border border-slate-800 leading-normal">
                {JSON.stringify(responseJson, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
