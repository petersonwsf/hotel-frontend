import FeaturedRooms from "@/app/(public)/components/FeaturedRooms/FeaturedRooms";
import Gallery from "@/app/(public)/components/Gallery/Gallery";
import HeroSection from "@/app/(public)/components/Hero/HeroSection";
import Location from "@/app/(public)/components/Location";
import Offer from "@/app/(public)/components/Offer";
import Reviews from "@/app/(public)/components/Reviews/Reviews";
import LoadingFeaturedRooms from "./components/loading/loadingFeaturedRooms";
import LoadingReviews from "./components/loading/loadingReviews";
import LoadingGallery from "./components/loading/loadingGallery";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <div className="m-auto w-full max-w-7xl px-4 md:px-6 py-5">
        <Suspense fallback={<LoadingFeaturedRooms />}>
          <FeaturedRooms />
        </Suspense>
        <Offer />
        <Suspense fallback={<LoadingReviews />}>
          <Reviews />
        </Suspense>
        <Suspense fallback={<LoadingGallery />}>
          <Gallery />
        </Suspense>
        <Location />
      </div>
    </>
  );
}