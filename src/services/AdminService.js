import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/admins";


export const saveAdmin= (formData) => axios.post(REST_API_BASE_URL, formData);

export const getAdmins = () => axios.get(REST_API_BASE_URL+"/nullSalle");

export const getAllAdmins = () => axios.get(REST_API_BASE_URL);

export const getAdminById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const getAdminByIdSalle = (id) => axios.get(`${REST_API_BASE_URL}/salle/${id}`);

export const deleteAdmin= (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);

export const updateAdmin = (idAdmin, formData) => axios.put(`${REST_API_BASE_URL}/${idAdmin}`, formData);

export const getSalleName = (id) => {
    return axios.get(`http://localhost:8080/api/salles/${id}`);
};

