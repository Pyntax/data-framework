import StorageService from "../services/StorageService";
import * as RequestManager from './RequestManager';

/**
 * @type {StorageService}
 */
const StorageServiceManager = new StorageService();

/**
 * @type {{BASE_RESOURCE_URI: string, RESOURCE_BY_ID: string}}
 */
export const CRUD = {
    BASE_RESOURCE_URI: "BASE_RESOURCE_URI",
    RESOURCE_BY_ID: "RESOURCE_BY_ID",
}

/**
 *
 * @param errorCallback
 * @param history
 *
 * @returns {function(...[*]=)}
 */
export function handleRequestError(errorCallback) {
    return function (errorResponse) {
        if (errorResponse && errorResponse.response && errorResponse.response.status) {
            errorCallback = errorCallback || function () {
            }
            switch (errorResponse.response.status) {
                case 401:
                    StorageServiceManager.clearAll();
                    StorageServiceManager.setRedirectUrlAfterLoggingIn(window.location.pathname);
                    break;
            }
        }

        errorCallback(errorResponse);
    }
}

/**
 * @param resourceUrls
 * @returns {ResourceManagerFactory}
 */
export function make(resourceUrls) {
    return new ResourceManagerFactory(resourceUrls, RequestManager.withAuth(RequestManager.factory()))
}

/**
 * @param resourceUrls
 * @param requestManager
 *
 * @constructor
 */
function ResourceManagerFactory(resourceUrls, requestManager) {
    this.resourceUrls = resourceUrls;
    this.requestManager = requestManager;
}

/**
 * @param id
 * @returns {*}
 */
ResourceManagerFactory.prototype.getById = function getById(id) {
    const URL = this.getResourceByIdUrl(id);
    return this.get(URL);
}

/**
 *
 * @param url
 * @returns {*}
 */
ResourceManagerFactory.prototype.get = function (url) {
    return this.requestManager.get(url);
}

/**
 *
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<any>> | IDBRequest<IDBValidKey> | Promise<void>}
 */
ResourceManagerFactory.prototype.put = function (url, data) {
    return this.requestManager.put(url, data);
}


/**
 *
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<any>> | IDBRequest<IDBValidKey> | Promise<void>}
 */
ResourceManagerFactory.prototype.delete = function (url, data) {
    return this.requestManager.delete(url, data);
}

/**
 *
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
ResourceManagerFactory.prototype.post = function (url, data) {
    return this.requestManager.post(url, data);
}

/**
 * @param id
 * @param data
 * @returns {Promise<T>}
 */
ResourceManagerFactory.prototype.update = function update(id, data) {
    const URL = this.getResourceByIdUrl(id);
    return this.put(URL, data);
}

/**
 * @param id
 * @param data
 * @returns {Promise<T>}
 */
ResourceManagerFactory.prototype.update = function update(id, data) {
    const URL = this.getResourceByIdUrl(id);
    return this.put(URL, data);
}

/**
 *
 * @param id
 * @param data
 * @returns {*}
 */
ResourceManagerFactory.prototype.delete = function (id, data) {
    const URL = this.getResourceByIdUrl(id);
    return this.delete(URL, data);
}


ResourceManagerFactory.prototype.prependGetVariables = function (additionalParameters) {
    let _urlWithGetStrings = "";
    Object.keys(additionalParameters).forEach((key) => {
        _urlWithGetStrings += (key+"="+additionalParameters[key]+"&");
    });

    return _urlWithGetStrings;
}

/**
 * @param pageSize
 * @param pageNumber
 * @param additionalParameters
 *
 * @returns {*}
 */
ResourceManagerFactory.prototype.findAll = function (pageSize, pageNumber, additionalParameters) {
    additionalParameters = additionalParameters = {};
    pageSize = pageSize || 20;
    pageNumber = pageNumber || 1;

    const URL = this.resourceUrls.getCollectionUrl() + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;
    return this.get(URL + this.prependGetVariables(additionalParameters));
}

/**
 *
 * @param id
 * @returns {*}
 */
ResourceManagerFactory.prototype.getResourceByIdUrl = function (id) {
    return this.resourceUrls.getResourceByIdUrl(id);
}

/**
 *
 * @returns {*}
 */
ResourceManagerFactory.prototype.getCollectionUrl = function () {
    return this.resourceUrls.getCollectionUrl();
}

/**
 *s
 * @param data
 * @returns {*}
 */
ResourceManagerFactory.prototype.create = function (data) {
    const URL = this.getCollectionUrl();
    return this.post(URL, data);
}

export default ResourceManagerFactory;