import RoomHeader from "@/components/rooms/RoomHeader";
import RoomsList from "@/components/rooms/RoomsList";
import Pagination from "@/components/ui/Pagination";
import { getRooms } from "@/lib/api/rooms";
import RoomsFilter from "./components/RoomsFilter";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Rooms({ searchParams }: PageProps) {

    const params = await searchParams;

    const rooms = await getRooms({
        page: params.page ?? '0',
        status: params.status ?? [],
        checkInDate: params.checkInDate ?? undefined,
        checkOutDate: params.checkOutDate ?? undefined,
        active: params.active ?? undefined,
        capacity: params.capacity ?? undefined,
        floor: params.floor ?? undefined,
        category: params.category ?? [],
        code: params.code ?? undefined,
        size: '10', 
        sort: 'id,desc'
    })

    return (
        <div>
            <RoomHeader />
            <RoomsFilter />
            <div className="flex gap-[1rem] mt-[2.5rem]">
                <RoomsList widthCard="w-full" rooms={rooms.content} action="EDIT"/>
            </div>
            <div className="flex items-center justify-end mt-[1rem]">
                <Pagination page={rooms?.pageable.pageNumber ?? 0} totalPages={rooms?.totalPages ?? 1} />
            </div> 
        </div>
    )
}