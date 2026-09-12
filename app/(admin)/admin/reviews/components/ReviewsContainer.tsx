"use client"

import { Review } from "@/types/Review.types";
import ReviewCardAdmin from "./ReviewCardAdmin";

interface ReviewsContainerProps {
    reviews: Review[];
}

export default function ReviewContainer({ reviews } : ReviewsContainerProps) {
    return (
        <div className="my-[1.5rem]">
            {reviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-[2rem] items-start">
                    {reviews.map((review) => (
                        <ReviewCardAdmin  key={review.id} reviewData={review} />
                    ))}
                </div>
            ) : (
                <div className="w-full min-h-[300px] flex justify-center items-center">
                    <p className="text-2xl text-gray-600 font-light">Não há avaliações</p>
                </div>
            )}
        </div>
    )
}