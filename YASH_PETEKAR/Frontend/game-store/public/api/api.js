// src/api/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8082/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchUserProfile = (userId) => API.get(`/profiles/users/${userId}`);

export const updateUserProfile = (userId, formData) =>
    API.put(`/profiles/users/${userId}/update-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export default API;
