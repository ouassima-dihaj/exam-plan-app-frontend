import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/enseignants";

export const saveEnseignant = (formData) => axios.post(REST_API_BASE_URL, formData);

export const getEnseignants = () => axios.get(REST_API_BASE_URL);

export const getEnseignantById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const getEnseignantByIdSalleAndAvailability = (id) => {
    const url = `${REST_API_BASE_URL}/api/enseignants/salle/${id}`;
    console.log("Making request to:", url);
    return axios.get(url)
        .then(response => {
            console.log("Response received:", response);
            return response;
        })
        .catch(error => {
            console.error("Error occurred:", error);
            throw error;
        });
};


export const deleteEnseignant = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);

export const updateEnseignant = (idEnseignant, formData) => axios.put(`${REST_API_BASE_URL}/${idEnseignant}`, formData);

export const getDepartmentName = (id) => {
    return axios.get(`http://localhost:8080/api/departements/${id}`);
};

export const getFiliereName = (id) => {
    return axios.get(`http://localhost:8080/api/filieres/${id}`);
};

export const getGroupeName = (id) => {
    return axios.get(`http://localhost:8080/api/groupes/${id}`);
};

export const getSalleName = (id) => {
    return axios.get(`http://localhost:8080/api/salles/${id}`);
};

