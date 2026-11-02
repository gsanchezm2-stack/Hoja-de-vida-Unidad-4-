import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/experiencias';

export const getExperiencias = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getExperienciaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createExperiencia = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateExperiencia = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteExperiencia = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};