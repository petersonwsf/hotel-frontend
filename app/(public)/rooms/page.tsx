import Filter from "@/components/rooms/Filter";
import Pagination from "@/components/ui/Pagination";
import RoomsList from "@/components/rooms/RoomsList";
import { getRooms } from "@/lib/api/rooms";
import { RoomCategory, StatusRoom } from "@/types/Room.types";

interface RoomsProps {
    searchParams: Promise<{ page?: string, status?: StatusRoom, floor?: string[], category?: RoomCategory[] }>;
}

export default async function Rooms({ searchParams } : RoomsProps) {
    
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 0;
    const categories = resolvedSearchParams.category || []
    const floors = resolvedSearchParams.floor || []
    const rooms = await getRooms({ page: currentPage, size: 10, category: categories, floor: floors });

    return (
        <section id="rooms" aria-label="Quartos disponíveis" className="my-[4rem] w-7xl m-auto">
            <div className="w-[60%] mb-[1rem]">
                <span className="text-[#002179] font-[500] text-sm">COLEÇÃO DE ACOMODAÇÕES</span>
                <h3 className="text-4xl font-[650] font-sans text-[#002179]">Acomodações & Suítes Exclusivas</h3>
                <p className="font-light text-gray-500">Encontre o refúgio perfeito nos Jardins. Conforto contemporâneo, isolamento acústico impecável e alta hospitalidade personalizada.</p>
            </div>
            <div className="flex justify-center items-start gap-5">
                <Filter />
                <div className="w-full">
                    <RoomsList rooms={rooms.content} widthCard="w-full" action="REDIRECT" />
                    <div className="flex items-center justify-end mt-[1rem]">
                        <Pagination page={rooms.pageable.pageNumber} totalPages={rooms.totalPages}/>
                    </div>
                </div>
            </div>
        </section>
    )
}