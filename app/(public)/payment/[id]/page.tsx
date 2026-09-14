import { getReservation } from "@/lib/api/reservation"
import { notFound, redirect } from "next/navigation"
import PaymentContainer from "./components/PaymentContainer"
import { cookies } from "next/headers";

export default async function Page({ params } : { params: Promise<{ id : string }>}) {

    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    if (!token) redirect('/login');

    const { id } = await params

    const reservation = await getReservation(Number(id))

    if (!reservation) notFound()

    return (
        <div className="w-7xl m-auto py-5 my-3">
            <PaymentContainer reservation={reservation} token={token} />
        </div>
    )
}