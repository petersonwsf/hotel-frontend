import { ReviewQueryParams } from "@/types/Review.types";
import { api } from "./api";
import { buildQueryParams } from "@/utils/buildQueryParams";

const URL = process.env.URL_API_HOTEL

export async function getReviews(params: ReviewQueryParams) {
    const queryParams = buildQueryParams(params)

    try {
        const response = await api.get(`${URL}/review${queryParams}`)
        return response.data;
    } catch (error : any) {
        throw error
    }
}