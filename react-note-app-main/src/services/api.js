import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getNotes = () => api.get('/notes/');
export const createNote = (data) => api.post('/notes/', data);
export const updateNote = (slug, data) => api.put(`/notes/${slug}/`, data);
export const deleteNote = (slug) => api.delete(`/notes/${slug}/`);
export const searchNotes = (query) => api.get(`/notes-search/?search=${query}`);

export default api;