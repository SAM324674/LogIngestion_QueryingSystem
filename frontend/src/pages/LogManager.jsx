import { useState, useEffect, useCallback } from "react"
import FilterBar from "../components/filterBar"
import LogList from "../components/logList"
import { Monitor, RefreshCw, Activity, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function LogMonitoringApp() {
  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    timestampStart: "",
    timestampEnd: "",
    traceId: "",
    spanId: "",
    commit: "",
  })

  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  // console.log("active filters:", filters)
  // Debounce filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 300)


  const loadLogs = useCallback(async (activeFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Clean filter keys for backend query
      const cleanedFilters = {};

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          switch (key) {
            case "timestampStart":
              cleanedFilters.timestamp_start = value;
              break;
            case "timestampEnd":
              cleanedFilters.timestamp_end = value;
              break;
            default:
              cleanedFilters[key] = value;
          }
        }
      });

      console.log("🚀 Sending filters:", cleanedFilters); // Debug

      const response = await axios.get("http://localhost:3000/logs", {
        params: cleanedFilters
      });

      console.log("✅ Fetched logs:", response.data); // Debug

      setLogs(response.data); // Already filtered & sorted by backend
      setLastRefresh(new Date());
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      setError(err.message || "Failed to load logs");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);


  // Load logs when debounced filters change
  useEffect(() => {
    loadLogs(debouncedFilters)
  }, [debouncedFilters, loadLogs])

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const handleClearFilters = useCallback(() => {
    const clearedFilters = {
      message: "",
      level: "",
      resourceId: "",
      timestampStart: "",
      timestampEnd: "",
      traceId: "",
      spanId: "",
      commit: "",
    }
    setFilters(clearedFilters)
  }, [])

  const handleRefresh = useCallback(() => {
    loadLogs(filters)
  }, [filters, loadLogs])
  const stats = {
    total: logs.length,
    errors: logs.filter((log) => log.level === "error").length,
    warnings: logs.filter((log) => log.level === "warn").length,
    info: logs.filter((log) => log.level === "info").length,
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
       <div className="bg-gradient-to-r from-slate-100 via-blue-50 to-slate-100 border-b border-blue-300">
        <div className="container mx-auto px-6 py-10 max-w-7xl">
          <div className="flex items-center justify-between ">
            <div className="flex items-center ">
              <div className="bg-gradient-to-br from-blue-400 to-slate-500 p-3 rounded-2xl mr-5 shadow-sm">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <div className="gap-2 flex flex-col">
                <h1 className="text-4xl font-light  bg-gradient-to-r from-slate-700 via-blue-600 to-slate-600 bg-clip-text text-transparent">
                  LogStream Pro
                </h1>
                <p className="text-slate-500 text-lg font-light mt-1">Advanced log monitoring & analytics platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-slate-400 text-sm font-medium">Last sync</div>
                <div className="text-slate-600 font-medium">{lastRefresh.toLocaleTimeString()}</div>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-slate-500 hover:from-blue-600 hover:to-slate-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl px-6"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Logs</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Errors</p>
                  <p className="text-3xl font-bold text-red-600">{stats.errors}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Warnings</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.warnings}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Info</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.info}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <Info className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />

        {/* Log Results */}
        <LogList logs={logs} loading={loading} error={error} />
      </div>
    </div>
  
  )
}
