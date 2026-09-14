"use client"

import dynamic from "next/dynamic";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { CiMapPin } from "react-icons/ci";

const LocationMap = dynamic(() => import("./Location/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
      Carregando mapa...
    </div>
  ),
});

export default function Location() {

    const position: [number, number] = [-6.806262, -35.077934];

    return (
        <section id="location" className="my-[5rem]" aria-label="Localização">
            <div className="w-[50%]">
                <span className="text-[#002179] font-[500] text-sm">LOCALIZAÇÃO</span>
                <h3 className="text-3xl font-[650] text-gray-800 font-sans">No Coração Vibrante dos Jardins</h3>
                <p className="font-light text-gray-500">Situado na Alameda Santos, a poucos passos da Avenida Paulista e dos melhores bistrôs, galerias de arte e centros empresariais da América Latina.</p>
            </div>
            <div className="flex h-[400px] gap-3 my-4">
                <LocationMap position={position}/>
                <div className="w-full p-5 flex flex-col justify-center">
                    <p className="text-lg font-light flex items-center gap-2 p-[.5rem]"><IoLocationOutline className="w-10 h-10 text-[#002179] p-[.5rem] bg-blue-200 rounded-lg"/> Av. das Marés, 1.200 Enseada do Sol, Florianópolis – SC CEP: 88066-500</p>
                    <p className="text-lg font-light flex items-center gap-2 p-[.5rem]"><CiMapPin className="w-10 h-10 text-[#002179] p-[.5rem] bg-blue-200 rounded-lg"/> Ao lado do Mirante das Rochas e a apenas 200m do Farol da Enseada.</p>
                    <p className="text-lg font-light flex items-center gap-2 p-[.5rem]"><LuPhone className="w-10 h-10 text-[#002179] p-[.5rem] bg-blue-200 rounded-lg"/>(89) 00000-0000</p>
                    <p className="text-lg font-light flex items-center gap-2 p-[.5rem]"><MdOutlineMail className="w-10 h-10 text-[#002179] p-[.5rem] bg-blue-200 rounded-lg"/>reserva@ficticio.com</p>
                </div>
            </div>
        </section>
    )
}