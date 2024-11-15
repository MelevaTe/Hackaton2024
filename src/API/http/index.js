import axios from "axios";

export const API_URL = `/api/v1/auth`;
export const API_URL2 = `/api/v1/users`;

const $api = axios.create({
    baseURL: API_URL
});

const $api2 = axios.create({
    baseURL: API_URL2
});


export default $api;