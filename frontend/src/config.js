export let REACT_APP_API_BASE_URL;

if (process.env.NODE_ENV === 'production') {
    REACT_APP_API_BASE_URL = 'https://my-spring-boot-app-s3vzdae22a-uc.a.run.app';
} else {
    REACT_APP_API_BASE_URL = 'http://localhost:8080';
}
export let APP_BASE_URL;

if (process.env.NODE_ENV === 'production') {
    APP_BASE_URL = 'https://wealthwave-414021.web.app/';
} else {
    APP_BASE_URL = 'http://localhost:3000';
}

export default { REACT_APP_API_BASE_URL, APP_BASE_URL };