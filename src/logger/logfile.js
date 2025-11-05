const { appendFile, mkdir, access, writeFile } = require('fs/promises');
const path = require('path');

const fs = require('fs');
const fsConstants = fs.constants;

const logDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logDir, 'app.log');

async function ensureLogFileExists() {
    try {
        // Check if logs directory exists
        await access(logDir, fsConstants.F_OK);
    } catch {
        await mkdir(logDir, { recursive: true });
    }

    try {
        // Check if app.log exists
        await access(logFile, fsConstants.F_OK);
    } catch {
        // Create empty log file
        await writeFile(logFile, '');
    }
}

async function writeLog(level, message) {
    await ensureLogFileExists();

    const now = new Date().toISOString().replace('T', ' ').replace('Z', '');
    const logMessage = `[${now}] [${level.toUpperCase()}] ${message}\n`;

    try {
        await appendFile(logFile, logMessage);
    } catch (err) {
        console.error('Failed to write log:', err);
    }
}

const logfile = {
    info: (msg) => writeLog('info', msg),
    warn: (msg) => writeLog('warn', msg),
    error: (msg) => writeLog('error', msg),
};

module.exports = logfile;
