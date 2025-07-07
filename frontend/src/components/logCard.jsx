import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Server, GitCommit, Zap, AlertTriangle, Info, Bug, AlertCircle } from "lucide-react"

const LogCard = ({ log }) => {
  const getLevelConfig = (level) => {
    switch (level.toLowerCase()) {
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-500 to-red-600",
          text: "text-white",
          border: "border-red-200",
          cardBg: "bg-gradient-to-r from-red-50 to-red-100/50",
          icon: AlertTriangle,
          
        }
      case "warn":
        return {
          bg: "bg-gradient-to-r from-amber-500 to-orange-500",
          text: "text-white",
          border: "border-amber-200",
          cardBg: "bg-gradient-to-r from-amber-50 to-orange-100/50",
          icon: AlertCircle,
          
        }
      case "info":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-blue-600",
          text: "text-white",
          border: "border-blue-200",
          cardBg: "bg-gradient-to-r from-blue-50 to-blue-100/50",
          icon: Info,
          
        }
      case "debug":
        return {
          bg: "bg-gradient-to-r from-slate-500 to-slate-600",
          text: "text-white",
          border: "border-slate-200",
          cardBg: "bg-gradient-to-r from-slate-50 to-slate-100/50",
          icon: Bug,
          
        }
      default:
        return {
          bg: "bg-gradient-to-r from-slate-500 to-slate-600",
          text: "text-white",
          border: "border-slate-200",
          cardBg: "bg-gradient-to-r from-slate-50 to-slate-100/50",
          icon: Info,
        
        }
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

  const levelConfig = getLevelConfig(log.level)
  const LevelIcon = levelConfig.icon

  return (
    <Card
      className={`mb-4 hover:shadow-2xl transition-all duration-300 border-0 shadow-lg ${levelConfig.cardBg} backdrop-blur-sm hover:scale-[1.01]`}
    >
      <CardContent className="p-6">
        {/* Header with Level and Timestamp */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Badge
              className={`${levelConfig.bg} ${levelConfig.text} font-bold px-4 py-2 shadow-lg flex items-center space-x-2`}
            >
              <LevelIcon className="w-4 h-4" />
              <span>
                 {log.level.toUpperCase()}
              </span>
            </Badge>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <Clock className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">{formatTimestamp(log.timestamp)}</span>
          </div>
        </div>

        {/* Log Message */}
        <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-inner">
          <p className="text-slate-800 font-mono text-sm leading-relaxed break-words">{log.message}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-1">
              <Server className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Resource</span>
            </div>
            <span className="font-mono text-sm text-slate-800 font-medium">{log.resourceId}</span>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-1">
              <Zap className="w-4 h-4 mr-2 text-orange-600" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Trace</span>
            </div>
            <span className="font-mono text-xs text-slate-800 font-medium truncate block">{log.traceId}</span>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-1">
              <div className="w-4 h-4 mr-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Span</span>
            </div>
            <span className="font-mono text-sm text-slate-800 font-medium">{log.spanId}</span>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-1">
              <GitCommit className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Commit</span>
            </div>
            <span className="font-mono text-sm text-slate-800 font-medium">{log.commit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LogCard
