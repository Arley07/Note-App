import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL del backend
});

export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  tags?: string[];
}

export const getNotes = async (archived: boolean): Promise<Note[]> => {
  const response = await api.get(`/notes/${archived}`);
  return response.data;
};

export const createNote = async (note: { title: string; content: string }): Promise<Note> => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const updateNote = async (id: number, note: { archived: boolean }): Promise<Note> => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

export default api;