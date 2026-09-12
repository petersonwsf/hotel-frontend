"use client";

import useReview from "@/hooks/useReview";
import { Review, Sentiment } from "@/types/Review.types";
import { handleToast } from "@/utils/handleToast";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";

interface ReviewCardProps {
    reviewData: Review;
}

export default function ReviewCardAdmin({ reviewData }: ReviewCardProps) {

    const [review, setReview] = useState<Review>(reviewData)
    const [viewMore, setViewMore] = useState<boolean>(false);
    const [openReplyBox, setOpenReplyBox] = useState<boolean>(false)
    const [reply, setReply] = useState<string | undefined>(reviewData.reply)
    const [loading, setLoading] = useState<boolean>(false)

    const { replyComment } = useReview()

    if (!review) return null;

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

    const handleReplyComment = async () => {
        setLoading(true)
        try {
            const response = await replyComment(reply!, review.id)
            setReview(response)
            handleToast('Resposta enviada com sucesso', 'success')
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const reviewColor : Record<Sentiment, string> = {
        POSITIVE : 'border-green-400 shadow-green-200',
        NEGATIVE: 'border-red-400 shadow-red-200',
        NEUTRAL: 'border-yellow-400 shadow-yellow-200'
    }

    return (
        <div className={`w-full py-[1rem] bg-gray-50 p-[1.5rem] rounded-lg shadow-lg border-1 ${reviewColor[review.sentiment]} ${reviewColor[review.sentiment]}`}>
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
            <div className="flex flex-col gap-2">
                <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                        openReplyBox ? 'grid-rows-[1fr] opacity-100 mb-2' : 'grid-rows-[0fr] opacity-0 mb-0'
                    }`}
                >
                    <div className="overflow-hidden">
                        <textarea 
                            name="reply" 
                            id="reply" 
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Deixe uma resposta para a avaliação do usuário" 
                            className="border-1 border-gray-300 text-gray-800 rounded-lg p-[.5rem] w-full min-h-[150px] overflow-auto outline-none resize-none"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <span 
                        onClick={() => setOpenReplyBox((prev: boolean) => !prev)} 
                        className={`cursor-pointer p-[.5rem] hover:bg-gray-100 duration-[.3s] inline-flex items-center gap-2 text-sm text-gray-600 font-medium`}>
                            <MdOutlineComment />{openReplyBox ? 'Fechar caixa de resposta' : review.reply ? 'Ver resposta' : 'Responder'}
                    </span>
                    {openReplyBox && (
                        <button onClick={handleReplyComment} className={`text-white bg-[#002179] font-normal inline-flex gap-2 items-center cursor-pointer py-[.3rem] px-[1rem] rounded-lg duration-[.3s] hover:bg-[#001859] ${(!reply || reply.trim().length == 0 || loading)? 'opacity-[.5] pointer-events-none' : ''}`}>
                            {loading && <AiOutlineLoading3Quarters className="animate-spin"/>}{loading ? 'Enviando' : 'Enviar Resposta'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/*

*/