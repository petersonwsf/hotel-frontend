"use client"
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import ClientArea from "./ClientArea";
import { ClientList } from "@/types/Client.types";
import { RoomList } from "@/types/Room.types";
import RoomArea from "./RoomArea";
import ReservationDatesArea from "./ReservationDatesArea";
import PaymentArea from "./PaymentArea";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import useReservation from "@/hooks/useReservation";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";

interface ModalCreateReservation {
    open: boolean;
    onClose: () => void;
}

export default function ModalCreateReservation({ open, onClose } : ModalCreateReservation) {

    const router = useRouter()

    const [selectedRoom, setSelectedRoom] = useState<RoomList | null>(null)
    const [selectedClient, setSelectedClient] = useState<ClientList | null>(null)
    const [disponibility, setDisponibility] = useState<boolean | null>(null)
    const [dates, setDates] = useState<{checkInDate?: string, checkOutDate?: string}>({ checkInDate: undefined, checkOutDate: undefined})
    const [loading, setLoading] = useState<boolean>(false)

    const { createReservation } = useReservation()

    const handleOnClose = () => {
        setSelectedClient(null)
        setSelectedRoom(null)
        setDisponibility(null)
        setDates({ checkInDate: undefined, checkOutDate: undefined })
        onClose()
    }

    const handleCreateReservation = async () => {
        setLoading(true)
        try {
            await createReservation({
                checkInDate: dates.checkInDate!,
                checkOutDate: dates.checkOutDate!,
                userId: selectedClient!.user.id,
                roomId: selectedRoom!.id,
                discountAmount: 0,
                serviceFee: 50,
                dailyRate: selectedRoom!.customPrice
            })
            handleToast('Reserva criada com sucesso', 'success')
            handleOnClose()
            router.refresh()
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={open}
            onClose={handleOnClose}
            size='4xl'
        >
            <div className="overflow-auto">
                <ClientArea clientSelected={selectedClient} setClientSelected={setSelectedClient} />
                <div className="flex items-start gap-3">
                    <RoomArea setRoomSelected={setSelectedRoom} />
                    <ReservationDatesArea room={selectedRoom} disponibility={disponibility} setDisponibility={setDisponibility} dates={dates} setDates={setDates} />
                </div>
                <PaymentArea room={selectedRoom} dates={dates} />
                <div className="mt-3 flex w-full justify-end">
                    <button onClick={handleCreateReservation} className={`text-white bg-[#002179] font-normal inline-flex gap-2 items-center cursor-pointer py-[.3rem] px-[1rem] rounded-lg duration-[.3s] hover:bg-[#001859] 
                        ${(loading || !disponibility || !selectedRoom || !selectedClient) ? 'opacity-[.5] pointer-events-none' : ''}`}
                    >
                        {loading ? <AiOutlineLoading3Quarters className="animate-spin"/> : <IoKeyOutline /> } {loading ? 'Realizando reserva...' : 'Realizar reserva'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}