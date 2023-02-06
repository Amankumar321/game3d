import axios from 'axios';

const API = axios.create({ baseURL: 'https://game3d.onrender.com' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }
  
    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
export const editProfile = (formData, user) => API.put(`/profile/${user}`, formData)
export const editProfileImage = (formData, type, user, setProgress) => API.post(`/profile/${user}/${type}`, formData,{headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress: data => {setProgress(Math.round(100*data.loaded)/data.total)}})
export const createRoom = (user, roomPassword) => API.post('/room/create', { user, roomPassword })
export const checkRoom = (roomId, roomPassword) => API.post(`/room/${roomId}`, {roomPassword})
export const searchUsers = (input) => API.post('/profile/search', {input: input})
export const getProfile = (username) => API.get(`/profile/${username}`, {}) 