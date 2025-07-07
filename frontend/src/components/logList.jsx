import LogCard from "./logCard"
import { Loader2, Search } from "lucide-react"

const LogList = ({ logs, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading logs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Logs</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Logs Found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      <div className="mb-4 text-sm text-gray-600">
        Showing {logs.length} log{logs.length !== 1 ? "s" : ""} (newest first)
      </div>
      {logs.map((log) => (
        <LogCard key={log.id} log={log} />
      ))}
    </div>
  )
}

export default LogList
