import http from "./httpService";

import config from "./config.json";

export const registerUser = user => {
    return http.post(
        `${config.localapi}/api/auth/register`,
        JSON.stringify(user)
    );
};

export const loginUser = user => {
    return http.post(`${config.localapi}/api/auth/login`, JSON.stringify(user));
};
