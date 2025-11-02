import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/movies";

export const getMovies = async (page: number, size: number) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        console.error("jbga filmovi", error);
        throw error;
    }
};