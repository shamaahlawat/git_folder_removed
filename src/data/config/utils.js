import { message } from 'antd';

import { LOCAL_STORAGE, CURRENCY } from './constants';
import { BRAND_INFO } from './urls';

const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

export const uniqueId = () => {
    let time = new Date().getTime();
    return `${time}${s4()}${s4()}${s4()}`;
};

export function showMessage(type, msg, time, onClose) {
    const Message = message[type];
    Message(msg, time, onClose);
}

export const refreshPage = () => {
    document.location.reload();
};

export const getAvatarBgClass = (name) => {
    const avatarBgClass = { "ori-bg-warning": name.length % 9 === 0, "ori-bg-info": name.length % 9 === 1, "ori-bg-violet": name.length % 9 === 2, "ori-bg-green": name.length % 9 === 3, "ori-bg-danger": name.length % 9 === 4, "ori-bg-yellow": name.length % 9 === 5, "ori-bg-magenta": name.length % 9 === 6, "ori-bg-primary": name.length % 9 === 7, "ori-bg-red": name.length % 9 === 8 };
    return avatarBgClass;
};

export const getLocalAdminDetails = () => {
    let details = localStorage.getItem(LOCAL_STORAGE.ORI_ADMIN);
    let oriAdminDetails = details && details !== undefined ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.ORI_ADMIN)) : null;
    return oriAdminDetails;
};

export const getAuthSocketData = () => {
    const oriAdminDetails = getLocalAdminDetails();
    const auth_socket_data = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'Authorization': oriAdminDetails && oriAdminDetails.token && oriAdminDetails.token.trim().length > 0 ? oriAdminDetails.token : null
                }
            }
        },
        query: {
            role: 'admin',
            channelName: 'web',
            psid: oriAdminDetails && oriAdminDetails.admin_id && oriAdminDetails.admin_id.trim().length > 0 ? oriAdminDetails.admin_id : null,
            brandName: BRAND_INFO.name,
        }
    };
    return auth_socket_data;
};

export const formatPrice = (price, currency) => {
    switch (currency) {
        case CURRENCY.RUPEES:
            return Intl.NumberFormat("en-In", { style: "currency", currency: "INR" }).format(price);
        case CURRENCY.DOLLAR:
            return Intl.NumberFormat("en-In", { style: "currency", currency: "USD" }).format(price);
        default:
            return price;
    }
};

export const formatDate = (value) => {
    let date = new Date(value);
    return date.toLocaleDateString('en-In', { year: "numeric", month: "short", day: "numeric" });
};

export const formatMonthTime = (value) => {
    let date = new Date(value);
    return date.toLocaleTimeString('en-In', { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

export const formatTime = (value) => {
    let date = new Date(value);
    return date.toLocaleTimeString('en-In', { hour: "2-digit", minute: "2-digit" });
};

export const formatDateTime = (value) => {
    let date = new Date(value);
    return date.toLocaleTimeString('en-In', { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

export const getLang = function () {
    return (navigator.languages && navigator.languages.length) ? navigator.languages[0].split('-')[0] : navigator.language.split('-')[0];
};

export const checkDevice = {
    isMobile: function () {
        if (navigator.userAgent.match(/Android/i)) {
            return ({
                mobile: true,
                userAgent: 'Android'
            });
        } else if (navigator.userAgent.match(/BlackBerry/i)) {
            return ({
                mobile: true,
                userAgent: 'BlackBerry'
            });
        } else if (navigator.userAgent.match(/iPhone|iPod/i)) {
            return ({
                mobile: true,
                userAgent: 'iPhone'
            });
        } else if (navigator.userAgent.match(/iPad/i)) {
            return ({
                mobile: false,
                userAgent: 'iPad'
            });
        } else if (navigator.userAgent.match(/Opera Mini/i)) {
            return ({
                mobile: true,
                userAgent: 'Opera'
            });
        } else if (navigator.userAgent.match(/IEMobile/i)) {
            return ({
                mobile: true,
                userAgent: 'WindowsPhone'
            });
        } else if (navigator.userAgent.match(/Chrome/i)) {
            return ({
                mobile: false,
                userAgent: 'Web Chrome'
            });
        } else if (navigator.userAgent.match(/Safari/i)) {
            return ({
                mobile: false,
                userAgent: 'Web Safari'
            });
        } else if (navigator.userAgent.match(/Mozilla/i)) {
            return ({
                mobile: false,
                userAgent: 'Web Mozilla'
            });
        } else {
            return ({
                mobile: false,
                userAgent: 'Web'
            });
        }
    },
    screen_data: function () {
        return (
            {
                screen_width: window.innerWidth,
                screen_height: window.innerHeight,
                screen_orientation: this.screen_orientation(),
                screen_type: this.screen_type()
            }
        );
    },
    screen_orientation: function () {
        if (window.matchMedia("(orientation:landscape)").matches) {
            return 'landscape';
        } else {
            return 'portrait';
        }
    },
    screen_type: function () {
        if (window.innerWidth <= 480) {
            return 'xs';
        } else if (window.innerWidth <= 768) {
            return 'sm';
        } else if (window.innerWidth <= 992) {
            return 'md';
        } else if (window.innerWidth <= 1200) {
            return 'lg';
        } else if (window.innerWidth <= 1600) {
            return 'hd';
        } else if (window.innerWidth <= 2560) {
            return 'fhd';
        } else {
            return 'uhd';
        }
    },
    deviceStatus: function () {
        return ({
            ...this.isMobile(),
            ...this.screen_data()
        });
    }
};