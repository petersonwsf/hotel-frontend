"use client"

import { RoomList } from "@/types/Room.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { IoPersonOutline } from "react-icons/io5";

interface RoomSlideProps {
  rooms: RoomList[];
  setRoomSelected: (value: RoomList) => void;
}

export default function RoomSlide({ rooms, setRoomSelected } : RoomSlideProps) {

    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

    const handleRoomChange = (swiper: SwiperClass) => {
        const currentRoom = rooms[swiper.realIndex];
        if (currentRoom) {
            setRoomSelected(currentRoom);
        }
    };

    return (
        <div className="w-full max-w-full flex flex-col my-3">
            <div className="flex justify-end items-center gap-3 w-full mb-2">
                <button
                    onClick={() => swiperInstance?.slidePrev()}
                    aria-label="Slide anterior"
                    className="p-1 text-white bg-[#002179] hover:bg-[#001a60] rounded-full transition cursor-pointer active:scale-95"
                >
                    <HiChevronLeft className="text-md" />
                </button>
                <button
                    onClick={() => swiperInstance?.slideNext()}
                    aria-label="Próximo slide"
                    className="p-1 text-white bg-[#002179] hover:bg-[#001a60] rounded-full shadow transition cursor-pointer active:scale-95"
                >
                    <HiChevronRight className="text-md" />
                </button>
            </div>
            <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    handleRoomChange(swiper);
                }}
                onSlideChange={(swiper) => handleRoomChange(swiper)}
                className="[&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden w-full overflow-hidden"
            >
                {rooms.map((room) => (
                    <SwiperSlide key={room.id}>
                        <div className="w-full border-1 rounded-lg border-gray-300 flex gap-2 bg-gray-50">
                            <div className="h-[100px] w-[150px] rounded-bl-lg rounded-tl-lg overflow-hidden">
                                <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${room.image}`} alt="Foto do quarto" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col gap-1 pe-3">
                                <p className="font-medium text-sm">{getRoomCategoryLabel(room.category)}</p>
                                <p className="font-medium text-[12px] flex items-center gap-1"><IoPersonOutline className="text-[#0033AD] w-4 h-4"/> {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}</p>
                                <p className="font-medium text-[12px] flex items-center gap-1"><span className="text-[#0033AD] w-5 h-5 flex items-center justify-center rounded-full bg-blue-100">{room.amenities.length}</span> Comodidades</p>
                                <div className="w-full text-end">
                                    <span className="text-[#0033AD] font-medium text-[12px]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(room.customPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}