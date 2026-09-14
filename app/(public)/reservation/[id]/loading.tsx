import { FaArrowRight } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function LoadingReservationPage() {
    return (
        <div id="reservation-page" className="w-7xl m-auto py-5 my-3">
            <div className="flex gap-[2rem] items-start">
                <div className="w-[70%] flex flex-col gap-5">
                    <div>
                        <div className="w-full h-[400px] relative">
                            <div className="w-full h-full bg-gray-300 animate-pulse rounded-t-xl" />
                        </div>
                        <div className="flex flex-col py-[1rem] px-[1.5rem] border-1 border-gray-300 rounded-b-lg">
                            <div className="text-[#002BB3] font-semibold text-2xl"></div>
                            
                            <div className="flex justify-between [&>div]:flex [&>div]:items-center ">
                                <div>
                                    <div className="bg-gray-300 p-[1rem] w-[200px] rounded-lg animate-pulse ml-1"></div>
                                </div>
                                
                                <div className="flex items-center gap-1 mb-4">
                                    <span className="bg-gray-300 p-[1rem] w-[200px] rounded-lg animate-pulse ml-1"></span>
                                </div>
                            </div>
            
                            <div className="border-b-1 pb-5 border-gray-300 flex flex-col gap-2">
                                <p className="bg-gray-300 animate-pulse p-[1rem] w-full rounded-lg"></p>
                                <p className="bg-gray-300 animate-pulse p-[1rem] w-full rounded-lg"></p>
                                <p className="bg-gray-300 animate-pulse p-[1rem] w-full rounded-lg"></p>
                                <p className="bg-gray-300 animate-pulse p-[1rem] w-full rounded-lg"></p>
                            </div>
            
                            <div className="my-[1rem] flex flex-wrap gap-3">
                                {Array.from({ length: 6}).map((_, index) => (
                                    <div key={index} className="w-[100px] p-[1rem] bg-gray-300 animate-pulse rounded-lg" ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col gap-5">    
                    <div className="w-full rounded-xl border-1 border-gray-400 rounded-b-xl">
                        <div className="rounded-t-xl bg-[#002BB3] p-[1.5rem]">
                            <h3 className="text-white font-semibold text-3xl">Resumo Financeiro</h3>
                            <p className="font-normal text-[#96aaff]">Sua reserva está quase pronta</p>
            
                        </div>
                        <div className="flex flex-col px-[2rem] gap-3 py-3">
                            <div className="flex justify-between">
                                <p className="font-light text-lg">Total de dias</p>
                                <p className="w-[100px] p-[1rem] bg-gray-300 rounded-lg animate-pulse"></p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-light text-lg">Valor total das diárias</p>
                               <p className="w-[100px] p-[1rem] bg-gray-300 rounded-lg animate-pulse"></p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-light text-lg">Taxa de serviço</p>
                                <p className="w-[100px] p-[1rem] bg-gray-300 rounded-lg animate-pulse"></p>
                            </div>
                            <hr className="text-gray-400"/>
                            <div className="my-3">
                                <div className="flex justify-between items-center">
                                    <p className="font- text-xl">Valor total</p>
                                    <p className="w-[100px] p-[1rem] bg-gray-300 rounded-lg animate-pulse"></p>
                                </div>
                            </div>
                            <div>
                                <button className={`w-full py-[1rem] bg-[#002BB3] text-white rounded-[10px] text-xl flex items-center justify-center gap-2`}>
                                    Confirmar reserva <FaArrowRight />
                                </button>
                                <p className="font-light text-center text-gray-600 mt-[5px] mb-[.5rem]">Ao confirmar, você concorda com as políticas de cancelamento do Lúmen Hotel</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-[1.5rem] flex justify-center items-center gap-2 rounded-b-xl">
                            <MdLockOutline className="w-5 h-5 text-gray-500"/>
                            <p className="text-gray-600">Pagamento 100% seguro</p>
                        </div>
                    </div>
                    <div className="flex flex-col py-[1rem] px-[1.5rem] border-1 border-gray-300 rounded-lg">
                        <h2 className="text-[#002BB3] font-semibold text-2xl pb-4 border-b-1 border-gray-300">Detalhes da Estadia</h2>
                        <div className="flex justify-between my-4 text-xl text-[#002BB3]">
                            <p className="m-0 tracking-[.04rem] font-semibold">Valor da diária:</p>
                            <p className="w-[100px] p-[1rem] bg-gray-300 rounded-lg animate-pulse"></p>
                        </div>
                        <div>
                            <div className="flex gap-[3rem] w-full">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="checkInDate" className="my-[.2rem] font-light">Data de chegada</label>
                                    <input type="date" className="border border-gray-300 font-light rounded-lg px-3 py-3 text-sm outline-none" id="checkInDate" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="checkOutDate" className="my-[.2rem] font-light">Data de saída</label>
                                    <input type="date" className="border border-gray-300 rounded-lg px-3 py-3 text-sm font-light outline-none" id="checkOutDate" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}