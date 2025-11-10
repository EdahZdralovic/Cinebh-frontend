import axiosInstance from "./axiosInstance";
import baseURL from "./axiosInstance";

export const getMovies = async (type: string, page: number, size: number) => {
    try {
        const response = await axiosInstance.get(`${baseURL}${type}`, {
            params: {type, page, size},
        });
        return response.data;
    }
    catch (error) {
        console.error("Something went wrong", error);
        throw error;
    }
};
