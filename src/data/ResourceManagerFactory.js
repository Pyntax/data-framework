import StorageService from "../services/StorageService";
import history from "../utils/history";
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
 * @param errorCallback
 */
export function handleRequestError(errorCallback) {
    return function (errorResponse) {
        if (errorResponse && errorResponse.response && errorResponse.response.status) {
            errorCallback = errorCallback || function () {
            }
            switch (errorResponse.response.status) {
                case 401:
                    StorageServiceManager.clearAll();
                    history.push('/login');
                    return;
                case 404:
                case 422:
                    errorCallback(errorResponse);
                    return;
            }
        }
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
    const URL = this.resourceUrls.getResourceByIdUrl(id);
    return this.requestManager.get(URL);
}

/**
 * @param id
 * @param data
 * @returns {Promise<T>}
 */
ResourceManagerFactory.prototype.update = function update(id, data) {
    const URL = this.resourceUrls.getResourceByIdUrl(id);
    return this.requestManager.put(URL, data);
}

/**
 *
 * @param id
 * @param data
 * @returns {*}
 */
ResourceManagerFactory.prototype.delete = function (id, data) {
    const URL = this.resourceUrls.getResourceByIdUrl(id);
    return this.requestManager.delete(URL, data);
}

/**
 *
 * @param pageSize
 * @param pageNumber
 *
 * @returns {*}
 */
ResourceManagerFactory.prototype.findAll = function (pageSize, pageNumber) {
    pageSize = pageSize || 20;
    pageNumber = pageNumber || 1;

    const URL = this.resourceUrls.getCollectionUrl();
    return this.requestManager.get(URL + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
}

/**
 *
 * @param data
 * @returns {*}
 */
ResourceManagerFactory.prototype.create = function (data) {
    const URL = this.resourceUrls.getCollectionUrl();
    return this.requestManager.post(URL, data);
}

export default ResourceManagerFactory;