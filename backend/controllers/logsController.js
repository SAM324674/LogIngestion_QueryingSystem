const fs = require('fs');
const path = require('path');
const LOG_FILE = path.join(__dirname, '../logs.json');

const readLogs = () => {
  const data = fs.readFileSync(LOG_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
};
const saveLogs = (logs) => {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
};

const isValidLog = (log) => {
  const levels = ['error', 'warn', 'info', 'debug'];

  return (
    log &&
    typeof log === 'object' &&
    levels.includes(log.level) &&
    typeof log.message === 'string' &&
    typeof log.resourceId === 'string' &&
    typeof log.timestamp === 'string' &&
    !isNaN(Date.parse(log.timestamp)) &&
    typeof log.traceId === 'string' &&
    typeof log.spanId === 'string' &&
    typeof log.commit === 'string' &&
    typeof log.metadata === 'object'
  );
};

const postLogs = (req, res) => {
  const log = req.body;

  if (!isValidLog(log)) {
    return res.status(400).json({ error: 'Invalid log format' });
  }

  const logs = readLogs();
  logs.push(log);
  saveLogs(logs);

  res.status(201).json(log);
}

const getLogs = (req, res) => {
  console.log("🔥 GET /logs hit!");
  console.log("🛬 Received query:", req.query);

  try {
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit
    } = req.query;

    let logs = readLogs(); // from file

    if (level && level.toLowerCase() !== "all") {
      logs = logs.filter(log => log.level.toLowerCase() === level.toLowerCase());
    }

    if (message) {
      logs = logs.filter(log =>
        log.message.toLowerCase().includes(message.toLowerCase())
      );
    }

    if (resourceId) {
      logs = logs.filter(log =>
        log.resourceId.toLowerCase().includes(resourceId.toLowerCase())
      );
    }

    if (traceId) {
      logs = logs.filter(log =>
        log.traceId.toLowerCase().includes(traceId.toLowerCase())
      );
    }

    if (spanId) {
      logs = logs.filter(log =>
        log.spanId.toLowerCase().includes(spanId.toLowerCase())
      );
    }

    if (commit) {
      logs = logs.filter(log =>
        log.commit.toLowerCase().includes(commit.toLowerCase())
      );
    }

    if (timestamp_start) {
      logs = logs.filter(
        log => new Date(log.timestamp) >= new Date(timestamp_start)
      );
    }

    if (timestamp_end) {
      logs = logs.filter(
        log => new Date(log.timestamp) <= new Date(timestamp_end)
      );
    }

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log("📦 Returning logs:", logs.length);

    res.status(200).json(logs);
  } catch (error) {
    console.error("💥 Error in getLogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getLogs, postLogs }