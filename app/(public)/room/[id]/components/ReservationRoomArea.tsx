"use client";

import { useState } from "react";
import { Room } from "@/types/Room.types";
import useRooms from "@/hooks/useRooms";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { CiCircleCheck } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";

interface ReservationRoomAreaProps {
    room: Room;
}

export default function ReservationRoomArea({ room }: ReservationRoomAreaProps) {

    const [disponibility, setDisponibility] = useState<boolean | null>(null);
    const [dates, setDates] = useState({
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { checkAvailability } = useRooms()

    const router = useRouter()

    async function handleCheckDisponibility() {
        if (!dates.startDate || !dates.endDate) {
            handleToast('Por favor, selecione as datas de check-in e check-out para verificar a disponibilidade', 'error');
            return;
        }
        setLoading(true);
        const isAvailable = await checkAvailability(dates.startDate, dates.endDate, room.id);
        console.log(isAvailable)
        setDisponibility(isAvailable);
        setLoading(false);
    }

    function redirectToReservation() {
        router.push(`/reservation/${room.id}`)
    }

    return (
        <div className="flex-1 bg-gray-50 p-[1.2rem] rounded-lg shadow-lg flex flex-col">
            <span className="text-sm text-gray-600 font-light">Valor por Noite</span>
            <h4 className="text-3xl font-semibold text-[#0033AD]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(room.customPrice)}</h4>
            <div className="bg-gray-200 rounded-lg my-[1rem] p-[.5rem] py-[1.5rem] flex flex-col">
                <h4 className="text-sm tracking-[.05rem] text-[#0033AD] font-medium">VERIFICAÇÃO DE PERÍODO</h4>
                <div className="flex gap-2 w-full my-3">
                    <div>
                        <label htmlFor="checkin" className="text-xs font-light mb-1 text-gray-800">
                            Entrada
                        </label>
                        <div className="relative flex items-center w-full">
                            <input
                                type="date"
                                name="checkin"
                                id="checkin"
                                value={dates.startDate || ""}
                                onChange={(e) => setDates({...dates, startDate: e.target.value})}
                                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div >
                        <label htmlFor="checkout" className="text-xs font-light mb-1 text-gray-800">
                            Saída
                        </label>
                        <div className="relative flex items-center w-full">
                            <input
                                type="date"
                                name="checkout"
                                id="checkout"
                                value={dates.endDate || ""}
                                min={dates.startDate || undefined}
                                onChange={(e) => setDates({...dates, endDate: e.target.value})}
                                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>
                <button onClick={handleCheckDisponibility} className={`bg-[#0033AD] rounded-lg flex items-center justify-center gap-2 text-white py-[.5rem] px-[1.5rem] mt-3 cursor-pointer hover:bg-[#002179] duration-[.3s] ${(loading || room.status === 'MAINTENANCE' || room.status === 'OUT_OF_ORDER') ? 'opacity-[.5] pointer-events-none' : ''}`}>
                    {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <CiCalendar />} Verificar Disponibilidade
                </button>
                {disponibility !== null && (
                    <div className={`mt-4 flex gap-3 p-[1rem] rounded-lg items-center ${disponibility ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                        {disponibility ? <CiCircleCheck className="w-6 h-6" /> : <VscError className="w-6 h-6" /> }
                        <p className="text-sm">{disponibility ? 'Disponível para as datas selecionadas!' : 'Indisponível para as datas selecionadas, verifique outras datas!'}</p>
                    </div>
                )}
            </div>
            <button onClick={redirectToReservation} className={`bg-[#0033AD] rounded-lg flex items-center justify-center gap-2 text-white py-[.5rem] px-[1.5rem] mt-3 cursor-pointer hover:bg-[#002179] duration-[.3s] ${room.status === 'MAINTENANCE' || room.status === 'OUT_OF_ORDER' ? 'opacity-[.5] pointer-events-none' : ''}`}><IoKeyOutline /> Reservar quarto</button>
        </div>
    )
}