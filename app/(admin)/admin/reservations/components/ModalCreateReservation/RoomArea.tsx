import { RoomList } from "@/types/Room.types"
import { useEffect, useState } from "react";

import { LuDoorOpen } from "react-icons/lu";
import useRooms from "@/hooks/useRooms";
import RoomsFilter from "./RoomsFilter";
import RoomSlide from "./RoomSlide";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface RoomAreaProps {
    setRoomSelected: (value: RoomList | null) => void;
}

export default function RoomArea({ setRoomSelected } : RoomAreaProps) {

    const [rooms, setRooms] = useState<RoomList[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { getRoomsList } = useRooms()

    //Filters
    const [capacity, setCapacity] = useState<number>(1)
    const [category, setCategory] = useState<string>('')
    const [prices, setPrices] = useState<{minPrice?: number, maxPrice?: number}>({ minPrice: undefined, maxPrice: undefined })

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true)
            const response = await getRoomsList({
                maxPrice: prices.maxPrice?.toString(),
                minPrice: prices.minPrice?.toString(),
                capacity: capacity.toString(),
                category: category === 'all' ? undefined : category,
            })
            setRooms(response)
            setRoomSelected(response[0])
            setLoading(false)
        }
        fetchRooms()
    }, [capacity, category, prices])

    return (
        <div className="border-1 flex-1 border-gray-300 rounded-lg p-[1.5rem] min-w-0">
            <h4 className="font-semibold flex items-center gap-1 text-md">
                <LuDoorOpen className="text-[#0033AD]" /> 2. Quarto para a reserva
            </h4>
            <hr className="text-gray-300" />
            {loading ? (
                <div className="w-full h-[100px] flex justify-center items-center">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            ) : (
                <RoomSlide rooms={rooms} setRoomSelected={setRoomSelected} />
            )}
            <RoomsFilter capacity={capacity} setCapacity={setCapacity} category={category} setCategory={setCategory} prices={prices} setPrices={setPrices} />
        </div>
    )
}