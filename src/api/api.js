const apiUrl = 'http://localhost:8080'
export function getUsers() {
    return fetch(`${apiUrl}/users`).then(response => response.json())
}
export function getUser(id) {
    return fetch(`${apiUrl}/users/${id}`).then(response => response.json())
}
export function updateUser(user) {
    return fetch(`${apiUrl}/users`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(json => console.log(json))
}
export function addUser(user) {
    return fetch(`${apiUrl}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}
export function deleteUser(id) {
    return fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
}

export function getSignedUrl(obj) {
    console.log('File Object', obj)
    return fetch (`${apiUrl}/sign-policy`)
}