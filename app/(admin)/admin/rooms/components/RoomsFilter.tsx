"use client"
import { optionsCategory, optionsFloor, optionsStatus, RoomCategory } from "@/types/Room.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import FilterLabel from "../../reservations/components/FilterLabel";
import { formatEnums, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatDateToPtBR } from "@/utils/formatDate";

interface FilterState {
    code: string;
    checkInDate: string;
    checkOutDate: string;
    floor: string[];
    status: string[];
    category: string[];
    active: string;
    capacity: string;
}

const optionsActive = [
    { value: "true", label: "Ativo" },
    { value: "false", label: "Inativo" },
];

export default function RoomsFilter() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [codeInput, setCodeInput] = useState(
        searchParams.get("code") || ""
    );
    const [loadingCode, setLoadingCode] = useState<boolean>(false);

    const [checkInDateInput, setCheckInDateInput] = useState(
        searchParams.get("checkInDate") || ""
    );
    const [loadingCheckInDate, setLoadingCheckInDate] = useState<boolean>(false);

    const [checkOutDateInput, setCheckOutDateInput] = useState(
        searchParams.get("checkOutDate") || ""
    );
    const [loadingCheckOutDate, setLoadingCheckOutDate] = useState<boolean>(false);

    const [capacityInput, setCapacityInput] = useState(
        searchParams.get("capacity") || ""
    );
    const [loadingCapacity, setLoadingCapacity] = useState<boolean>(false);

    const code = searchParams.get("code") || "";
    const checkInDate = searchParams.get("checkInDate") || "";
    const checkOutDate = searchParams.get("checkOutDate") || "";
    const capacity = searchParams.get("capacity") || "";
    const floor = searchParams.getAll("floor");
    const status = searchParams.getAll("status");
    const category = searchParams.getAll("category");
    const active = searchParams.get("active") || "";

    useEffect(() => {
        setCodeInput(code);
    }, [code]);

    useEffect(() => {
        setCheckInDateInput(checkInDate);
    }, [checkInDate]);

    useEffect(() => {
        setCheckOutDateInput(checkOutDate);
    }, [checkOutDate]);

    useEffect(() => {
        setCapacityInput(capacity);
    }, [capacity]);

    useEffect(() => {
        const currentParam = searchParams.get("code") || "";
        if (codeInput === currentParam) {
            setLoadingCode(false);
            return;
        }

        setLoadingCode(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (codeInput) {
                params.set("code", codeInput);
            } else {
                params.delete("code");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingCode(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [codeInput, pathname, router, searchParams]);

    useEffect(() => {
        const currentParam = searchParams.get("checkInDate") || "";
        if (checkInDateInput === currentParam) {
            setLoadingCheckInDate(false);
            return;
        }

        setLoadingCheckInDate(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (checkInDateInput) {
                params.set("checkInDate", checkInDateInput);
            } else {
                params.delete("checkInDate");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingCheckInDate(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [checkInDateInput, pathname, router, searchParams]);

    useEffect(() => {
        const currentParam = searchParams.get("checkOutDate") || "";
        if (checkOutDateInput === currentParam) {
            setLoadingCheckOutDate(false);
            return;
        }

        setLoadingCheckOutDate(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (checkOutDateInput) {
                params.set("checkOutDate", checkOutDateInput);
            } else {
                params.delete("checkOutDate");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingCheckOutDate(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [checkOutDateInput, pathname, router, searchParams]);

    useEffect(() => {
        const currentParam = searchParams.get("capacity") || "";
        if (capacityInput === currentParam) {
            setLoadingCapacity(false);
            return;
        }

        setLoadingCapacity(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (capacityInput) {
                params.set("capacity", capacityInput);
            } else {
                params.delete("capacity");
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoadingCapacity(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [capacityInput, pathname, router, searchParams]);

    const filtersLabels: { label: string; value: string; onDelete: (name: string, value?: string) => void }[] = [];

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

    if (code) {
        filtersLabels.push({ label: `Código: ${code}`, value: code, onDelete: () => onDeleteFilter('code') });
    }

    if (checkInDate) {
        filtersLabels.push({ label: `Entrada: ${formatDateToPtBR(checkInDate)}`, value: checkInDate, onDelete: () => onDeleteFilter('checkInDate') });
    }

    if (checkOutDate) {
        filtersLabels.push({ label: `Saída: ${formatDateToPtBR(checkOutDate)}`, value: checkOutDate, onDelete: () => onDeleteFilter('checkOutDate') });
    }

    if (capacity) {
        filtersLabels.push({ label: `Capacidade: ${capacity}`, value: capacity, onDelete: () => onDeleteFilter('capacity') });
    }

    if (active) {
        const activeLabel = optionsActive.find(a => a.value === active)?.label || active;
        filtersLabels.push({ label: activeLabel, value: active, onDelete: () => onDeleteFilter('active') });
    }

    const handleToggleArrayFilter = (field: "category" | "floor" | "status", value: string) => {
        if (!value) return;
        const values = searchParams.getAll(field);
        if (values.includes(value)) return;
        const params = new URLSearchParams(searchParams.toString());
        params.append(field, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSetSingleFilter = (field: "active", value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(field, value);
        } else {
            params.delete(field);
        }
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
        <div className="w-full rounded-lg mt-[1.5rem] shadow-lg p-[1rem]">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-light mb-5 flex gap-1 items-center">
                    <CiFilter className="w-5 h-5"/> Filtros
                </h3>
            </div>

            <div className="flex items-end gap-4 justify-between flex-wrap mt-3">
                <div className="flex flex-col flex-1">
                    <label htmlFor="code" className="text-sm font-medium mb-1 text-gray-700">
                        Código
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={codeInput}
                            onChange={(e) => setCodeInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCode && (
                            <div className="absolute right-4 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="capacity" className="text-sm font-medium mb-1 text-gray-700">
                        Capacidade
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="number"
                            min={1}
                            name="capacity"
                            id="capacity"
                            value={capacityInput}
                            onChange={(e) => setCapacityInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCapacity && (
                            <div className="absolute right-4 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-end gap-4 justify-between flex-wrap mt-3">
                <div className="flex flex-col flex-1">
                    <label htmlFor="checkInDate" className="text-sm font-medium mb-1 text-gray-700">
                        Data de Entrada
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="checkInDate"
                            id="checkInDate"
                            value={checkInDateInput}
                            onChange={(e) => setCheckInDateInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCheckInDate && (
                            <div className="absolute right-10 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="checkOutDate" className="text-sm font-medium mb-1 text-gray-700">
                        Data de Saída
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="checkOutDate"
                            id="checkOutDate"
                            value={checkOutDateInput}
                            onChange={(e) => setCheckOutDateInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCheckOutDate && (
                            <div className="absolute right-10 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1">
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

                <div className="flex flex-col flex-1">
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

                <div className="flex flex-col flex-1">
                    <div className="relative flex items-center w-full">
                        <select
                            name="status"
                            id="status"
                            value=""
                            onChange={(e) => handleToggleArrayFilter("status", e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                        >
                            <option value="" hidden>Status</option>
                            {optionsStatus.map(status => (
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

                <div className="flex flex-col flex-1">
                    <div className="relative flex items-center w-full">
                        <select
                            name="active"
                            id="active"
                            value={active}
                            onChange={(e) => handleSetSingleFilter("active", e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                        >
                            <option value="" hidden>Ativo</option>
                            {optionsActive.map(option => (
                                <option key={`option_${option.value}`} value={option.value}>
                                    {option.label}
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

            <div className="flex items-end gap-4 flex-wrap mt-4">
                {filtersLabels.map(filter => (
                    <FilterLabel key={`filter_${filter.value}`} label={filter.label} onDelete={filter.onDelete}/>
                ))}
            </div>
        </div>
    );
}