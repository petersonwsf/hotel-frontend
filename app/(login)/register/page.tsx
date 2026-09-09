import FormRegister from "@/app/(login)/components/FormRegister";
import { Metadata } from "next";
import { AiOutlineStar } from "react-icons/ai";

export const metadata : Metadata = {
    title: 'Registro | Lúmen Hotel'
}

export default function Register() {
    return (
        <div className="max-w-[700px] bg-white rounded-lg py-[2rem] px-[1rem] flex flex-col items-center justify-center my-[2rem]">
            <div className="text-center p-[.5rem] mb-3">
                <span className="inline-flex items-center gap-2 tracking-[.05rem] font-medium text-[#002179] my-[1rem]"><AiOutlineStar className="w-6 h-6" /> Lúmen Hotel</span>
                <h3 className="text-3xl font-[650] font-sans text-gray-700 mb-2">Criar Conta de Hóspede</h3>
                <p className="font-light text-medium text-gray-500">Preencha os dados abaixo para criar sua conta no Lúmen Hotel & Resorts.</p>
            </div>
            <FormRegister />            
        </div>
    )
}