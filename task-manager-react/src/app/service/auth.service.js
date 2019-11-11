const baseApi = 'https://localhost:8080/api';

function getCurrentUser() {
    return {
        email: sessionStorage.getItem('email'),
        firstName: sessionStorage.getItem('firstName'),
        lastName: sessionStorage.getItem('lastName'),
        admin: (sessionStorage.getItem('admin') === 'true'),
        firstLogin: (sessionStorage.getItem('firstLogin') === 'true')
    };
}

function login(email, password){
    fetch(baseApi + `/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(handleResponse)
        .then(token => {
            sessionStorage.setItem('token', JSON.stringify(token));
        })
        .then(getMe)
        .then(() => {
            if (!getCurrentUser().email)
                return "Bad Credentials";
            window.location.reload();
            return '';
        });
}

function getMe() {
    fetch(baseApi + `/user/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': authHeader(),
        }
    }).then(response => {
        sessionStorage.setItem('email',response.body.email);
        sessionStorage.setItem('firstName',response.body.firstName);
        sessionStorage.setItem('lastName',response.body.lastName);
        sessionStorage.setItem('admin',response.body.admin);
        sessionStorage.setItem('firstLogin',response.body.firstLogin);
    });
}

function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('firstLogin');
    window.location.reload();
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                authService.logout();
                window.location.reload();
            }
            return Promise.reject((data && data.message) || response.statusText);
        }
        return data;
    });
}

function authHeader() {
    return (sessionStorage.getItem('token')) ? { Authorization: `Bearer ` + localStorage.getItem('token') } : {};
}

export const authService = {
    login,
    logout,
    authHeader,
    getCurrentUser,
};