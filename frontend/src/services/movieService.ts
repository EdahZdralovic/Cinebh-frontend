import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://localhost:8080/api/";

export const getMovies = async (type: string, page: number, size: number) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}${type}`, {
            params: {type, page, size},
        });
        return response.data;
    } catch (error) {
        console.error("ups", error);
        throw error;
    }
};
