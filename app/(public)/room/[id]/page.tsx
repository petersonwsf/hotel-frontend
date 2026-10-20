import { getRoomById } from "@/lib/api/rooms"
import { formatFloor, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { notFound } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { RiGroupLine } from "react-icons/ri";
import RoomImages from "./components/RoomImages";
import RoomInfo from "./components/RoomInfo";
import ReservationRoomArea from "./components/ReservationRoomArea";
import RoomReviews from "./components/RoomReviews";
import { Room } from "@/types/Room.types";

export default async function RoomPage({ params } : { params: Promise<{ id : string }>}) {
    
    const { id } = await params
    const room : Room = await getRoomById(Number(id));

    if (!room) {
        notFound()
    }

    return (
        <div id="room-details" aria-label={`Detalhes do quarto ${id}`} className="w-full max-w-7xl px-4 md:px-6 m-auto py-5 my-3">
            <div className="w-full lg:w-[60%] mb-[1rem]">
                <h3 className="text-2xl md:text-4xl font-[650] font-sans text-[#0033AD]">{getRoomCategoryLabel(room.category)}</h3>
                <div className="flex flex-wrap gap-x-[2rem] gap-y-2 my-3">
                    <span className="inline-flex items-center gap-2 text-gray-600"><FaStar className="text-yellow-400" /> {room.ratingSummary.averageRating} ( {room.ratingSummary.totalReviews} avaliações )</span>
                    <span className="inline-flex items-center gap-1 text-gray-600"><RiHotelLine /> {formatFloor(room.floor)}</span>
                    <span className="inline-flex items-center gap-1"><RiGroupLine className="text-[#002179]" /> Até {room.capacity} {room.capacity > 1 ? 'adultos' : 'adulto'}</span>
                </div>
            </div>
            <RoomImages images={Array.isArray(room.image) ? room.image : [room.image]} room={room} />
            <div className="w-full flex flex-col lg:flex-row my-[1rem] gap-3 items-stretch lg:items-start">
                <RoomInfo room={room} />
                <ReservationRoomArea room={room} />
            </div>
            <div className="w-full my-[1rem]">
                <RoomReviews room={room} />
            </div>
        </div>
    )
}