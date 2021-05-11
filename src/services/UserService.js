import axios from "axios";

const url = 'http://localhost:3000/';

export function GetUsers() {
    return axios.get(`${url}users`);
}