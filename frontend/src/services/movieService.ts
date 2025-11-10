import axiosInstance from "./axiosInstance";

export const getMovies = async (type: string, page: number, size: number) => {
    const url = `${type}`;
    const params = { page, size };
    try {
        const { data } = await axiosInstance.get(url, { params });
        return data;
    }
    catch (error) {
        console.error("Something went wrong", error);
        throw error;
    }
};
