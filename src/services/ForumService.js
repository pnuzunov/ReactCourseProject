import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const url = 'http://localhost:3000';

export function getTopics() {
    return axios.get(`${url}/topics`);
}

export function getCategories() {
    return axios.get(`${url}/categories`);
}

export function getTopic(id) {
    return axios.get(`${url}/topics/${id}`);
}

export function getCategory(id) {
    return axios.get(`${url}/categories/${id}`);
}

export async function getThread(threadId) {
    const data = (await axios.get(`${url}/threads`)).data;

    return data.find(d => d.id === threadId);
}

export async function getThreadsByTopic(topicId) {
    const data = (await axios.get(`${url}/threads`)).data;

    return data.filter(d => d.parent === topicId);
}

export async function getThreadsByUser(userId) {
    const data = (await axios.get(`${url}/threads`)).data;

    return data.filter(d => d.createdBy === userId);
}

export async function getThreadPosts(threadId) {
    const data =  (await axios.get(`${url}/threadPosts`)).data;

    return data.filter(d => d.parent === threadId);
}

export async function getThreadPostsByUser(userId) {
    const data =  (await axios.get(`${url}/threadPosts`)).data;

    return data.filter(d => d.postedBy === userId);
}

export function saveThreadPost(postData) {
    const now = new Date();
    if(postData.id === '') {
        const newUuid = uuidv4();

        postData = {
            ...postData,
            id: newUuid,
            datePosted: now
        };

        return axios.post(`${url}/threadPosts`, postData)
    }
    postData = {
        ...postData,
        dateEdited: now
    };
    return axios.put(`${url}/threadPosts/${postData.id}`, postData)
}

export async function saveThread(threadData, firstPost) {
    if(threadData.id === '') {
        const newUuid = uuidv4();

        threadData.id = newUuid;
        
        firstPost.parent = threadData.id;
        await saveThreadPost(firstPost).then(_ => {
            return axios.post(`${url}/threads`, threadData);
        });
    }
    else return axios.put(`${url}/threads/${threadData.id}`, threadData);
}


export function deleteThreadPost(postId) {
    return axios.delete(`${url}/threadPosts/${postId}`);
}

export async function deleteThread(threadId) {
    const threadPosts = await getThreadPosts(threadId);

    const deleteRequests = [];
    threadPosts.forEach(element => {
        deleteRequests.push(deleteThreadPost(element.id));
    });
    
    await Promise.all(deleteRequests);
    
    return axios.delete(`${url}/threads/${threadId}`);
}