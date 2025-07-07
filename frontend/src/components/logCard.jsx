import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Server, GitCommit, Zap } from "lucide-react"

const LogCard = ({ log }) => {
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "warn":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "debug":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    })
  }

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${getLevelColor(log.level)} font-medium`}>{log.level.toUpperCase()}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {formatTimestamp(log.timestamp)}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-900 font-mono text-sm leading-relaxed">{log.message}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600">
          <div className="flex items-center">
            <Server className="w-3 h-3 mr-1" />
            <span className="font-medium">Resource:</span>
            <span className="ml-1 font-mono">{log.resourceId}</span>
          </div>

          <div className="flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            <span className="font-medium">Trace:</span>
            <span className="ml-1 font-mono text-xs truncate">{log.traceId}</span>
          </div>

          <div className="flex items-center">
            <span className="font-medium">Span:</span>
            <span className="ml-1 font-mono">{log.spanId}</span>
          </div>

          <div className="flex items-center">
            <GitCommit className="w-3 h-3 mr-1" />
            <span className="font-medium">Commit:</span>
            <span className="ml-1 font-mono">{log.commit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LogCard
