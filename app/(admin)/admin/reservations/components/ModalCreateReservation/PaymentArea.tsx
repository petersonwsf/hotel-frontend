"use client"
import { useMemo, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { FaPix } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegBuilding } from "react-icons/fa";
import { RoomList } from "@/types/Room.types";
import { calcularDiferencaDias } from "@/utils/calculateDays";

type MethodPayment = 'MONEY' | 'PIX' | 'CARD_MACHINE' | 'COMPANY_REVENUE'

interface PaymentAreaProps {
    room: RoomList | null;
    dates: { checkInDate?: string, checkOutDate?: string };
}

export default function PaymentArea({ room, dates } : PaymentAreaProps) {

    const [methodPayment, setMethodPayment] = useState<MethodPayment>('MONEY')

    const diffDays = useMemo(() => {
        if (!dates.checkInDate || !dates.checkOutDate) return 0;
        const diff = calcularDiferencaDias(dates.checkInDate, dates.checkOutDate)
        return diff > 0 ? diff : 0
    }, [dates])

    const totalValueDays = useMemo(() => {
        if (!room) return 0;
        return room.customPrice * diffDays;
    }, [diffDays, room])

    return (
        <div className="border-1 w-full rounded-xl border-gray-300 p-[1.5rem] min-w-0 my-3">
            <h4 className="font-semibold flex items-center gap-1 mb-1 text-md"><MdAttachMoney className="text-[#0033AD]"/> 4. Pagamentos e valores</h4>
            <hr className="text-gray-200" />
            <div className="flex w-full gap-3 mt-3">
                <div className="w-[50%]">
                    <h5 className="font-semibold text-sm">Condição de Pagamento</h5>
                    <div className="grid grid-cols-2 grid-rows-2 w-full gap-2 mt-3">
                        <div>
                            <div onClick={() => setMethodPayment('MONEY')} className={`cursor-pointer p-[.5rem] w-full rounded-lg border inline-flex items-center gap-2 duration-[.3s] text-gray-600 
                                ${methodPayment === 'MONEY' ? 'bg-sky-50 border-blue-400' : 'border-gray-300 bg-gray-100'}`}
                            >
                                <input value="MONEY" checked={methodPayment === 'MONEY'} type="radio" name="payment_method" id="payment_money" />
                                <span className="inline-flex items-center gap-1 font-medium text-sm"><PiMoneyWavy /> Dinheiro</span>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setMethodPayment('PIX')} className={`cursor-pointer p-[.5rem] w-full rounded-lg border inline-flex items-center gap-2 duration-[.3s] text-gray-600 
                                ${methodPayment === 'PIX' ? 'bg-sky-50 border-blue-400' : 'border-gray-300 bg-gray-100'}`}
                            >
                                <input value="PIX" checked={methodPayment === 'PIX'} type="radio" name="payment_method" id="payment_pix" />
                                <span className="inline-flex items-center gap-1 font-medium text-sm"><FaPix className="text-emerald-700" /> PIX</span>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setMethodPayment('CARD_MACHINE')} className={`cursor-pointer p-[.5rem] w-full rounded-lg border inline-flex items-center gap-2 duration-[.3s] text-gray-600 
                                ${methodPayment === 'CARD_MACHINE' ? 'bg-sky-50 border-blue-400' : 'border-gray-300 bg-gray-100'}`}
                            >
                                <input value="CARD_MACHINE" checked={methodPayment === 'CARD_MACHINE'} type="radio" name="payment_method" id="payment_machine" />
                                <span className="inline-flex items-center gap-1 font-medium text-sm"><CiCreditCard1 /> Maquininha</span>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setMethodPayment('COMPANY_REVENUE')} className={`cursor-pointer p-[.5rem] w-full rounded-lg border inline-flex items-center gap-2 duration-[.3s] text-gray-600 
                                ${methodPayment === 'COMPANY_REVENUE' ? 'bg-sky-50 border-blue-400' : 'border-gray-300 bg-gray-100'}`}
                            >
                                <input value="COMPANY_REVENUE" checked={methodPayment === 'COMPANY_REVENUE'} type="radio" name="payment_method" id="payment_company" />
                                <span className="inline-flex items-center gap-1 font-medium text-sm"><FaRegBuilding /> Faturado empresa</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 border-1 border-gray-300 rounded-lg p-[1rem] bg-gray-50">
                    <h5 className="font-semibold text-sm mb-1">Condição de Pagamento</h5>
                    <hr className="text-gray-300"/>
                    <div className="flex flex-col gap-1.5 text-gray-600 mt-3">
                        <p className="font-light text-sm flex justify-between">
                            <span className="font-medium ">{diffDays} diárias x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(room?.customPrice ?? 0)}</span>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl' }).format(totalValueDays)}
                        </p>
                        <p className="font-light text-sm flex justify-between"><span className="font-medium ">Taxa de Serviço: </span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl'}).format(50)}</p>
                        <p className="font-medium text-[#0033AD] text-xl flex justify-between"><span className="font-medium text-md text-gray-600">Valor total: </span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'brl'}).format(totalValueDays + 50)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}