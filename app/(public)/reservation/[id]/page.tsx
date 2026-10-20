import RoomDescription from "./components/RoomDescription"
import { getRoomById } from "@/lib/api/rooms"
import { notFound } from "next/navigation"
import ReservationDetails from "./components/ReservationDetails"

export default async function Reservation({ params } : { params: Promise<{ id : string }>}) {
    
    const { id } = await params
    
    const room = await getRoomById(Number(id))
    
    if (!room) {
        notFound()
    }

    return (
        <div id="reservation-page" className="w-full max-w-7xl px-4 md:px-6 m-auto py-5 my-3">
            <div className="flex flex-col lg:flex-row gap-[2rem] items-stretch lg:items-start">
                <div className="w-full lg:w-[70%] flex flex-col gap-5">
                    <RoomDescription room={room} />
                </div>
                <ReservationDetails room={room}/>
            </div>
        </div>
    )
}