"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import CardRoom from "../../ui/CardRoomSlide";
import { Room } from "@/types/Room.types";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface FeaturedRoomsSlideProps {
  rooms: Room[];
}

export default function FeaturedRoomsSlide({ rooms }: FeaturedRoomsSlideProps) {

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  return (
    <div>
      <div className="flex justify-end items-center gap-3 w-full mb-4">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Slide anterior"
          className="p-2 text-white bg-[#002179] hover:bg-[#001a60] rounded-full transition cursor-pointer active:scale-95"
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Próximo slide"
          className="p-2 text-white bg-[#002179] hover:bg-[#001a60] rounded-full shadow transition cursor-pointer active:scale-95"
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>
      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="[&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.id}>
            <CardRoom room={room} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}