import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/elements";
const ENSEIGNANTS_API_URL = "http://localhost:8080/api/enseignants";

export const addElementPedagogique = (elementPedagogique) => {
  return axios.post(REST_API_BASE_URL, elementPedagogique);
};

export const fetchEnseignants = () => {
  return axios.get(ENSEIGNANTS_API_URL);
};

export const fetchAllElementsPedagogiques = () => {
  return axios.get(REST_API_BASE_URL);
};

export const deleteElementPedagogique = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/${id}`);
};

export const updateElementPedagogique = (id, elementPedagogique) => {
  return axios.put(`${REST_API_BASE_URL}/${id}`, elementPedagogique);
};
export const getElements = () => axios.get(REST_API_BASE_URL);
