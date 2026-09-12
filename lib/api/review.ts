import { ReviewQueryParams } from "@/types/Review.types";
import { cookies } from "next/headers";
import { api } from "./api";
import { buildQueryParams } from "@/utils/buildQueryParams";

const URL = process.env.URL_API_HOTEL

export async function getReviews(params: ReviewQueryParams) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    const queryParams = buildQueryParams(params)

    try {
        const response = await api.get(`${URL}/review${queryParams}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error : any) {
        throw error
    }
}