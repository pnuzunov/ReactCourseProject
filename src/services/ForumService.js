import axios from "axios";

const url = 'http://localhost:3000';

export function getTopics() {
    return axios.get(`${url}/topics`);
}

export function getCategories() {
    return axios.get(`${url}/categories`);
}

export async function getThreadsByTopic(topic) {
    const data = (await axios.get(`${url}/threads`)).data;

    return data.filter(d => d.parent === topic);
}