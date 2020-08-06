export const KEYS = {
    oAuthToken: 'oAuthToken',
    User: 'User',
    UserId: 'UserId',
};

/**
 * @constructor
 */
function StorageService() {
    this.shortStorage = window.sessionStorage;
    this.longStorage = window.localStorage;
}

/**
 * @param storeForALongTime
 * @returns {Storage}
 */
StorageService.prototype.getStorage = function (storeForALongTime) {
    storeForALongTime = (storeForALongTime === true);
    return storeForALongTime ? this.longStorage : this.shortStorage;
}

/**
 *
 * @param storeForALongTime
 */
StorageService.prototype.clear = function (storeForALongTime) {
    return this.getStorage(storeForALongTime).clear();
}

StorageService.prototype.clearAll = function () {
    this.clear(true);
    this.clear(false);
}

/**
 *
 * @param key
 * @param storeForALongTime
 */
StorageService.prototype.removeItem = function (key, storeForALongTime) {
    return this.getStorage(storeForALongTime).removeItem(key);
}

/**
 *
 * @param key
 * @param value
 * @param storeForALongTime
 */
StorageService.prototype.setItem = function (key, value, storeForALongTime) {
    return this.getStorage(storeForALongTime).setItem(key, JSON.stringify(value));
}

/**
 *
 * @param key
 * @param storeForALongTime
 * @returns {any}
 */
StorageService.prototype.getItem = function (key, storeForALongTime) {
    return JSON.parse(this.getStorage(storeForALongTime).getItem(key))
}

/**
 *
 * @param user
 */
StorageService.prototype.setUser = function (user) {
    this.setItem(KEYS.UserId, user.id, false);
    return this.setItem(KEYS.User, user, false);
}

/**
 *
 * @returns {*}
 */
StorageService.prototype.getUserId = function () {
    return this.getItem(KEYS.UserId);
}

/**
 *
 * @returns {*}
 */
StorageService.prototype.getUser = function () {
    return this.getItem(KEYS.User);
}

/**
 *
 * @returns {*}
 */
StorageService.prototype.setOAuthToken = function (token) {
    return this.setItem(KEYS.oAuthToken, token, true);
}

/**
 *
 * @returns {*}
 */
StorageService.prototype.getOAuthToken = function () {
    return this.getItem(KEYS.oAuthToken, true);
}

/**
 *
 * @returns {*}
 */
StorageService.prototype.getAccessToken = function () {
    const oAuthToken = this.getItem(KEYS.oAuthToken, true);
    return ((oAuthToken !== null && oAuthToken !== undefined)
        && (oAuthToken.access_token !== null && oAuthToken.access_token !== undefined)) ? oAuthToken.access_token : null;
}


export default StorageService;