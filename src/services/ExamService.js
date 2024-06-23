import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/exams";

export const saveExam = (formData) =>
  axios.post(REST_API_BASE_URL+"/save", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getExams = () =>
  axios.get(REST_API_BASE_URL+"/all")
