import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeaders()
  );

  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(
    API_URL,
    task,
    getAuthHeaders()
  );

  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    task,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};