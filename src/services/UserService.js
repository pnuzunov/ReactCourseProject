import axios from "axios";

const url = 'http://localhost:3000/users';

export function getUsers() {
    return axios.get(`${url}`);
}

export function getUser(id) {
    return axios.get(`${url}/${id}`);
}

export async function getInvolvedUsers(threadPosts) {
    const data = (await getUsers()).data;

    return data;
}