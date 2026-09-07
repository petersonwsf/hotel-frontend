import FeaturedRoomsSlide from "./FeaturedRoomsSlide";
import { getRooms } from "@/lib/api/rooms";

export default async function FeaturedRooms() {

    const rooms = await getRooms({ page: 0, size: 10 })

    return (
        <section id="featured-rooms" className="my-[4rem]" aria-label="Featured rooms">
            <div className="w-[50%]">
                <span className="text-[#002179] font-[500]">Acomodações exclusivas</span>
                <h3 className="text-3xl font-[650] text-gray-800 font-sans">Quartos e Suítes Desenhados para o Máximo Relaxamento</h3>
                <p className="font-light text-gray-500">Cada espaço combina acústica perfeita, lençóis de algodão egípcio 600 fios, tecnologia intuitiva e vistas privilegiadas da capital.</p>
            </div>
            <div className="mt-3">
                <FeaturedRoomsSlide rooms={rooms?.content ?? []} />
            </div>
        </section>
    )
}