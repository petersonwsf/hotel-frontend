"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { ImExit } from "react-icons/im";
import { useAuthContext } from '@/contexts/AuthContext';
import useAuth from '@/hooks/useAuth';
import { FaCaretDown } from "react-icons/fa";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IoPersonOutline } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { RiAdminLine } from "react-icons/ri";
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {

    const { user } = useAuthContext()
    const { logout } = useAuth()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const redirectToPage = (url: string) => {
        router.push(url)
    }

    const redirectToAdminPage = () => {
        if (user?.role === 'ADMIN') {
            router.push(`/admin/users`)
        } else {
            router.push(`/admin/reservations`)
        }
    }

    return (
        <header className="bg-[#002179] p-4 md:p-5 text-white relative">
            <nav className='flex items-center justify-between'>
                <div>
                    <Image alt='logo Lúmen Hotel' src="/images/logo.png" width={75} height={75} priority className='w-[60px] h-[60px] md:w-[75px] md:h-[75px]'/>
                </div>
                <div>
                    <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 right-0 z-40 bg-[#002179] p-4 pt-0 md:p-0 border-t border-white/20 md:border-0 [&>*]:flex [&>*]:items-center [&>*]:gap-1 md:items-center gap-4 md:gap-5 [&>li:not(:last-child)]:py-1`} onClick={() => setMenuOpen(false)}>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/rooms">Quartos</Link></li>
                        <li>
                            <Link href="/#location"
                                onClick={(e) => {
                                    if (window.location.pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                    }}
                                >
                                Localização
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger className="inline-flex items-center gap-2 cursor-pointer outline-none">
                                         <img src={user.imageKey ? `${process.env.NEXT_PUBLIC_URL_MINIO}/${user.imageKey}` : `/images/icon_person.webp`} alt="Foto de perfil" className='w-8 h-8 object-cover rounded-full'/> <FaCaretDown className="w-5 h-5" />
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                        sideOffset={5}
                                        className="z-50 min-w-[12rem] overflow-hidden rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                                        >
                                        {user?.role === 'CLIENT' ? (
                                            <>
                                                <DropdownMenu.Item onClick={() => redirectToPage('/user')} className="group gap-2 flex w-full cursor-default select-none items-center rounded-sm px-3 py-2 text-sm text-gray-700 outline-none duration-[.3s] hover:bg-gray-100 cursor-pointer">
                                                    <IoPersonOutline /> Meu perfil
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item onClick={() => redirectToPage('/user/reservations')} className="group gap-2 flex w-full cursor-default select-none items-center rounded-sm px-3 py-2 text-sm text-gray-700 outline-none duration-[.3s] hover:bg-gray-100 cursor-pointer">
                                                    <FaDoorOpen /> Minhas reservas
                                                </DropdownMenu.Item>    
                                            </>
                                        ) : (
                                            <>
                                                <DropdownMenu.Item onClick={() => redirectToAdminPage()} className="group gap-2 flex w-full cursor-default select-none items-center rounded-sm px-3 py-2 text-sm text-gray-700 outline-none duration-[.3s] hover:bg-gray-100 cursor-pointer">
                                                    <RiAdminLine /> Área Admin
                                                </DropdownMenu.Item>
                                            </>
                                        )}
                                        
                                        <DropdownMenu.Separator className="my-1 h-px bg-gray-300" />

                                        <DropdownMenu.Item onClick={logout} className="group flex w-full gap-2 cursor-default select-none items-center rounded-sm px-3 py-2 text-sm text-red-600 outline-none duration-[.3s] hover:bg-red-100 cursor-pointer">
                                            <ImExit /> Sair
                                        </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal> 
                                </DropdownMenu.Root>
                            </>
                        )
                            : <Link href="/login" className='cursor-pointer'><FaUser className='w-5 h-5' />Entrar</Link>
                        }
                    </ul>
                </div>
                <button type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    {menuOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
                </button>
            </nav>
        </header>
    )
}