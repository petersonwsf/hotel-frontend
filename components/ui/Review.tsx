import { Review as ReviewInterface } from "@/types/Review.types";
import { getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface ReviewProps {
    review: ReviewInterface;
}

export default function Review({ review } : ReviewProps) {

    const renderRatingStars = (rating: number = 0) => {
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="w-4 h-4 text-[#0033AD]" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="w-4 h-4 text-[#0033AD]" />);
            } else {
                stars.push(<FaRegStar key={i} className="w-4 h-4 text-gray-600" />);
            }
        }
        
        return stars;
    };

    console.log(review)

    return (
        <div className="bg-gray-100 rounded-lg p-[1.5rem] h-[350px] flex flex-col justify-between">
            <div className="flex flex-col gap-[1rem]">
                <div>
                    <div className="flex gap-2 items-center font-light">
                        {renderRatingStars(review.rating)}
                    </div>
                </div>
                <div>
                    <p className="line-clamp-7 font-light leading-relaxed">
                        <q>{review.comment}</q>
                    </p>
                </div>
            </div>
            <div className="mt-3">
                <div className="flex items-center gap-2">
                    <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${review.user.imageKey}`} alt="Foto de perfil usuário" className="w-[40px] h-[40px] rounded-full object-cover" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{review.user.name}</span>
                        <span className="text-sm font-light">{review.address.city}, {review.address.state}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}