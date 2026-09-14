import { IoMdAdd } from "react-icons/io";
import ReservationFilterAdmin from "./components/ReservationFilterAdmin";

export default function LoadingReservationPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Reservas</h2>
                <button className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><IoMdAdd className="w-5 h-5"/> Adicionar reserva</button>
            </div>
            <ReservationFilterAdmin />
            <div>
                <div className="flex flex-col gap-[2rem] my-[1.5rem]">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="h-[250px] w-full rounded-lg bg-gray-300 animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    )
}