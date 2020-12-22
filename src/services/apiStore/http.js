import AppAlert from '@Services/appAlert';
import axios from 'axios';
class ApiError extends Error {
    constructor() {
        super();
        this.code = '';
        this.detail = {};
    }
    getAppAlertInfo() {
        return {
            title: this.code,
            message: this.message
        }
    }
}
class XhrError extends Error {
    constructor() {
        super();
        this.code = '';
    }
    getAppAlertInfo() {
        return {
            title: 'Unknown Error',
            message: this.message + '[' + this.code + ']'
        }
    }
}
const interceptReq = (config) => {
    return config;
}
const interceptRes = (response) => {
    const data = response.data;
    if (response.data.code !== "200") {
        const e = new ApiError();
        e.name = e.code = data.code;
        e.message = data.message;
        e.detail = data.detail;
        if (!response.config.errorHandle || response.code.errorHandle.indexOf(e.code) == -1) {
            AppAlert.error(e.getAppAlertInfo());
        }
        throw e;
    }
    return response;
}
const interceptReject = (error) => {
    if (error) {
        const e = new XhrError();
        if (error.response) {
            const { status, statusText } = error.response;
            e.code = status;
            e.message = statusText;
        } else {
            e.message = error;
        }
        AppAlert.error(e.getAppAlertInfo());
        throw e;
    }
}
const _axios = axios.create({
    baseURL: process.env.API_BASE_URL || '/',
    timeout: process.env.API_TIMEOUT || 30000
});
_axios.interceptors.request.use(interceptReq);
_axios.interceptors.response.use(interceptRes, interceptReject);

const http = {
    get(url, config) {
        return _axios.get(url, config);
    },
    post(url, data, config) {
        return _axios.post(url, data, config);
    },
    put(url, data, config) {
        return _axios.put(url, data, config);
    },
    patch(url, data, config) {
        return _axios.patch(url, data, config);
    },
    delete(url, config) {
        return _axios.delete(url, config);
    }
}
export default http;