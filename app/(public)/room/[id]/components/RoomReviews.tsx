"use client";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import Review from "./Review";
import { FaRegComments } from "react-icons/fa6";

export default function RoomReviews() {

    const [page, setPage] = useState<number>(0)

    return (
        <section className="w-full p-[2rem]">
            <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Avaliações sobre o quarto</h3>
            <div className="text-center p-[1.5rem] rounded-lg my-[1rem]">
                <h4 className="text-4xl font-[650] font-sans text-[#002179] mb-2">4.9</h4>
                <div className="inline-flex justify-center items-center gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} className="w-7 h-7 text-yellow-400"/>
                    ))}
                </div>
                <p className="text-center font-light text-gray-600 my-1">Baseado em 128 avaliações</p>
            </div>
            <hr className="text-gray-300" />
            <div className="my-[1rem]">
                <div className="grid grid-cols-2 gap-[2rem]">
                    {Array.from({ length: 4 * (page + 1) }).map((_, index) => (
                        <Review key={index} />
                    ))}
                </div>
            </div>
            <div className="text-center">
                <div className="inline-flex py-[.5rem] px-[1.5rem] gap-2 items-center bg-gray-50 rounded-lg text-gray-800 duration-[.3s] hover:bg-gray-200 cursor-pointer" onClick={() => setPage((prev : number) => prev + 1)}>
                    <FaRegComments className="text-[#002179] w-6 h-6" />
                    Carregar mais comentários ( {128 - (4 * (page + 1))} restantes )
                </div>
            </div>
        </section>
    )
}