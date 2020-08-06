import {CRUD} from "./ResourceManagerFactory";

/**
 *
 * @param baseResourceUrl
 * @constructor
 */
function ResourceUrls(baseResourceUrl) {
    this.resourceUrls = {};
    this.setBaseUrl(baseResourceUrl);
}

/**
 *
 * @param baseResourceUrl
 * @returns {ResourceUrls}
 */
ResourceUrls.prototype.setBaseUrl = function setBaseUrl(baseResourceUrl) {
    this.resourceUrls[CRUD.BASE_RESOURCE_URI] = baseResourceUrl;
    this.resourceUrls[CRUD.RESOURCE_BY_ID] = function (id) {
        return baseResourceUrl + '/' + id;
    };

    return this;
}

/**
 *
 * @returns {*}
 */
ResourceUrls.prototype.getCollectionUrl = function getCollectionUrl() {
    return this.resourceUrls[CRUD.BASE_RESOURCE_URI];
}

/**
 *
 * @param id
 * @returns {*}
 */
ResourceUrls.prototype.getResourceByIdUrl = function getResourceByIdUrl(id) {
    return this.resourceUrls[CRUD.RESOURCE_BY_ID](id);
}

export default ResourceUrls;