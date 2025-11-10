import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
}); //za sada dosta
export default axiosInstance;
