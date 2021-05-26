import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { deleteThread, deleteThreadPost, getThreadPostsByUser, getThreadsByUser } from "./ForumService";

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

export async function deleteUser(userId) {
    const threads = await getThreadsByUser(userId);
    const threadPosts = await getThreadPostsByUser(userId);

    const deleteRequests = [];
    threads.forEach(element => {
        deleteRequests.push(deleteThread(element.id));
    });
    
    threadPosts.forEach(element => {
        deleteRequests.push(deleteThreadPost(element.id));
    });

    await Promise.all(deleteRequests);

    return axios.delete(`${url}/${userId}`);
}




export async function getInvolvedUsers(threadPosts) {
    const data = (await getUsers()).data;

    return data;
}