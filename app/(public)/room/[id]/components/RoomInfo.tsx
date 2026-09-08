import { Room } from "@/types/Room.types"
import { amenityDescriptionMap, formatEnums, getAmenityIcon } from "@/utils/formatTextsRooms";
import { IoMdTimer } from "react-icons/io";
import { LuCalendarCheck } from "react-icons/lu";
import { FaSmokingBan } from "react-icons/fa";

interface RoomInfoProps {
    room: Room;
}

export default function RoomInfo({ room }: RoomInfoProps) {
    return (
        <div className="w-[70%] flex flex-col gap-[1.5rem]">
            <div className="bg-gray-50 rounded-lg shadow-md p-[2rem] flex flex-col gap-4">
                <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Sobre esta comodidade</h3>
                <p className="text-lg font-light text-gray-600">{room.description}</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-[2rem] flex flex-col gap-4">
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-3xl font-[600] font-sans text-gray-800 border-s-7 border-[#0033AD] ps-[1rem]">Comodidades inclusas</h3>
                    <p className="font-light text-md inline-flex items-center gap-1"><span className="w-7 h-7 inline-flex justify-center items-center rounded-full bg-blue-100 text-[#0033AD] font-semibold">{room.amenities.length}</span> Comodidades Disponíveis</p>
                </div>
                <div className="my-[1.5rem] flex gap-3 flex-wrap">
                    {room.amenities.map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity)
                        return (
                            <div key={`amenity_${index}`} className="flex w-[45%] gap-2 items-center my-2">
                                {Icon && <Icon className="text-[#0033AD] w-10 h-10 bg-gray-200 p-[.5rem] rounded-lg"/>}
                                <div>
                                    <span>{formatEnums(amenity)}</span>
                                    <p className="font-light text-gray-600 text-sm">{amenityDescriptionMap[amenity]}</p>
                                </div>
                            </div>
                        )
                    })}
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
    )
}