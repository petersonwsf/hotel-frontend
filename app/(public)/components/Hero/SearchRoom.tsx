"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchRoom() {

    const router = useRouter()
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [capacity, setCapacity] = useState<string>('')

    const searchRooms = () => {
        const params = new URLSearchParams()
        params.set('checkInDate', checkIn)
        params.set('checkOutDate', checkOut)
        params.set('capacity', capacity)
        router.push(`/rooms?${params.toString()}`)
    }

    return (
        <div className="flex items-end gap-3 bg-white rounded-lg p-[1rem] w-full">
            <div className="flex flex-col flex-1">
                <label htmlFor="checkin" className="text-sm font-medium mb-1 text-gray-700">
                    Data de Entrada
                </label>
                <div className="relative flex items-center w-full">
                    <input
                        type="date"
                        name="checkin"
                        id="checkin"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <label htmlFor="checkout" className="text-sm font-medium mb-1 text-gray-700">
                    Data de Saída
                </label>
                <div className="relative flex items-center w-full">
                    <input
                        type="date"
                        name="checkout"
                        id="checkout"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                    />
                </div>
            </div>
            <div className="flex items-end gap-4 justify-between flex-wrap mt-3">
                <div className="flex flex-col flex-1">
                    <label htmlFor="capacity" className="text-sm font-medium mb-1 text-gray-700">
                        Capacidade
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="number"
                            name="capacity"
                            id="capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>
            <div>
                <button onClick={searchRooms} className="mt-3 bg-[#002179] py-[.5rem] px-[1rem] text-white font-light rounded-lg cursor-pointer flex items-center gap-2"><CiSearch /> Buscar quartos</button>
            </div>
        </div>
    )
}