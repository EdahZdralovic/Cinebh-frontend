import axiosInstance from "./axiosInstance.tsx";

export async function getFilterData(type: string) {
    try {
        const endpoint = (() => {
            switch (type) {
                case "genres":
                    return "/genres";
                case "locations":
                    return "/locations";
                case "venues":
                    return "/venues/all";
                default:
                    throw new Error(`Unknown filter type: ${type}`);
            }
        })();

        const { data } = await axiosInstance.get(endpoint);
        return data;
    } catch (error) {
        console.error("Something went wrong", error);
        throw error;
    }
}