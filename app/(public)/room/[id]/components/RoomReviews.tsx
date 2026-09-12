"use client";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { FaRegComments } from "react-icons/fa6";
import { Room } from "@/types/Room.types";
import { Review } from "@/types/Review.types";
import { handleToast } from "@/utils/handleToast";
import useReview from "@/hooks/useReview";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface RoomReviewsProps {
    room: Room;
}

export default function RoomReviews({ room }: RoomReviewsProps) {

    const [page, setPage] = useState<number>(0)
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { getReviewsList } = useReview()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const response = await getReviewsList({ page: page, size: 4, roomId: room.id, commented: true })
                setReviews((prev: Review[]) => [...prev, ...response.content])
            } catch (error : any) {
                handleToast(error.response.data.message, 'error')

            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [room, page])

    return (
        <section className="w-full p-[2rem]">
            <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Avaliações sobre o quarto</h3>
            <div className="text-center p-[1.5rem] rounded-lg my-[1rem]">
                <h4 className="text-4xl font-[650] font-sans text-[#002179] mb-2">{room.ratingSummary.averageRating}</h4>
                <div className="inline-flex justify-center items-center gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} className="w-7 h-7 text-yellow-400"/>
                    ))}
                </div>
                <p className="text-center font-light text-gray-600 my-1">Baseado em {room.ratingSummary.totalReviews} avaliações</p>
            </div>
            <hr className="text-gray-300" />
            <div className="my-[1rem]">
                <div className="grid grid-cols-2 gap-[2rem] items-start">
                    {reviews.map((review) => (
                        <ReviewCard key={`review_${review.id}`} review={review} />
                    ))}
                </div>
                {loading && (
                    <div className="flex w-full items-center justify-center">
                        <AiOutlineLoading3Quarters className="animate-spin text-[#0033AD] w-8 h-8" />
                    </div>
                )}
            </div>
            <div className="text-center">
                {room.ratingSummary.totalReviews > reviews.length && (
                    <div className="inline-flex py-[.5rem] px-[1.5rem] gap-2 items-center bg-gray-50 rounded-lg text-gray-800 duration-[.3s] hover:bg-gray-200 cursor-pointer" onClick={() => setPage((prev : number) => prev + 1)}>
                        <FaRegComments className="text-[#002179] w-6 h-6" />
                        Carregar mais comentários ( {room.ratingSummary.totalReviews - reviews.length} restantes )
                    </div>
                )}
            </div>
        </section>
    )
}