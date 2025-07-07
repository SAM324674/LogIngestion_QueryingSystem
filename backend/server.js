const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const LogsRouter = require('./routes/logs');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use('/logs', LogsRouter);

const LOG_FILE = path.join(__dirname, 'logs.json');

// Ensure log file exists
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '[]', 'utf-8');
}


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
