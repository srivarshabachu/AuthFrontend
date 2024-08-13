import axios from 'axios';

const jwtInterceptor = axios.create({
    baseURL: 'https://localhost:7235/api/Authentication',
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRrefreshed(accessToken) {
    refreshSubscribers.map(callback => callback(accessToken));
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

jwtInterceptor.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

jwtInterceptor.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    addRefreshSubscriber(accessToken => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                        resolve(axios(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            return new Promise((resolve, reject) => {
                axios.post('https://localhost:7235/api/Authentication/Refresh-Token', {
                    accessToken: {
                        token: localStorage.getItem('accessToken'),
                        expiryTokenDate: localStorage.getItem('accessTokenExpiry'),
                    },
                    refreshToken: {
                        token: refreshToken,
                        expiryTokenDate: localStorage.getItem('refreshTokenExpiry'),
                    },
                })
                    .then(({ data }) => {
                        console.log(data);
                        localStorage.setItem('accessToken', data.response.accessToken.token);
                        localStorage.setItem('accessTokenExpiry', data.response.accessToken.expiryTokenDate);
                        localStorage.setItem('refreshToken', data.response.refreshToken.token);
                        localStorage.setItem('refreshTokenExpiry', data.response.refreshToken.expiryTokenDate);

                        jwtInterceptor.defaults.headers['Authorization'] = 'Bearer ' + data.response.accessToken.token;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.response.accessToken.token;

                        onRrefreshed(data.response.accessToken.token);
                        resolve(axios(originalRequest));
                    })
                    .catch(err => {
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                        refreshSubscribers = [];
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default jwtInterceptor;