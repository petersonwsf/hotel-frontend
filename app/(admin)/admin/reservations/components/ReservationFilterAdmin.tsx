"use client"
import { optionsReservationStatus } from "@/types/Reservation.types";
import { optionsCategory, optionsFloor, RoomCategory } from "@/types/Room.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import FilterLabel from "./FilterLabel";
import { formatEnums, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatDateToPtBR } from "@/utils/formatDate";

interface FilterState {
    guestName: string;
    checkIn: string;
    checkOut: string;
    category: string[];
    floor: string[];
    status: string[];
}

export default function ReservationFilterAdmin() {

    const searchParams = useSearchParams();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    const [guestNameInput, setGuestNameInput] = useState(
        searchParams.get("guestName") || ""
    );
    const [loadingGuestName, setLoadingGuestName] = useState<boolean>(false);

    const [checkInInput, setCheckInInput] = useState(
        searchParams.get("checkIn") || ""
    );
    const [loadingCheckIn, setLoadingCheckIn] = useState<boolean>(false);

    const [checkOutInput, setCheckOutInput] = useState(
        searchParams.get("checkOut") || ""
    );
    const [loadingCheckOut, setLoadingCheckOut] = useState<boolean>(false);

    const guestName = searchParams.get("guestName") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const category = searchParams.getAll("category");
    const floor = searchParams.getAll("floor");
    const status = searchParams.getAll("status");

    useEffect(() => {
        setGuestNameInput(guestName);
    }, [guestName]);

    useEffect(() => {
        setCheckInInput(checkIn);
    }, [checkIn]);

    useEffect(() => {
        setCheckOutInput(checkOut);
    }, [checkOut]);

    useEffect(() => {
        const currentParam = searchParams.get("guestName") || "";
        if (guestNameInput === currentParam) {
            setLoadingGuestName(false);
            return;
        }

        setLoadingGuestName(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (guestNameInput) {
                params.set("guestName", guestNameInput);
            } else {
                params.delete("guestName");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingGuestName(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [guestNameInput, pathname, router, searchParams]);

    useEffect(() => {
        const currentParam = searchParams.get("checkIn") || "";
        if (checkInInput === currentParam) {
            setLoadingCheckIn(false);
            return;
        }

        setLoadingCheckIn(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (checkInInput) {
                params.set("checkIn", checkInInput);
            } else {
                params.delete("checkIn");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingCheckIn(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [checkInInput, pathname, router, searchParams]);

    useEffect(() => {
        const currentParam = searchParams.get("checkOut") || "";
        if (checkOutInput === currentParam) {
            setLoadingCheckOut(false);
            return;
        }

        setLoadingCheckOut(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (checkOutInput) {
                params.set("checkOut", checkOutInput);
            } else {
                params.delete("checkOut");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingCheckOut(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [checkOutInput, pathname, router, searchParams]);

    const filtersLabels: { label: string; value: string; onDelete: () => void }[] = [];

    if (status.length > 0) {
        status.forEach(s => {
            filtersLabels.push({ label: formatEnums(s), value: s, onDelete: () => onDeleteValueFilter('status', s) });
        });
    }

    if (floor.length > 0) {
        floor.forEach(f => {
            filtersLabels.push({ label: formatEnums(f), value: f, onDelete: () => onDeleteValueFilter('floor', f) });
        });
    }

    if (category.length > 0) {
        category.forEach(c => {
            filtersLabels.push({ label: getRoomCategoryLabel(c as RoomCategory), value: c, onDelete: () => onDeleteValueFilter('category', c) });
        });
    }

    if (guestName) {
        filtersLabels.push({ label: `Cliente: ${guestName}`, value: guestName, onDelete: () => onDeleteFilter('guestName') });
    }

    if (checkIn) {
        filtersLabels.push({ label: `Entrada: ${formatDateToPtBR(checkIn)}`, value: checkIn, onDelete: () => onDeleteFilter('checkIn') });
    }

    if (checkOut) {
        filtersLabels.push({ label: `Saída: ${formatDateToPtBR(checkOut)}`, value: checkOut, onDelete: () => onDeleteFilter('checkOut') });
    }

    const handleToggleArrayFilter = (field: "category" | "floor" | "status", value: string) => {
        if (!value) return;
        const values = searchParams.getAll(field);
        if (values.includes(value)) return;
        const params = new URLSearchParams(searchParams.toString());
        params.append(field, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    const onDeleteFilter = (name: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name);
        router.push(`${pathname}?${params.toString()}`);
    };

    const onDeleteValueFilter = (name: keyof FilterState, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const values = searchParams.getAll(name).filter(v => v !== value);
        params.delete(name);
        values.forEach(v => params.append(name, v));
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
        <button type="button" onClick={() => setDrawerOpen(true)} className="lg:hidden w-full mt-[1.5rem] inline-flex items-center justify-center gap-2 bg-[#002179] text-white py-[.6rem] px-[1rem] rounded-lg cursor-pointer">
            <CiFilter className="w-5 h-5" /> Filtros
        </button>
        <div onClick={() => setDrawerOpen(false)} className={`lg:hidden fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
        <div className={`bg-white fixed top-0 left-0 z-50 h-full w-[88%] max-w-[420px] overflow-y-auto transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:z-auto lg:h-auto lg:w-full lg:max-w-none lg:overflow-visible lg:translate-x-0 lg:rounded-lg lg:mt-[1.5rem] lg:shadow-lg p-3 sm:p-[1rem]`}>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-light mb-5 flex gap-1 items-center">
                    <CiFilter className="w-5 h-5"/> Filtros
                </h3>
                <button type="button" aria-label="Fechar filtros" onClick={() => setDrawerOpen(false)} className="lg:hidden mb-5 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"><IoCloseOutline className="w-6 h-6" /></button>
            </div>

            <div className="flex items-end gap-4 justify-between flex-wrap mt-3">
                <div className="flex flex-col flex-1 min-w-[140px]">
                    <label htmlFor="guestName" className="text-sm font-medium mb-1 text-gray-700">
                        Nome do hóspede
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="text"
                            name="guestName"
                            id="guestName"
                            value={guestNameInput}
                            onChange={(e) => setGuestNameInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingGuestName && (
                            <div className="absolute right-4 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-end gap-4 justify-between flex-wrap mt-3">
                <div className="flex flex-col flex-1 min-w-[140px]">
                    <label htmlFor="checkin" className="text-sm font-medium mb-1 text-gray-700">
                        Data de Entrada
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="checkin"
                            id="checkin"
                            value={checkInInput}
                            onChange={(e) => setCheckInInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCheckIn && (
                            <div className="absolute right-10 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 min-w-[140px]">
                    <label htmlFor="checkout" className="text-sm font-medium mb-1 text-gray-700">
                        Data de Saída
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="checkout"
                            id="checkout"
                            value={checkOutInput}
                            onChange={(e) => setCheckOutInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCheckOut && (
                            <div className="absolute right-10 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 min-w-[140px]">
                    <div className="relative flex items-center w-full">
                        <select
                            name="category"
                            id="category"
                            value=""
                            onChange={(e) => handleToggleArrayFilter("category", e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                        >
                            <option value="" hidden>Categoria</option>
                            {optionsCategory.map(category => (
                                <option key={`option_${category.value}`} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 min-w-[140px]">
                    <div className="relative flex items-center w-full">
                        <select
                            name="floor"
                            id="floor"
                            value=""
                            onChange={(e) => handleToggleArrayFilter("floor", e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                        >
                            <option value="" hidden>Andar</option>
                            {optionsFloor.map(floor => (
                                <option key={`option_${floor.value}`} value={floor.value}>
                                    {floor.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 min-w-[140px]">
                    <div className="relative flex items-center w-full">
                        <select
                            name="status"
                            id="status"
                            value=""
                            onChange={(e) => handleToggleArrayFilter("status", e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                        >
                            <option value="" hidden>Status</option>
                            {optionsReservationStatus.map(status => (
                                <option key={`option_${status.value}`} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex items-end gap-4 flex-wrap mt-4">
                {filtersLabels.map(filter => (
                    <FilterLabel key={`filter_${filter.value}`} label={filter.label} onDelete={filter.onDelete}/>
                ))}
            </div>
        </div>
        {filtersLabels.length > 0 && (
            <div className="lg:hidden flex items-end gap-2 flex-wrap mt-3">
                {filtersLabels.map(filter => (
                    <FilterLabel key={`filter_mobile_${filter.value}`} label={filter.label} onDelete={filter.onDelete}/>
                ))}
            </div>
        )}
        </>
    );
}