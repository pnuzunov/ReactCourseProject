import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const url = 'http://localhost:3000/users';

export function getUsers() {
    return axios.get(`${url}`);
}

export function getUser(id) {
    return axios.get(`${url}/${id}`);
}

export function saveUser(userData) {
    if(userData.id === '') {
        const uuid = uuidv4();
        userData = {
            ...userData,
            id: uuid
        };
        return axios.post(`${url}`, userData);
    }
    return axios.put(`${url}/${userData.id}`, userData);
}

export async function getInvolvedUsers(threadPosts) {
    const data = (await getUsers()).data;

    return data;
}