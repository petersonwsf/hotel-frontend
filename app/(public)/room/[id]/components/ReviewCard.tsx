"use client";

import { Review } from "@/types/Review.types";
import { formatDateTimeToPtBR } from "@/utils/formatDate";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {

    const [viewMore, setViewMore] = useState<boolean>(false);
    const [viewReply, setViewReply] = useState<boolean>(false)
    const MAX_CHARACTERS = 120;
    const isLongText = review.comment ? review.comment.length > MAX_CHARACTERS : false;
    const renderRatingStars = (rating: number = 0) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300 w-4 h-4" />);
            }
        }

        return stars;
    };

    return (
        <div className="my-[1.5rem] w-full py-[1rem] bg-gray-50 p-[1.5rem] rounded-lg shadow-lg">
            <div className="flex gap-4 items-center">
                <div className="text-center">
                    <img 
                        src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${review.user.imageKey}`} 
                        className="rounded-full object-cover w-[40px] h-[40px]" 
                        alt="Imagem do usuário" 
                    />
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-medium">{review.user.name}</h4>
                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-light">
                                {review.address?.city}, {review.address?.state}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {renderRatingStars(review.rating)}
                    </div>
                </div>
            </div>

            <div>
                <p className="font-light my-3 text-medium">
                    <span className={`italic mr-[.5rem] ${!viewMore && isLongText ? 'line-clamp-2' : ''}`}>
                        <q>{review.comment}</q>
                    </span>
                    {isLongText && (
                        <button
                            type="button"
                            onClick={() => setViewMore((prev) => !prev)} 
                            className={`font-medium text-[#002BB3] cursor-pointer hover:underline text-sm ml-1 ${viewMore ? 'hidden' : ' '}`}
                        >
                            Ver mais
                        </button>
                    )}
                </p>
            </div>
            {review.reply && (
                <div className="flex flex-col gap-3">
                    <span 
                        onClick={() => setViewReply((prev: boolean) => !prev)} 
                        className={`cursor-pointer p-[.5rem] hover:bg-gray-100 duration-[.3s] inline-flex items-center gap-2 text-sm text-gray-600 font-medium`}>
                            <MdOutlineComment />{viewReply ? 'Ocultar resposta do Lúmen' : 'Ver resposta do Lúmen'}
                    </span>
                    {viewReply && (
                        <div className="my-[.5rem]">
                            <div className="flex w-full justify-between">
                                <div className="flex gap-2 items-center font-light text-sm">
                                    <Image width={30} height={30} className="rounded-full" alt="Foto Lúmen Hotel" src="/images/logo_escura.png" />
                                    Resposta do Lúmen hotel
                                </div>
                                <p className="text-sm font-light">Em {formatDateTimeToPtBR(review.repliedAt)}</p>
                            </div>
                            <p className="text-gray-600 mt-[1rem]"><q>{review.reply}</q></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}