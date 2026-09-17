"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";

interface ErrorProps {
    error: string;
    reset: () => void;
}

export default function Error({ error, reset } : ErrorProps) {

    useEffect(() => {
        console.log(error)
    }, [error])

    const router = useRouter()

    return (
        <div className="w-3xl m-auto flex gap-4 flex-col items-center min-h-[80vh]">
            <div className="relative w-full">
                <h2 className="text-gray-200 text-center text-[300px] font-bold opacity-[0.8]">500</h2>
                <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center gap-3">
                    <div className="flex items-center gap-2  bg-sky-100 rounded-full py-[.2rem] px-[1.5rem] border-1 border-sky-300 text-[#0033AD]">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span className="font-medium">IMPREVISTO NOS SERVIDORES</span>
                    </div>
                    <h3 className="text-[#002BB3] text-4xl text-center font-bold">Ops! Tivemos um contratempo em nossos sistemas</h3>
                    <p className="text-gray-800 font-light text-center text-xl">Nossa equipe de suporte técnico e recepção já foi notificada para restabelecer tudo com a agilidade e o cuidado que você merece. Por favor, tente atualizar a página ou retorne aos nossos ambientes principais.</p>
                    <div className="flex justify-center gap-4 w-full mt-3">
                        <button onClick={() => reset()} className="text-white bg-[#0033AD] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1.5rem] rounded-lg duration-[.3s] hover:bg-[#002179]"><AiOutlineReload /> Tentar Novamente</button>
                        <button onClick={() => router.push(`/`)} className="text-[#0033AD] bg-white border-1 border-[#0033AD] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1.5rem] rounded-lg duration-[.3s] hover:bg-gray-100"><AiOutlineHome /> Voltar ao início</button>
                    </div>
                    <span className="mt-4 text-gray-600 font-light text-sm flex items-center gap-1"><LuPhone className="mr-2" /> Necessita de reserva urgente? <Link href="/" className="font-medium underline">Fale diretamente com o Concierge</Link></span>
                </div>
            </div>
        </div>
    )
}