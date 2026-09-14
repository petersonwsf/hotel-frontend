"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import { Reservation } from "@/types/Reservation.types"
import { handleToast } from "@/utils/handleToast";
import PaymentHeader from "./PaymentHeader";
import { useEffect, useState } from "react";
import { TypePayment } from "@/types/Payment.types";
import PaymentBoleto from "./PaymentBoleto";
import PaymentPix from "./PaymentPix";
import PaymentCard from "./PaymentCard";
import InfosReservation from "./InfosReservation";
import { usePaymentSSE } from "@/hooks/usePaymentSSE";
import ModalPaymentConfirm from "./ModalPaymentConfirm";

interface PaymentContainerProps {
    reservation: Reservation;
    token: string;
}

export default function PaymentContainer({ reservation, token } : PaymentContainerProps) {

    const { user } = useAuthContext()

    const [typePayment, setTypePayment] = useState<TypePayment>("card")

    const {
        paymentData,
        error,
        startListening
    } = usePaymentSSE({ reservationId: reservation.id, token})

    useEffect(() => {
        if (error) {
            handleToast(error, 'error')
        }
    }, [error])
    
    return (
        <div className="flex gap-3 items-start w-full">
            <div className="w-[70%]">
                <PaymentHeader typePayment={typePayment} setTypePayment={setTypePayment} />
                <div className="w-full bg-gray-100 px-[2rem] py-[1rem]">
                    {typePayment === 'boleto' && <PaymentBoleto reservation={reservation} user={user!} startListening={startListening}/>}
                    {typePayment === 'pix' && <PaymentPix />}
                    {typePayment === 'card' && <PaymentCard reservation={reservation} user={user!} startListening={startListening} />}
                </div>
            </div>
            <div className="w-[30%]">
                <InfosReservation reservation={reservation} />
            </div>
            {paymentData && <ModalPaymentConfirm />}
        </div>
    )
}