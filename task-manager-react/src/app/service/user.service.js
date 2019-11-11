import {authService} from "./auth.service";

const baseApi = 'https://localhost:8080/api/user';

function changePassword(password,confirmedPassword) {
    if (!(password === confirmedPassword))
        return 'Passwords do not match';
    if (!(password.match('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$')))
        return 'Invalid password';

    fetch(baseApi + '/change-password', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        }
    }).then(
        () => {
            sessionStorage.setItem('firstLogin', 'false');
            window.location.reload();
        }
    ).catch(error => {return error});
}

function getAll() {
    return fetch(baseApi + '/all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        }
    });
}

function lockOne(email) {
    return fetch(baseApi + '/lock', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: email
    })
}

function unlockOne(email) {
    return fetch(baseApi + '/unlock', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: email
    })
}

function resetOne(email) {
    return fetch(baseApi + '/reset', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: email
    })
}

function saveOne(user) {
    return fetch(baseApi + '/add', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: user
    });
}

export const userService = {
    getAll,
    lockOne,
    unlockOne,
    resetOne,
    saveOne,
    changePassword
};