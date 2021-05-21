import axios from "axios";

const url = 'http://localhost:3000/users';

export function getUsers() {
    return axios.get(`${url}`);
}

export function getUser(uuid) {
    return axios.get(`${url}/${uuid}`);
}

export async function getInvolvedUsers(threadPosts) {
    const data = (await getUsers()).data;

    return data;
}