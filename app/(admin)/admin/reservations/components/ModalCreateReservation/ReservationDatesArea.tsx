"use client"
import useRooms from "@/hooks/useRooms";
import { RoomList } from "@/types/Room.types";
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { useEffect, useMemo } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegMoon } from "react-icons/fa6";

interface ReservationDatesAreaProps {
    room: RoomList | null;
    disponibility: boolean | null;
    setDisponibility: (value: boolean | null) => void;
    dates: {checkInDate?: string, checkOutDate?: string};
    setDates: React.Dispatch<React.SetStateAction<{checkInDate?: string, checkOutDate?: string}>>;
}

export default function ReservationDatesArea({ room, disponibility, setDisponibility, dates, setDates } : ReservationDatesAreaProps) {

    const { checkAvailability } = useRooms()

    const verifyDisponibility = async () => {
        if (!room || !dates.checkInDate || !dates.checkOutDate) return;
        const response = await checkAvailability(dates.checkInDate, dates.checkOutDate, room.id);
        setDisponibility(response)
    }

    useEffect(() => {
        verifyDisponibility()
    }, [room, dates])

    const diffDays : number | null = useMemo(() => {
        if (!dates.checkInDate || !dates.checkOutDate) return null;
        const diff = calcularDiferencaDias(dates.checkInDate, dates.checkOutDate)
        return diff > 0 ? diff : null
    }, [dates])
    
    return (
        <div className="border-1 flex-1 border-gray-300 rounded-lg p-[1.5rem] min-w-0">
            <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold flex items-center gap-1 text-md"><CiCalendar className="text-[#0033AD]" /> 3. Datas da reserva</h4>
                {diffDays && (
                    <span className="py-[.2rem] font-medium text-sm px-[1rem] bg-blue-200 text-[#0033AD] inline-flex gap-1 items-center rounded-xl"><FaRegMoon /> {diffDays} {diffDays > 1 ? 'Noites' : 'Noite'}</span>
                )}
            </div>
            <hr className="text-gray-300" />
            <div className="flex gap-2 w-full my-2">
                <div className="w-full">
                    <label htmlFor="checkin" className="text-xs font-medium mb-1 text-gray-800">
                        Entrada
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="checkin"
                            id="checkin"
                            value={dates.checkInDate || ""}
                            onChange={(e) => setDates(prev => ({ checkInDate: e.target.value, checkOutDate: prev.checkOutDate }))}
                            className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="checkout" className="text-xs font-medium mb-1 text-gray-800">
                        Saída
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="checkout"
                            id="checkout"
                            min={dates.checkInDate || undefined}
                            value={dates.checkOutDate || ""}
                            onChange={(e) => setDates(prev => ({ checkInDate: prev.checkInDate, checkOutDate: e.target.value }))}
                            className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>
            {disponibility !== null && (
                <div className={`mt-3 w-full rounded-lg py-[1.5rem] px-[1rem] flex flex-col gap-1 items-center border-1 
                    ${disponibility ? 'bg-emerald-50 border-emerald-400 text-emerald-500' : 'bg-red-50 border-red-400 text-red-500'}`}
                >
                    {disponibility ? <IoIosCheckmarkCircleOutline className="w-6 h-6" /> : <IoIosCloseCircleOutline className="w-6 h-6" /> }
                    <p className="font-light text-md text-center">
                        {disponibility ? 'Quarto disponível na data definida' : 'Quarto indisponível na data definida'}
                    </p>
                </div>
            )}
        </div>
    )
}