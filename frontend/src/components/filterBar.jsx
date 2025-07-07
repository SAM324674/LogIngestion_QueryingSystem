
import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Filter, X, Calendar } from "lucide-react"

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
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Logs</h2>
          </div>
          <Button variant="outline" size="sm" onClick={handleClearFilters} className="flex items-center bg-transparent">
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Full-text Search */}
          <div className="space-y-2">
            <Label htmlFor="message-search" className="text-sm font-medium">
              Message Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="message-search"
                type="text"
                placeholder="Search in messages..."
                value={localFilters.message}
                onChange={(e) => handleFilterChange("message", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Log Level Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Log Level</Label>
            <Select value={localFilters.level} onValueChange={(value) => handleFilterChange("level", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resource ID Filter */}
          <div className="space-y-2">
            <Label htmlFor="resource-id" className="text-sm font-medium">
              Resource ID
            </Label>
            <Input
              id="resource-id"
              type="text"
              placeholder="e.g., server-1"
              value={localFilters.resourceId}
              onChange={(e) => handleFilterChange("resourceId", e.target.value)}
            />
          </div>

          {/* Trace ID Filter */}
          <div className="space-y-2">
            <Label htmlFor="trace-id" className="text-sm font-medium">
              Trace ID
            </Label>
            <Input
              id="trace-id"
              type="text"
              placeholder="e.g., abc123def456"
              value={localFilters.traceId}
              onChange={(e) => handleFilterChange("traceId", e.target.value)}
            />
          </div>

          {/* Timestamp Start */}
          <div className="space-y-2">
            <Label htmlFor="timestamp-start" className="text-sm font-medium">
              Start Time
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="timestamp-start"
                type="datetime-local"
                value={formatDateTimeLocal(localFilters.timestampStart)}
                onChange={(e) => handleDateTimeChange("timestampStart", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Timestamp End */}
          <div className="space-y-2">
            <Label htmlFor="timestamp-end" className="text-sm font-medium">
              End Time
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="timestamp-end"
                type="datetime-local"
                value={formatDateTimeLocal(localFilters.timestampEnd)}
                onChange={(e) => handleDateTimeChange("timestampEnd", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Span ID Filter */}
          <div className="space-y-2">
            <Label htmlFor="span-id" className="text-sm font-medium">
              Span ID
            </Label>
            <Input
              id="span-id"
              type="text"
              placeholder="e.g., span-001"
              value={localFilters.spanId}
              onChange={(e) => handleFilterChange("spanId", e.target.value)}
            />
          </div>

          {/* Commit Filter */}
          <div className="space-y-2">
            <Label htmlFor="commit" className="text-sm font-medium">
              Commit
            </Label>
            <Input
              id="commit"
              type="text"
              placeholder="e.g., 7a8b9c2d"
              value={localFilters.commit}
              onChange={(e) => handleFilterChange("commit", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterBar
