import Image from "next/image"

import { CgGym } from "react-icons/cg";
import { MdOutlinePool } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdSpa } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { LiaConciergeBellSolid } from "react-icons/lia";

export default function Offer() {
    return (
        <section id="offer" className="my-[4rem]" aria-label="Oferecimento Hotel">
            <div className="w-[50%]">
                <span className="text-[#002179] font-[500]">Comodidades de classe mundial</span>
                <h3 className="text-3xl font-[650] text-gray-800 font-sans">Tudo o que Você Precisa para uma Estadia Extraordinária</h3>
                <p className="font-light text-gray-500">Das manhãs revigorantes à atmosfera sofisticada do anoitecer, desfrute de infraestrutura impecável concebida para atender aos mais altos padrões globais.</p>
            </div>
            <div className="flex flex-col my-5">
                <div className="flex justify-around my-2">
                    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/piscina.jpg" className="object-cover" />
                        <div className="bg-gray-200/80 z-100 absolute w-full h-full flex flex-col items-start p-[1rem] gap-3 justify-end">
                            <span className="p-[.5rem] bg-gray-200 rounded-lg"><MdOutlinePool className="text-[#002179] w-7 h-7"/></span>
                            <h3 className="text-xl font-[500] text-gray-800 font-sans">Piscina Infinita Climatizada</h3>
                            <p className="font-normal text-sm">Localizada no rooftop com vista panorâmica para o skyline de São Paulo. Aquecida o ano todo, cercada por cabanas privativas e bar de drinks autorais.</p>
                            <span className="text-[#002179] font-[500] text-sm">Aberta diariamente das 06h às 22h</span>
                        </div>
                    </div>
                    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/restaurante.jpg" className="object-cover" />
                        <div className="bg-gray-200/80 z-100 absolute w-full h-full flex flex-col items-start p-[1rem] gap-3 justify-end">
                            <span className="p-[.5rem] bg-gray-200 rounded-lg"><IoRestaurantOutline className="text-[#002179] w-7 h-7"/></span>
                            <h3 className="text-xl font-[500] text-gray-800 font-sans">Restaurante & Alta Gastronomia</h3>
                            <p className="font-normal text-sm">Café da manhã artesanal com pâtisserie fresca francesa e menu à la carte assinado por chef estrelado que mescla técnicas contemporâneas e ingredientes brasileiros.</p>
                            <span className="text-[#002179] font-[500] text-sm">Sommelier residente & Adega de 400 rótulos</span>
                        </div>
                    </div>
                    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/spa.webp" className="object-cover" />
                        <div className="bg-gray-200/80 z-100 absolute w-full h-full flex flex-col items-start p-[1rem] gap-3 justify-end">
                            <span className="p-[.5rem] bg-gray-200 rounded-lg"><MdSpa className="text-[#002179] w-7 h-7"/></span>
                            <h3 className="text-xl font-[500] text-gray-800 font-sans">Lúmen Spa & Terapias Holísticas</h3>
                            <p className="font-normal text-sm">Santuário de tranquilidade com sauna seca, sauna a vapor, salas duplas de massagem com aromaterapia e rituais exclusivos de relaxamento facial e corporal.</p>
                            <span className="text-[#002179] font-[500] text-sm">Produtos biológicos certificados</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around my-2">
                    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/eventos.jpeg" className="object-cover" />
                        <div className="bg-gray-200/80 z-100 absolute w-full h-full flex flex-col items-start p-[1rem] gap-3 justify-end">
                            <span className="p-[.5rem] bg-gray-200 rounded-lg"><LuDoorOpen className="text-[#002179] w-7 h-7"/></span>
                            <h3 className="text-xl font-[500] text-gray-800 font-sans">Salas de Eventos & Rooftop Lounge</h3>
                            <p className="font-normal text-sm">4 salas modulares com tecnologia de ponta para videoconferências corporativas, além de um rooftop cinematográfico para coquetéis e celebrações privadas.</p>
                            <span className="text-[#002179] font-[500] text-sm">Capacidade até 180 convidados</span>
                        </div>
                    </div>
                    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/concierge.webp" className="object-cover" />
                        <div className="bg-gray-200/80 z-100 absolute w-full h-full flex flex-col items-start p-[1rem] gap-3 justify-end">
                            <span className="p-[.5rem] bg-gray-200 rounded-lg"><LiaConciergeBellSolid className="text-[#002179] w-7 h-7"/></span>
                            <h3 className="text-xl font-[500] text-gray-800 font-sans">Concierge & Serviço de Quarto 24h</h3>
                            <p className="font-normal text-sm">Concierge membro da associação Les Clefs d'Or pronto para reservas em teatros e restaurantes concorridos, traslados executivos e cardápio de quarto ininterrupto.</p>
                            <span className="text-[#002179] font-[500] text-sm">Atendimento em 4 idiomas</span>
                        </div>
                    </div>
                    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/academia.jpg" className="object-cover" />
                        <div className="bg-gray-200/80 z-100 absolute w-full h-full flex flex-col items-start p-[1rem] gap-3 justify-end">
                            <span className="p-[.5rem] bg-gray-200 rounded-lg"><CgGym className="text-[#002179] w-7 h-7"/></span>
                            <h3 className="text-xl font-[500] text-gray-800 font-sans">Academia Moderna 24 Horas</h3>
                            <p className="font-normal text-sm">Equipamentos de última geração Technogym, pesos livres, área de cardio com monitores individuais, personal trainer sob demanda e toalhas refrigeradas.</p>
                            <span className="text-[#002179] font-[500] text-sm">Acesso livre aos hóspedes 24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}