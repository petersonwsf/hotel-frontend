"use client";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCardSlide from "../../../../components/ui/Review";
import { Review } from "@/types/Review.types";

import 'swiper/css';
import 'swiper/css/free-mode';

interface ReviewsSlideProps {
    reviews: Review[]
}

export default function ReviewsSlide({ reviews } : ReviewsSlideProps) {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView={3}
            loop
            freeMode
            spaceBetween={20}
            speed={5000}
            centeredSlides={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false
            }}
            allowTouchMove={false}
            className="swiper-reviews"
        >
            {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                    <ReviewCardSlide review={review} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}