import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function Review() {
    return (
        <div className="bg-gray-100 rounded-[15px] p-5">
            <div className="flex gap-5 justify-between my-3 items-center">
                <div>
                    <div className="flex gap-2">
                        {Array.from({length: 5}).map((_, index) => (
                            <FaStar key={index} className="text-[#002179]" />
                        ))}
                    </div>
                </div>
                <div className="text-end w-full">
                    <p className="font-light">20/09/2024</p>
                </div>
            </div>
            <div>
                <p className="line-clamp-7 font-light leading-relaxed italic">
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quidem. Libero officia blanditiis nam quisquam delectus assumenda tempora, nostrum distinctio minima cum incidunt labore est magni, dolorem dolores pariatur sapiente.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, sed libero est iure vero a ipsa doloribus, dolores accusamus ad laudantium, eum dolor officia eius voluptatibus earum! Error, cum nam."
                </p>
            </div>
            <div className="mt-3">
                <div className="flex items-center gap-3">
                    <Image src={`/images/person.jpg`} alt="Foto de perfil usuário" width={40} height={40} className="rounded-full object-cover" />
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-normal">Mariana Cruz</span>
                        <span className="text-sm font-light">Rio de Janeiro</span>
                    </div>
                </div>
            </div>
        </div>
    )
}