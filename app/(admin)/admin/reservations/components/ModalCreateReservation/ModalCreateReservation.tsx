"use client"
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import ClientArea from "./ClientArea";
import { ClientList } from "@/types/Client.types";
import { RoomList } from "@/types/Room.types";
import RoomArea from "./RoomArea";
import ReservationDatesArea from "./ReservationDatesArea";

interface ModalCreateReservation {
    open: boolean;
    onClose: () => void;
}

export default function ModalCreateReservation({ open, onClose } : ModalCreateReservation) {

    const [selectedRoom, setSelectedRoom] = useState<RoomList | null>(null)
    const [selectedClient, setSelectedClient] = useState<ClientList | null>(null)
    const [disponibility, setDisponibility] = useState<boolean | null>(null)
    const [dates, setDates] = useState<{checkInDate?: string, checkOutDate?: string}>({ checkInDate: undefined, checkOutDate: undefined})

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            size='4xl'
        >
            <div className="overflow-auto">
                <ClientArea clientSelected={selectedClient} setClientSelected={setSelectedClient} />
                <div className="flex items-start gap-3">
                    <RoomArea setRoomSelected={setSelectedRoom} />
                    <ReservationDatesArea room={selectedRoom} disponibility={disponibility} setDisponibility={setDisponibility} dates={dates} setDates={setDates} />
                </div>
            </div>
        </Modal>
    )
}