"use client"

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ModalCreateReservation from "./ModalCreateReservation/ModalCreateReservation";

export default function ReservationHeader() {

    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="flex justify-between">
            <h2 className="text-3xl">Reservas</h2>
            <button onClick={() => setOpenModal(true)} className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><IoMdAdd className="w-5 h-5"/> Adicionar reserva</button>
            <ModalCreateReservation open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}