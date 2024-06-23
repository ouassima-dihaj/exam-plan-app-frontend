import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/semestres";

export const getSemestres = () => axios.get(REST_API_BASE_URL);