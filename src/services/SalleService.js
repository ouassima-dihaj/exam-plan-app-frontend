import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/salles";

export const getSalles = () => axios.get(REST_API_BASE_URL);

export const getSallesByExam = (idExam) =>
    axios.get(`${REST_API_BASE_URL}/examen/${idExam}`);