import axios from "axios";

const baseUrl = "https://notesappserver-v7ne.onrender.com/api/notes";

const getAllNotes = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createNote = (newNote) => {
  const request = axios.post(baseUrl, newNote);
  return request.then((res) => res.data);
};

const updateNote = (id, updatedNote) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedNote);
  return request.then((res) => res.data);
};

export default {
  getAllNotes,
  createNote,
  updateNote,
};
