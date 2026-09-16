"use client"

import { ClientList } from "@/types/Client.types"
import { useEffect, useRef, useState } from "react"
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import useClient from "@/hooks/useClient";
import { BsPersonVcard } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { formatCPF, formatPhone } from "@/utils/formatClientInfos";
import { IoMdClose } from "react-icons/io";

interface ClientAreaProps {
    clientSelected: ClientList | null;
    setClientSelected: (value: ClientList | null) => void;
}

export default function ClientArea({ clientSelected, setClientSelected } : ClientAreaProps) {

    const [clients, setClients] = useState<ClientList[]>([])
    const [search, setSearch] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const { getClients } = useClient()

    useEffect(() => {
        const fetch = async () => {
            if (!search.trim()) {
                setClients([])
                return
            }
            const clientsResponse = await getClients({ name: search, page: '0', size: '15'})
            setClients(clientsResponse)
        }
        const delayDebounceFn = setTimeout(() => {
            if (isFocused) {
                fetch()
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search, isFocused])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelectClient = (client: ClientList) => {
        setClientSelected(client)
        setSearch(client.name)
        setIsFocused(false)
    }

    return (
        <div className="mb-[1.5rem] w-full rounded-xl border border-gray-300">
            <div className="bg-[#0033AD] w-full py-[.5rem] px-[1rem] rounded-t-xl">
                <h4 className="text-white font-semibold flex items-center gap-1 text-md">
                    <IoPersonOutline /> 1. Hóspede titular da reserva
                </h4>
            </div>
            <div className="p-[1.5rem]">
                <div className="relative w-full" ref={containerRef}>
                    <div className="relative w-full">
                        <div className="relative flex items-center w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                                <CiSearch className="w-5 h-5" />
                            </div>
                            <input
                                id="client-search"
                                type="text"
                                value={search}
                                onFocus={() => setIsFocused(true)}
                                placeholder="Busque o cliente..."
                                autoComplete="off"
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border rounded-xl py-2 text-base outline-none transition-all pl-12 pr-4 border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                        {isFocused && clients.length > 0 && (
                            <ul className="absolute z-[100000] left-0 right-0 top-full mt-1 bg-gray-100 rounded-lg border border-gray-200 max-h-60 overflow-y-auto shadow-lg">
                                {clients.map((client, index) => (
                                    <li
                                        key={client.id || index}
                                        onMouseDown={() => handleSelectClient(client)}
                                        className="px-4 py-3 hover:bg-gray-200 cursor-pointer text-gray-700 flex items-center gap-3 text-sm transition-colors"
                                    >
                                        <span>{client.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {clientSelected && (
                        <div className="my-2 w-full p-[1.5rem] rounded-lg border border-gray-200 bg-gray-100">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={clientSelected.user?.imageKey ? `${process.env.NEXT_PUBLIC_URL_MINIO}/${clientSelected.user.imageKey}` : '/images/icon_person.webp'} 
                                    alt="Imagem de perfil" 
                                    className="rounded-full object-cover w-[40px] h-[40px]"
                                />
                                <div>
                                    <span className="font-medium font-sans text-gray-800">{clientSelected.name}</span>
                                    <div className="flex gap-3 text-gray-500 font-medium text-sm">
                                        <span className="flex items-center gap-1"><BsPersonVcard /> {formatCPF(clientSelected.pin)}</span>
                                        <span className="flex items-center gap-1"><MdOutlineEmail /> {clientSelected.email}</span>
                                        <span className="flex items-center gap-1"><LuPhone /> {formatPhone(clientSelected.user.phoneNumber)}</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center justify-end">
                                    <button onClick={() => setClientSelected(null)} className="rounded-lg cursor-pointer border-1 border-red-500 p-[.5rem] text-red-500 hover:bg-red-500 hover:text-white duration-[.3s]"><IoMdClose /> </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}