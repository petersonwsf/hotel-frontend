"use client"
import { Room } from "@/types/Room.types"
import { formatFloor, getRoomCategoryLabel } from "@/utils/formatTextsRooms"
import { useRouter } from "next/navigation"
import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

interface CardRoomSlideProps {
    room: Room
}

export default function CardRoomSlide({ room } : CardRoomSlideProps) {

    const router = useRouter()

    function handleRedirect() {
        router.push(`/reservation/${room.id}`)
    }

    return (
        <div className="rounded-lg shadow-xl overflow-hidden cursor-pointer mb-[2rem]" onClick={handleRedirect}>
            <div className="w-full h-[200px] relative overflow-hidden">
                <img  alt="Imagem do Quarto" src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${room.image}`} className="w-full h-full object-cover hover:scale-[1.1] duration-[.3s]" />
                <div className="w-full absolute absolute top-5 flex justify-between px-[.5rem]">
                    <span className="rounded-xl bg-[#002179] text-white px-[1rem] py-[.1rem] inline-flex items-center gap-2 text-sm">{formatFloor(room.floor)}</span>
                    <span className="rounded-xl bg-gray-200 px-[1rem] py-[.1rem] inline-flex items-center gap-2 text-sm"><FaStar className="w-3 h-3 text-[#002179]"/> {room.ratingSummary.averageRating}</span>
                </div>
                <span className="rounded-xl bg-gray-200 px-[1rem] py-[.1rem] flex items-center gap-2"><FaStar className="w-3 h-3 text-[#002179]"/> 5.0</span>
            </div>
            <div className="w-full p-[1rem] flex flex-col gap-3">
                <h3 className="text-xl text-[#002179] font-[500]">{getRoomCategoryLabel(room.category)}</h3>
                <p className="line-clamp-2 break-words font-light">{room.description}</p>
                <p className="font-light"><span className="font-semibold text-2xl text-[#002179]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl'}).format(room.customPrice)}</span> / dia</p>
                <button onClick={handleRedirect} className="bg-[#002179] py-[.5rem] px-[1rem] text-white font-semibold rounded-lg cursor-pointer gap-2 inline-flex justify-center items-center"><CiCalendar /> Reservar quarto</button>
            </div>
        </div>
    )
}
