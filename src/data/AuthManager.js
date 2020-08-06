import {factory, withAuth} from "./RequestManager";
import StorageService from "../services/StorageService";

const RequestManager = factory();
const StorageServiceManager = new StorageService();
const RequestManagerWithAuth = withAuth(RequestManager);

/**
 *
 * @param username
 * @param password
 * @param onSuccess
 * @returns {*}
 */
export function login(username, password, onSuccess) {
    return RequestManager.post(
        'login',
        {
            username, password
        }
    ).then((response) => {
        StorageServiceManager.setOAuthToken(response.data.token);
        StorageServiceManager.setUser(response.data.user);
        onSuccess.call()
    });
}

/**
 *
 * @param account
 * @param onSuccessCallback
 * @param onFailureCallback
 * @returns {*}
 */
export function registerAccount(account, onSuccessCallback, onFailureCallback) {
    onFailureCallback = onFailureCallback || function (err) {
        console.log(err)
    };
    return RequestManager.post('register/account', account).then(onSuccessCallback).catch(onFailureCallback)
}

/**
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUser() {
    return RequestManagerWithAuth.get('/user').then(response => {
        StorageServiceManager.setUser(response.data);
    }).catch((reason => {
        console.error(reason)
    }))
}

/**
 *
 * @returns {boolean|boolean}
 */
export function isAuthenticated() {
    return (StorageServiceManager.getOAuthToken() !== null
        && StorageServiceManager.getOAuthToken() !== undefined);
}

export default {
    login,
    registerAccount,
    isAuthenticated,
    getUser
}