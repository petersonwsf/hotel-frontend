import { api } from "@/lib/api/api"
import { ReviewBody, ReviewQueryParams } from "@/types/Review.types"
import { buildQueryParams } from "@/utils/buildQueryParams"

export default function useReview() {
    async function createReview(rating: number, comment: string, reservationId: number) {
        
        const payload : ReviewBody = {
            rating,
            comment,
            reservationId
        }
        
        try {
            const response = await api.post(`/hotel/review`, payload)
            return response.data
        } catch (error : any) {
            throw error
        }
    }

    async function replyComment(reply: string, id: number) {
        
        try {
            const response = await api.patch(`/hotel/review/reply/${id}`, { reply })
            return response.data
        } catch (error : any) {
            throw error
        }
    }

    async function getReviewsList(params: ReviewQueryParams) {
        
        const queryParams = buildQueryParams(params)

        try {
            const response = await api.get(`/hotel/review${queryParams}`)
            return response.data;
        } catch (error: any) {
            throw error
        }
    }

    return {
        createReview,
        getReviewsList,
        replyComment
    }
}