// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.mestoproject.students.nomoreparties.xyz';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }
            return res.json()
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return;
            }
        })
};

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.status)
            }
            return res.json()
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        return data;
                    } else {
                        return;
                    }
                })
        })
    };

    export const getContent = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                return res.json();
            })
            .then(data => data)
    };