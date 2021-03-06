import { getUsers } from "./UserService";

export async function login(userData) {

    const users = (await getUsers()).data;

    const loggedUser = users.find(u => u.username === userData.username && u.password.toString() === userData.password);

    if (loggedUser) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return;
    }

    throw new Error('Invalid username/password.');
}

export async function logout() {
    localStorage.removeItem('loggedUser');
}

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}
