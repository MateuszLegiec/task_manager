import {authService} from "./auth.service";

const baseApi = 'https://localhost:8080/api/task';

function addComment(taskId, text) {
    fetch(baseApi + '/' + taskId + "/add-comment", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: text
    });
}

function getComments(taskId) {
    // return fetch(baseApi + '/' + taskId + '/comments', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': authService.authHeader(),
    //     },
    // });
}
function getAll() {
    return fetch(baseApi + '/all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
    });
}

function get(id) {
    return fetch(baseApi + '/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
    });
}

function save(task) {
    fetch(baseApi + '/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: task
    });
}

function update(taskId,task) {
    fetch(baseApi + '/' + taskId + '/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': authService.authHeader(),
        },
        body: task
    });
}

function getStatuses() {
    // return fetch(baseApi + '/statuses', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': authService.authHeader(),
    //     },
    // });
    return {};
}

export const taskService = {
    getAll,
    getStatuses,
    get,
    addComment,
    save,
    update,
    getComments
};