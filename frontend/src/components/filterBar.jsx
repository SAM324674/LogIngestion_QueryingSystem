
import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Filter, X, Calendar, Sliders, GitCommit, FileSearch, Wrench, FileCode} from "lucide-react"

const FilterBar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = useCallback(
    (key, value) => {
      const newFilters = { ...localFilters, [key]: value }
      setLocalFilters(newFilters)
      onFiltersChange(newFilters)
    },
    [localFilters, onFiltersChange],
  )

  const handleClearFilters = () => {
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
    setLocalFilters(clearedFilters)
    onClearFilters()
  }

  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
  }

  const handleDateTimeChange = (key, value) => {
    const isoString = value ? new Date(value).toISOString() : ""
    handleFilterChange(key, isoString)
  }

  return (
     <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4 shadow-lg">
              <Sliders className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Advanced Filters
              </h2>
              <p className="text-slate-500">Refine your log search with precision controls</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex items-center bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border-slate-300 text-slate-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Full-text Search */}
          <div className="space-y-3">
            <Label htmlFor="message-search" className="text-sm font-semibold text-slate-700 flex items-center">
              <Search className="w-4 h-4 mr-2 text-blue-500" />
              Message Search
            </Label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                id="message-search"
                type="text"
                placeholder="Search in messages..."
                value={localFilters.message}
                onChange={(e) => handleFilterChange("message", e.target.value)}
                className="pl-12 h-12 bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
          </div>

          {/* Log Level Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 flex items-center">
              <Filter className="w-4 h-4 mr-2 text-purple-500" />
              Log Level
            </Label>
            <Select value={localFilters.level} onValueChange={(value) => handleFilterChange("level", value)}>
              <SelectTrigger className="h-12  from-slate-50 to-purple-50 border-slate-200 focus:border-purple-400 shadow-sm hover:shadow-md transition-all duration-200">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
                <SelectItem value="all" className="hover:bg-slate-50">
                  All levels
                </SelectItem>
                <SelectItem value="error" className="hover:bg-red-50 text-red-700">
                  🔴 Error
                </SelectItem>
                <SelectItem value="warn" className="hover:bg-amber-50 text-amber-700">
                  🟡 Warning
                </SelectItem>
                <SelectItem value="info" className="hover:bg-blue-50 text-blue-700">
                  🔵 Info
                </SelectItem>
                <SelectItem value="debug" className="hover:bg-slate-50 text-slate-700">
                  ⚪ Debug
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resource ID Filter */}
          <div className="space-y-3">
            <Label htmlFor="resource-id" className="text-sm font-semibold text-slate-700 flex items-center">
              <Wrench size={18}/>
              Resource ID
            </Label>
            <Input
              id="resource-id"
              type="text"
              placeholder="e.g., server-1"
              value={localFilters.resourceId}
              onChange={(e) => handleFilterChange("resourceId", e.target.value)}
              className="h-12 from-slate-50 to-green-50 border-slate-200 focus:border-green-400 focus:ring-green-400/20 shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>

          {/* Trace ID Filter */}
          <div className="space-y-3">
            <Label htmlFor="trace-id" className="text-sm font-semibold text-slate-700 flex items-center">
              <FileSearch size={19}/>
              Trace ID
            </Label>
            <Input
              id="trace-id"
              type="text"
              placeholder="e.g., abc123def456"
              value={localFilters.traceId}
              onChange={(e) => handleFilterChange("traceId", e.target.value)}
              className="h-12  from-slate-50 to-orange-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>

          {/* Timestamp Start */}
          <div className="space-y-3">
            <Label htmlFor="timestamp-start" className="text-sm font-semibold text-slate-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
              Start Time
            </Label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                id="timestamp-start"
                type="datetime-local"
                value={formatDateTimeLocal(localFilters.timestampStart)}
                onChange={(e) => handleDateTimeChange("timestampStart", e.target.value)}
                className="pl-12 h-12  from-slate-50 to-indigo-50 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
          </div>

          {/* Timestamp End */}
          <div className="space-y-3">
            <Label htmlFor="timestamp-end" className="text-sm font-semibold text-slate-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
              End Time
            </Label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                id="timestamp-end"
                type="datetime-local"
                value={formatDateTimeLocal(localFilters.timestampEnd)}
                onChange={(e) => handleDateTimeChange("timestampEnd", e.target.value)}
                className="pl-12 h-12  from-slate-50 to-indigo-50 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
          </div>

          {/* Span ID Filter */}
          <div className="space-y-3">
            <Label htmlFor="span-id" className="text-sm font-semibold text-slate-700 flex items-center">
            <FileCode size={17}/>
              Span ID
            </Label>
            <Input
              id="span-id"
              type="text"
              placeholder="e.g., span-001"
              value={localFilters.spanId}
              onChange={(e) => handleFilterChange("spanId", e.target.value)}
              className="h-12 from-slate-50 to-cyan-50 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>

          {/* Commit Filter */}
          <div className="space-y-3">
            <Label htmlFor="commit" className="text-sm font-semibold text-slate-700 flex items-center">
              <GitCommit/>
              Commit
            </Label>
            <Input
              id="commit"
              type="text"
              placeholder="e.g., 7a8b9c2d"
              value={localFilters.commit}
              onChange={(e) => handleFilterChange("commit", e.target.value)}
              className="h-12 from-slate-50 to-pink-50 border-slate-200 focus:border-pink-400 focus:ring-pink-400/20 shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterBar
