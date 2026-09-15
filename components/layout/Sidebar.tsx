"use client";
import { FaCaretDown } from "react-icons/fa";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";
import { HiUserGroup } from "react-icons/hi2";
import { LiaWarehouseSolid } from "react-icons/lia";
import { FaKey } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useAuth from "@/hooks/useAuth";
import { ImExit } from "react-icons/im";

export default function Sidebar() {

    const { user } = useAuthContext()
    const { logout } = useAuth()

    return (
        <aside className="flex flex-col h-screen w-[300px] bg-blue-950 px-[1rem] py-[1rem] sticky top-0">
            <div className="flex items-center gap-3 border-b-1 border-gray-400 pb-4">
                <Image src="/images/logo.png" width={75} height={75} alt="Logo" />
                <h2 className="text-4xl text-white font-light">Admin</h2>
            </div>
            <div className="flex flex-col justify-between h-full">
                <nav className="py-[2rem]">
                    <ul className=" gap-4 text-white">
                        {user?.role === 'ADMIN' && <li className="my-4 border-b-1 border-gray-400 pb-2 cursor-pointer"><Link href="/admin/users" className="flex items-center gap-1"><HiUserGroup className="text-white w-5 h-5"/> Usuários</Link></li>}
                        <li className="my-4 border-b-1 border-gray-400 pb-2 cursor-pointer"><Link href="/admin/clients" className="flex items-center gap-1"><HiUserGroup className="text-white w-5 h-5"/> Clientes</Link></li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2 cursor-pointer"><Link href="/admin/rooms" className="flex items-center gap-1"><LiaWarehouseSolid className="text-white w-5 h-5" />Quartos</Link></li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2 cursor-pointer"><Link href="/admin/reservations" className="flex items-center gap-1"><FaKey className="text-white w-5 h-5" /> Reservas</Link></li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2 cursor-pointer"><Link href={`/admin/account/${user?.id}`} className="flex items-center gap-1"><IoPersonCircleOutline className="text-white w-5 h-5" /> Meus dados</Link></li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2 cursor-pointer"><Link href={`/admin/reviews`} className="flex items-center gap-1"><MdOutlineComment className="text-white w-5 h-5" /> Avaliações</Link></li>
                        <li className="my-4 cursor-pointer"><Link href="/admin/dashboard" className="flex items-center gap-1"><MdAnalytics className="text-white w-5 h-5" /> Dashboard</Link></li>
                    </ul>
                </nav>
                <div className="border-t-1 border-gray-400 pt-3">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="inline-flex items-center gap-2 cursor-pointer outline-none">
                            <img src={user?.imageKey ? `${process.env.NEXT_PUBLIC_URL_MINIO}/${user.imageKey}` : `/image/person.jpg`} alt="Foto de perfil" className='w-8 h-8 object-cover rounded-full'/>
                            <span className="text-white truncate">{user?.name as string}</span>
                             <FaCaretDown className="w-5 h-5 text-white" />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                sideOffset={5}
                                className="z-50 min-w-[12rem] overflow-hidden rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                            >
                                <DropdownMenu.Item onClick={logout} className="group flex w-full gap-2 cursor-default select-none items-center rounded-sm px-3 py-2 text-sm text-red-600 outline-none duration-[.3s] hover:bg-red-100 cursor-pointer">
                                    <ImExit /> Sair
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal> 
                    </DropdownMenu.Root>
                </div>
            </div>
        </aside>
    )
}