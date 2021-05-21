import axios from "axios";

const url = 'http://localhost:3000';

export function getTopics() {
    return axios.get(`${url}/topics`);
}

export function getCategories() {
    return axios.get(`${url}/categories`);
}

export function getTopic(uuid) {
    return axios.get(`${url}/topics/${uuid}`);
}

export function getCategory(uuid) {
    return axios.get(`${url}/categories/${uuid}`);
}

export async function getThread(thread) {
    const data = (await axios.get(`${url}/threads`)).data;

    return data.find(d => d.uuid === thread);
}

export async function getThreadsByTopic(topic) {
    const data = (await axios.get(`${url}/threads`)).data;

    return data.filter(d => d.parent === topic);
}

export async function getThreadPosts(thread) {
    const data =  (await axios.get(`${url}/threadPosts`)).data;

    return data.filter(d => d.parent === thread);
}