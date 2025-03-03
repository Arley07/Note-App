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

export const getNotes = async (archived: boolean, tag?: string): Promise<Note[]> => {
  const response = await api.get(`/notes`, {
    params: {
      archived,
      tag,
    },
  });
  return response.data;
};

export const createNote = async (note: { title: string; content: string; tags?: string[] }): Promise<Note> => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const updateNote = async (id: number, note: Partial<Note>): Promise<Note> => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

export const getTags = async (): Promise<string[]> => {
  const response = await api.get('/notes/tags');
  return response.data;
};

export default api;