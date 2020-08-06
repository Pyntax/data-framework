/**
 *
 * @param variableName
 * @param defaultValue
 * 
 * @returns {*}
 */
function getVarFromEnv(variableName, defaultValue) {
    defaultValue = defaultValue || null;
    return process.env['REACT_APP_' + variableName] || defaultValue;
}

export default {
    APPLICATION_NAME: getVarFromEnv('APPLICATION_NAME'),
    BASE_URL: getVarFromEnv('BASE_URL'),
    API_URL: getVarFromEnv('BASE_API_URI'),
    UNAUTHENTICATED_REDIRECT_ROUTE: getVarFromEnv('UNAUTHENTICATED_REDIRECT_ROUTE'),
}