import axios from "axios";

const API_BASE_URL = "https://fc4fxqq0dd.execute-api.us-east-1.amazonaws.com"; // Replace with your API Gateway URL

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const createUser = (user) => axios.post(`${API_BASE_URL}/users`, user);
export const updateUser = (user) => axios.put(`${API_BASE_URL}/users`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);
