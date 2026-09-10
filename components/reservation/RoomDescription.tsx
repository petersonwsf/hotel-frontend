import { Room } from "@/types/Room.types";
import { formatEnums, formatFloor, getAmenityIcon, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { FaDoorOpen, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RoomDescriptnProps {
    room: Room;
}

export default function RoomDescription({ room }: RoomDescriptnProps) {
    
    const renderRatingStars = (rating: number = 0) => {
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-400" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="w-5 h-5 text-gray-300" />);
            }
        }
        
        return stars;
    };

    return (
        <div>
            <div className="w-full h-[400px] relative">
                <img 
                    src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${room.image[0]}`} 
                    alt="" 
                    className="w-full h-full object-cover rounded-t-xl" 
                />
                <div className="py-[.2rem] px-[1.5rem] bg-[#002BB3] absolute top-[20px] left-[20px] z-[10000] rounded-[10px]">
                    <p className="m-[0] text-white font-semibold">{getRoomCategoryLabel(room.category)}</p>
                </div>
            </div>
            
            <div className="flex flex-col py-[1rem] px-[1.5rem] border-1 border-gray-300 rounded-b-lg">
                <h2 className="text-[#002BB3] font-semibold text-2xl">Quarto {room.code}</h2>
                
                <div className="flex justify-between [&>div]:flex [&>div]:items-center ">
                    <div>
                        <p className="flex items-center m-[0px] text-[#002BB3] gap-2 text-lg my-[.5rem]">
                            <FaDoorOpen /> {formatFloor(room.floor)}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        {renderRatingStars(room.ratingSummary.averageRating)}
                        <span className="text-sm font-semibold text-gray-600 ml-1">
                            ({room.ratingSummary.averageRating ? room.ratingSummary.averageRating.toFixed(1) : "0.0"})
                        </span>
                    </div>
                </div>

                <div className="border-b-1 pb-5 border-gray-300">
                    <p className="text-gray-500 font-light">
                        {room.description}
                    </p>
                </div>

                <div className="my-[1rem] flex flex-wrap gap-3">
                    {room.amenities.map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity)
                        return (
                            <div className="flex gap-2 items-center p-[.5rem] border-1 border-gray-300 rounded-[5px]" key={`amenitie-${index}`}>
                                {Icon && <Icon fontSize={20} className="text-gray-500" />}
                                <p className="font-light text-gray-500 m-[0px]">{formatEnums(amenity)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}