"use client";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Review() {

    const [viewMore, setViewMore] = useState<boolean>(false)

    return (
        <div className="my-[1.5rem] w-full py-[1rem] bg-gray-50 p-[1.5rem] rounded-lg shadow-lg">
            <div className="flex gap-4 items-center">
                <div className="text-center">
                    <Image src="/images/person.jpg" width={50} height={50} className="rounded-[50%]" alt="Imagem do usuário" />
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-medium">Maria da Cruz</h4>
                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-light">São Paulo, SP</span>
                            <span className="text-sm font-light">Outubro, 2025</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar key={index} className="text-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <p className={`font-light my-3 text-medium`}>
                    <span className={`italic mr-[.5rem] ${viewMore ? '' : 'line-clamp-2'}`}>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum explicabo quis, consequatur incidunt officiis inventore tempora eius accusantium dicta dolorum molestiae tempore praesentium quibusdam reprehenderit suscipit cupiditate qui id dolor."</span>
                    <span onClick={() => setViewMore((prev: boolean) => !prev)} className={`${viewMore ? 'hidden' : ''} font-medium cursor-pointer`}>Ver mais...</span>
                </p>
            </div>
        </div>
    )
}