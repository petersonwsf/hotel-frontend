import ReservationFilterAdmin from "./components/ReservationFilterAdmin";
import { getReservations } from "@/lib/api/reservation";
import ReservationsList from "@/app/(user)/user/reservations/components/ReservationsList";
import ReservationHeader from "./components/ReservationHeader";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminReservationPage({ searchParams }: PageProps) {

    const params = await searchParams;

    const reservation = await getReservations({ 
        page: params.page ?? '0', 
        size: params.size ?? '10', 
        sort: 'createdAt,desc',
        status: params.status ?? [],
        checkInDate: params.checkIn ?? undefined,
        checkOutDate: params.checkOut ?? undefined,
        category: params.category ?? [],
        floor: params.floor ?? [],
        guestName: params.guestName as string ?? undefined,
    })

    return (
        <div>
            <ReservationHeader />
            <ReservationFilterAdmin />
            <ReservationsList reservations={reservation.content ?? []} pagination={{page: reservation.pageable.pageNumber ?? 0, totalPages: reservation.totalPages ?? 0 }} />
        </div>
    )
}