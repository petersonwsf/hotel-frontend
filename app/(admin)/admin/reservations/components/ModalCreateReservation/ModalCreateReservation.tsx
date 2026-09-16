"use client"
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import ClientArea from "./ClientArea";
import { ClientList } from "@/types/Client.types";

interface ModalCreateReservation {
    open: boolean;
    onClose: () => void
}

export default function ModalCreateReservation({ open, onClose } : ModalCreateReservation) {

    const [selectedRoom, setSelectedRoom] = useState<any | null>(null)
    const [selectedClient, setSelectedClient] = useState<ClientList | null>(null)

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            size='4xl'
        >
            <ClientArea clientSelected={selectedClient} setClientSelected={setSelectedClient} />
        </Modal>
    )
}