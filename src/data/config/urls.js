import { BRAND } from './constants';


export const BASE_URL = 'http://139.59.17.69:8082/';
// export const BASE_URL = "http://139.59.17.69:8081/"; //test server
// export const BASE_URL = ""; //production

export const BASE_SOCKET_URL = 'http://139.59.17.69:8082/';
// export const BASE_SOCKET_URL = "http://139.59.17.69:8081/"; //test server
// export const BASE_SOCKET_URL = ""; //production

export const SOCKET_URLS = {
    LIVE_STATISTICS_SOCKET_URL: `${BASE_SOCKET_URL}liveChatsStats`,
};

export const BRAND_INFO = {
    name: BRAND.DISHTV,
};

export const MODULE_CONFIG = {
    CONVERSATION: {
        HIDE_ADMIN_CONTROL: false, // to hide the takeover-relinquish 
    }
};


