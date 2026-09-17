"use client"
import { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset } : ErrorProps) {

    useEffect(() => {
        console.log(error)
    }, [error])

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
                    <p className="text-gray-800 font-light text-center text-xl">Tivemos um problema interno ao comunicar com o servidor. Se o erro persistir após atualizar a página, entre em contato com a equipe de suporte técnico informando o código do erro.</p>
                    <span className="bg-white text-gray-600 py-[.5rem] px-[1.5rem] font-light border-1 border-gray-300"><span className="font-medium">Código do erro:</span> {error.digest}</span>
                    <div className="flex justify-center gap-4 w-full mt-3">
                        <button onClick={() => reset()} className="text-white bg-[#0033AD] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1.5rem] rounded-lg duration-[.3s] hover:bg-[#002179]"><AiOutlineReload /> Tentar Novamente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}