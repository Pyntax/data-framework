import Axios from "axios";
import Config from '../config';
import StorageService from "../services/StorageService";

const StorageServiceManager = new StorageService();

/**
 * @param baseUrl
 * @returns {AxiosInstance}
 */
function factor(baseUrl) {
    return Axios.create({baseURL: baseUrl, timeout: 50000})
}

/**
 * @returns {AxiosInstance}
 */
export function factory() {
    return factor(Config.API_URL);
}

/**
 * @param instance
 * @returns {AxiosInstance}
 */
export function withAuth(instance) {
    instance.defaults.headers.common['Authorization'] = "Bearer " + StorageServiceManager.getAccessToken();
    return instance;
}