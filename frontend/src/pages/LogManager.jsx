import { useState, useEffect, useCallback } from "react"
import FilterBar from "../components/filterBar"
import LogList from "../components/logList"
// import { mockLogs } from "@/api/logs"
import { Monitor, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Monitor className="w-8 h-8 mr-3 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Log Monitor</h1>
              <p className="text-gray-600">Real-time log ingestion and querying system</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">Last updated: {lastRefresh.toLocaleTimeString()}</div>
            <Button onClick={handleRefresh} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />

        {/* Log Results */}
        <LogList logs={logs} loading={loading} error={error} />
      </div>
    </div>
  )
}
