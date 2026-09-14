import { CiCalendar } from "react-icons/ci";
import { FaSmokingBan, FaStar } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { RiGroupLine, RiHotelLine } from "react-icons/ri";

export default function LoadingRoomPage() {
    return (
        <div id="room-details" className="w-7xl m-auto py-5 my-3">
            <div className="w-[60%] mb-[1rem]">
                <h3 className="w-[300px] p-[1rem] rounded-lg animate-pulse bg-gray-300"></h3>
                <div className="flex gap-[2rem] my-3">
                    <span className="inline-flex items-center gap-2"><FaStar className="text-yellow-400" /> <span className="w-[200px] p-[1rem] bg-gray-300 animate-pulse rounded-lg"></span></span>
                    <span className="inline-flex items-center gap-1"><RiHotelLine /> <span className="w-[200px] p-[1rem] bg-gray-300 animate-pulse rounded-lg"></span></span>
                    <span className="inline-flex items-center gap-1"><RiGroupLine className="text-[#002179]" /> <span className="w-[200px] p-[1rem] bg-gray-300 animate-pulse rounded-lg"></span></span>
                </div>
            </div>
            <div className="w-full h-[450px] flex gap-3">
                <div className="w-[60%] h-full overflow-hidden">
                    <div className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl bg-gray-300 animate-pulse" />
                </div>
                <div className="w-[40%] h-full flex flex-col justify-between gap-3">
                    <div className="flex h-[calc(50%-0.375rem)] gap-3">
                        <div className={`w-1/2 h-full object-cover hover:scale-[.95] duration-[.3s] bg-gray-300 animate-pulse`} />
                        <div className={`w-1/2 h-full object-cover hover:scale-[.95] duration-[.3s] bg-gray-300 animate-pulse rounded-tr-xl`} />
                    </div>
                    <div className="flex h-[calc(50%-0.375rem)] gap-3">
                        <div className={`w-1/2 h-full object-cover hover:scale-[.95] duration-[.3s] bg-gray-300 animate-pulse`} />
                        <div className={`w-1/2 h-full object-cover hover:scale-[.95] duration-[.3s] bg-gray-300 animate-pulse rounded-br-xl`} />
                    </div>
    
                </div>
            </div>
            <div className="w-full flex my-[1rem] gap-3 items-start">
                <div className="w-[70%] flex flex-col gap-[1.5rem]">
                    <div className="bg-gray-50 rounded-lg shadow-md p-[2rem] flex flex-col gap-4">
                        <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Sobre esta comodidade</h3>
                        <div className="bg-gray-300 p-[1rem] w-full rounded-lg animate-pulse"></div>
                        <div className="bg-gray-300 p-[1rem] w-full rounded-lg animate-pulse"></div>
                        <div className="bg-gray-300 p-[1rem] w-full rounded-lg animate-pulse"></div>
                        <div className="bg-gray-300 p-[1rem] w-full rounded-lg animate-pulse"></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg shadow-md p-[2rem] flex flex-col gap-4">
                        <div className="w-full flex justify-between items-center">
                            <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Comodidades inclusas</h3>
                            <p className="font-light text-md inline-flex items-center gap-1"><span className="w-7 h-7 inline-flex justify-center items-center rounded-full bg-blue-100 text-[#0033AD] font-semibold"></span> Comodidades Disponíveis</p>
                        </div>
                        <div className="my-[1.5rem] flex gap-3 flex-wrap">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={`amenity_${index}`} className="w-[45%] h-[100px] bg-gray-300 animate-pulse rounded-lg my-2"></div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg shadow-md p-[2rem] flex flex-col gap-4">
                        <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Regras e Políticas de Estadia</h3>
                        <div className="flex justify-between items-start mt-4">
                            <div className="bg-gray-200 p-[1rem] w-[30%] h-auto rounded-lg flex flex-col gap-1 text-gray-600">
                                <IoMdTimer className="text-[#0033AD] w-7 h-7" />
                                <h4 className="text-md tracking-[.05rem] font-medium">Horários Oficiais</h4>
                                <p className="text-sm font-light">Check-in a partir das <span className="font-medium">15:00</span></p>
                                <p className="text-sm font-light">Check-out até as <span className="font-medium">12:00</span></p>
                                <p className="text-sm font-light">Early check-in sob consulta.</p>
                            </div>
                            <div className="bg-gray-200 p-[1rem] w-[30%] h-auto rounded-lg flex flex-col gap-1 text-gray-600">
                                <LuCalendarCheck className="text-green-700 w-7 h-7" />
                                <h4 className="text-md tracking-[.05rem] font-medium">Cancelamentos grátis</h4>
                                <p className="text-sm font-light">Cancele sem qualquer custo até <span className="font-medium">24 horas</span> antes do check-in para reembolso integral.</p>
                            </div>
                            <div className="bg-gray-200 p-[1rem] w-[30%] h-auto rounded-lg flex flex-col gap-1 text-gray-600">
                                <FaSmokingBan className="text-red-700 w-7 h-7" />
                                <h4 className="text-md tracking-[.05rem] font-medium">Ambiente não Fumante</h4>
                                <p className="text-sm font-light">100% livre de fumaça em toda a suíte. Permitido apenas em áreas externas designadas.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-gray-50 p-[1.2rem] rounded-lg shadow-lg flex flex-col">
                    <span className="text-sm text-gray-600 font-light">Valor por Noite</span>
                    <div className="w-full p-[1rem] rounded-lg bg-gray-300 animate-pulse"></div>
                    <div className="bg-gray-200 rounded-lg my-[1rem] p-[.5rem] py-[1.5rem] flex flex-col">
                        <h4 className="text-sm tracking-[.05rem] text-[#0033AD] font-medium">VERIFICAÇÃO DE PERÍODO</h4>
                        <div className="flex gap-2 w-full my-3">
                            <div>
                                <label htmlFor="checkin" className="text-xs font-light mb-1 text-gray-800">
                                    Entrada
                                </label>
                                <div className="relative flex items-center w-full">
                                    <input
                                        type="date"
                                        name="checkin"
                                        id="checkin"
                                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="checkout" className="text-xs font-light mb-1 text-gray-800">
                                    Saída
                                </label>
                                <div className="relative flex items-center w-full">
                                    <input
                                        type="date"
                                        name="checkout"
                                        id="checkout"
                                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className={`bg-[#0033AD] rounded-lg flex items-center justify-center gap-2 text-white py-[.5rem] px-[1.5rem] mt-3`}>
                            <CiCalendar /> Verificar Disponibilidade
                        </button>
                    </div>
                    <button className={`bg-[#0033AD] rounded-lg flex items-center justify-center gap-2 text-white py-[.5rem] px-[1.5rem] mt-3`}><IoKeyOutline /> Reservar quarto</button>
                </div>
            </div>
            <div className="w-full my-[1rem]">
                <section className="w-full p-[2rem]">
                    <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Avaliações sobre o quarto</h3>
                    <div className="flex flex-col items-center p-[1.5rem] rounded-lg my-[1rem]">
                        <h4 className="w-[100] h-[100px] bg-gray-300 animate-pulse mb-2"></h4>
                        <div className="inline-flex justify-center items-center gap-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <FaStar key={index} className="w-7 h-7 text-yellow-400"/>
                            ))}
                        </div>
                        <p className="bg-gray-300 w-[200px] p-[1rem] animate-pulse my-1"></p>
                    </div>
                    <hr className="text-gray-300" />
                    <div className="my-[1rem]">
                        <div className="grid grid-cols-2 gap-[2rem] items-start">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="w-full h-[100px] bg-gray-300 animate-pulse rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}