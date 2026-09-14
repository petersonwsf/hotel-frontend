import Image from "next/image";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { FaWifi } from "react-icons/fa";
import SearchRoom from "./SearchRoom";

export default function HeroSection() {
    return (
        <section id="hero-section" aria-label="Sessão inicial">
            <div className="w-full relative">
                <div className="w-full h-[500px]">
                    <Image fill src="/images/hotel_model.webp" className="object-cover" alt="Hero image"/>
                </div>
                <div className="w-full absolute top-0 h-full w-full flex items-center justify-center bg-[#002179]/85">
                    <div className="flex flex-col items-center w-[60%]">
                        <p className="text-white bg-[#002179] text-lg rounded-xl px-[2rem] py-[.2rem] inline-flex items-center gap-3"><HiOutlineBadgeCheck /> HOSPITALIDADE DE ALTO PADRÃO EM FLORIANÓPOLIS</p>
                        <h2 className="text-center text-white font-[650] text-4xl">Viva Momentos Inesquecíveis de Luxo e Conforto no Lúmen Hotel</h2>
                        <p className="text-center text-lg font-light text-blue-300">O refúgio perfeito nos Jardins, unindo arquitetura contemporânea, alta gastronomia internacional e atendimento personalizado desenhado para o seu bem-estar supremo.</p>
                        <div className="flex justify-between w-full my-3">
                            <span className="flex items-center gap-2 font-semibold text-white"><IoShieldCheckmarkOutline className="w-5 h-5" /> Melhor Tarifa garantida</span>
                            <span className="flex items-center gap-2 font-semibold text-white"><CiCalendar className="w-5 h-5" /> Cancelamento Flexível</span>
                            <span className="flex items-center gap-2 font-semibold text-white"><FaWifi className="w-5 h-5" /> Wi-FI 6 Ultra Rápido Grátis</span>
                        </div>
                        <SearchRoom />
                    </div>
                </div>
            </div>
        </section>
    )
}