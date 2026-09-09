"use client"
import { RoomList } from "@/types/Room.types";
import { formatEnums, formatFloor, getAmenityIcon, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { RiHotelLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { RiGroupLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface CardRoom {
    width: string;
    room: RoomList,
    buttonFunction: () => void;
    admin: boolean;
}

const minio_url = process.env.NEXT_PUBLIC_URL_MINIO 

export default function CardRoom({ width, room, buttonFunction, admin }: CardRoom) {

    let mainImageUrl = ''

    const router = useRouter()

    if (room.image) {
        if (Array.isArray(room.image)) {
            if (room.image.length > 0) {
                mainImageUrl = `${minio_url}/${room.image[0]}`
            }
        } else {
            mainImageUrl = `${minio_url}/${room.image}`
        }
    }

    return (
        <div className={`flex ${width} my-3 gap-3 bg-gray-50 rounded-xl`}>
            <div className="flex items-center justify-center shrink-0">
                <img src={mainImageUrl} alt="Image quarto" className="rounded-bl-xl rounded-tl-xl w-[300px] h-[300px] object-cover" />
            </div>
            <div className="flex flex-col flex-1 min-w-0 p-[1rem] gap-2">
                <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-gray-600"><RiHotelLine /> {formatFloor(room.floor)}</span>
                    <span className="flex items-center gap-2 font-light text-sm "><FaStar className="text-yellow-400"/> 4.9 ( 48 avalições )</span>
                </div>
                <h4 className="text-2xl font-[600] font-sans text-[#002179]">{getRoomCategoryLabel(room.category)}</h4>
                <span className="flex items-center gap-2 font-light text-md"><RiGroupLine className="text-[#002179]" /> Até {room.capacity} {room.capacity > 1 ? 'Adulto' : 'Adultos'}</span>
                <p className="font-light line-clamp-2 text-md text-gray-500">{room.description}</p>
                <div className="flex gap-2 items-center flex-wrap">
                    {room.amenities.slice(0,4).map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity)
                        return (
                            <span key={index} className="flex items-center gap-2 text-sm bg-gray-200 text-gray-500 rounded-lg p-[.5rem]">{Icon && <Icon className="text-[#002179]" />} {formatEnums(amenity)}</span>
                        )
                    })}
                </div>
                <div className="flex justify-between items-end flex-1">
                    <p className="flex items-center font-light text-sm gap-2"><span className="text-2xl text-[#002179] font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl'}).format(room.customPrice)}</span> / dia</p>
                    <div className="flex gap-3 items-center">
                        <button onClick={buttonFunction} className="text-[#002179] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1rem] rounded-lg duration-[.3s] hover:bg-gray-200">Ver detalhes <FaArrowRight /></button>
                        {!admin && <button onClick={() => router.push(`/reservation/${room.id}`)} className="text-white bg-[#002179] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1rem] rounded-lg duration-[.3s]">Reservar quarto <CiCalendar /></button>}
                    </div>
                </div>
            </div>
        </div>
    )
}