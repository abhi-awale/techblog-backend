function writeLog(level, message) {
    const now = new Date().toISOString().replace('T', ' ').replace('Z', '');
    const logMessage = `[${now}] [${level.toUpperCase()}] ${message}\n`;

    console.log(logMessage);
    return;
}

const consoleLog = {
    'error' : (msg) => writeLog('error', msg),
    'info' : (msg) => writeLog('info', msg)
}

module.exports = consoleLog;