import Sidebar from '@/components/layout/Sidebar';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose'

export const metadata : Metadata = {
    title: 'Admin | Lúmen Hotel'
}

export default async function LayoutAdmin({ children } : { children: React.ReactNode }) {
   const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    if (!token) redirect('/login');

    let isAuthorized : boolean = false;

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_JWT));
        isAuthorized = payload.role === 'ADMIN' || payload.role === 'ATTENDANT'
    } catch (error : any) {
        console.error(error)
        isAuthorized = false;
    }

    if (!isAuthorized) redirect('/login');

    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <main className='m-3 sm:m-4 lg:m-[2rem] p-4 sm:p-6 lg:p-[2rem] bg-white rounded-[10px] shadow-xl min-w-0 lg:flex-1'>
                { children }
            </main>
        </div>
    )
}