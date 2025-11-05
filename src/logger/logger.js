const logfile = require('./logfile');
const consoleLog = require('./logConsole');

function logError(error) {
    return (CONSTANTS.DEV === process.env.APP_ENV) ? consoleLog.error(error) : logfile.error(error);
}

function logInfo(message) {
    return (CONSTANTS.DEV === process.env.APP_ENV) ? consoleLog.info(message) : logfile.info(message);
    
}
 
module.exports = {
    logInfo,
    logError
};
