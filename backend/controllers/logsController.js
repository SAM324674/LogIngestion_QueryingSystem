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


const postLogs = (req, res) => {
  const log = req.body;


  // Validate individual fields
  if (!log || typeof log !== 'object') {
    return res.status(400).json({ error: 'Log must be a JSON object' });
  }

  if (!log.level || typeof log.level !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "level" (must be a string)' });
  }

  if (!levels.includes(log.level)) {
    return res.status(400).json({ error: `"level" must be one of: ${levels.join(', ')}` });
  }

  if (!log.message || typeof log.message !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "message" (must be a string)' });
  }

  if (!log.resourceId || typeof log.resourceId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "resourceId" (must be a string)' });
  }

  if (!log.timestamp || typeof log.timestamp !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "timestamp" (must be a string)' });
  }

  if (isNaN(Date.parse(log.timestamp))) {
    return res.status(400).json({ error: '"timestamp" must be a valid ISO date string' });
  }

  if (!log.traceId || typeof log.traceId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "traceId" (must be a string)' });
  }

  if (!log.spanId || typeof log.spanId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "spanId" (must be a string)' });
  }

  if (!log.commit || typeof log.commit !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "commit" (must be a string)' });
  }

  if (!log.metadata || typeof log.metadata !== 'object' || Array.isArray(log.metadata)) {
    return res.status(400).json({ error: 'Missing or invalid "metadata" (must be an object)' });
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