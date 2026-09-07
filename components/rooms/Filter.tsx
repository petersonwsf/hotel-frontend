"use client"
import { optionsCategory, optionsFloor } from "@/types/Room.types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

interface FilterState {
    category: string[]
    floor: string[]
    minPrice?: number;
    maxPrice?: number;
    capacity?: string | number;
    checkInDate?: string | null;
    checkOutDate?: string | null;
}

export default function Filter() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState<FilterState>({
        category: searchParams.get("category")?.split(",").filter(Boolean) || [],
        floor: searchParams.get("floor")?.split(",").filter(Boolean) || [],
        minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
        maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
        capacity: searchParams.get("capacity")
            ? (searchParams.get("capacity") === "4+" ? 4 : Number(searchParams.get("capacity")))
            : undefined,
        checkInDate: searchParams.get("checkInDate") || undefined,
        checkOutDate: searchParams.get("checkOutDate") || undefined,
    })

    const handleArrayFilters = (name: 'category' | 'floor', value: string, checked: boolean) => {
        setFilters(prev => {
            const currentList = prev[name]
            const updatedList = checked 
                ? [...currentList, value] 
                : currentList.filter(item => item !== value)
            
            return { ...prev, [name]: updatedList }
        })
    }

    const handlePriceFilter = (id: string, min: number | undefined, max: number | undefined, checked: boolean) => {
        if (checked) {
            setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))
        } else {
            setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))
        }
    }

    const handleDateFilter = (name: 'checkInDate' | 'checkOutDate', value: string) => {
        setFilters(prev => ({ ...prev, [name]: value || undefined }))
    }

    const applyFilters = () => {
        const params = new URLSearchParams()

        filters.category.forEach(val => {
            params.append("category", val)
        })
        filters.floor.forEach(val => {
            params.append("floor", val)
        })

        if (filters.minPrice !== undefined) {
            params.set("minPrice", filters.minPrice.toString())
        }
        if (filters.maxPrice !== undefined) {
            params.set("maxPrice", filters.maxPrice.toString())
        }

        if (filters.capacity !== undefined) {
            params.set("capacity", filters.capacity === 4 ? '4' : filters.capacity.toString())
        }

        if (filters.checkInDate) {
            params.set("checkInDate", filters.checkInDate)
        }
        if (filters.checkOutDate) {
            params.set("checkOutDate", filters.checkOutDate)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <aside aria-label="Filtros" className="bg-gray-100 p-5 w-[30%] rounded-[10px] flex flex-col gap-4">
            <h3 className="font-semibold text-lg mb-1 inline-flex gap-2 items-center"><HiOutlineAdjustmentsHorizontal className="text-[#002179]" /> Filtros de busca </h3>
            <div className="w-full">
                <h4 className="text-md font-semibold mb-1 tracking-[.05rem]">Período de estadia</h4>
                <div className="flex gap-2 w-full ">
                    <div>
                        <label htmlFor="checkin" className="text-xs font-light mb-1 text-gray-800">
                            Entrada
                        </label>
                        <div className="relative flex items-center w-full">
                            <input
                                type="date"
                                name="checkin"
                                id="checkin"
                                value={filters.checkInDate || ""}
                                onChange={(e) => handleDateFilter("checkInDate", e.target.value)}
                                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div >
                        <label htmlFor="checkout" className="text-xs font-light mb-1 text-gray-800">
                            Saída
                        </label>
                        <div className="relative flex items-center w-full">
                            <input
                                type="date"
                                name="checkout"
                                id="checkout"
                                value={filters.checkOutDate || ""}
                                min={filters.checkInDate || undefined}
                                onChange={(e) => handleDateFilter("checkOutDate", e.target.value)}
                                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl p-2 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-md font-semibold mb-1 tracking-[.05rem]">Capcidade do quarto</h4>
                <div className="flex w-full bg-gray-100 border border-gray-400 text-gray-500 rounded-lg my-3 overflow-hidden">
                    <button
                        onClick={() => setFilters((prev) => ({ ...prev, capacity: undefined }))}
                        className={`p-[.5rem] flex-1 text-center cursor-pointer transition-colors duration-300 ${
                            !filters.capacity ? "bg-[#002179] text-white font-semibold" : ""
                        }`}
                    >
                        Todos
                    </button>
                    {[1, 2, 3, 4].map((option) => (
                    <button
                        key={option}
                        onClick={() => setFilters((prev) => ({ ...prev, capacity: option }))}
                        className={`p-[.5rem] flex-1 text-center cursor-pointer transition-colors duration-300 ${
                        filters.capacity === option
                            ? "bg-[#002179] text-white font-semibold"
                            : ""
                        }`}
                    >
                        {option === 4 ? '4+' : option}
                    </button>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="text-md font-semibold mb-1 tracking-[.05rem]">Categorias</h4>
                <div className="flex flex-col gap-1.5">
                    {optionsCategory.map((item) => (
                        <div key={item.value} className="flex gap-1 items-center">
                            <input 
                                type="checkbox" 
                                id={item.value} 
                                checked={filters.category.includes(item.value)}
                                onChange={(e) => handleArrayFilters("category", item.value, e.target.checked)}
                            />
                            <label htmlFor={item.value} className="font-light text-sm">{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-3">
                <h4 className="text-md font-semibold mb-1 tracking-[.05rem]">Andar</h4>
                <div className="flex flex-col gap-1.5">
                    {optionsFloor.map((item) => (
                        <div key={item.value} className="flex gap-1 items-center">
                            <input 
                                type="checkbox" 
                                id={item.value} 
                                checked={filters.floor.includes(item.value)}
                                onChange={(e) => handleArrayFilters("floor", item.value, e.target.checked)}
                            />
                            <label htmlFor={item.value} className="text-sm font-light">{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="text-md font-semibold mb-1 tracking-[.05rem]">Custo do quarto</h4>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_menor_700" 
                            checked={filters.minPrice === 0 && filters.maxPrice === 700}
                            onChange={(e) => handlePriceFilter("preco_menor_700", 0, 700, e.target.checked)}
                        />
                        <label htmlFor="preco_menor_700" className="font-light text-sm">R$ 0,00 - R$ 700,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_entre_700_1000" 
                            checked={filters.minPrice === 701 && filters.maxPrice === 1000}
                            onChange={(e) => handlePriceFilter("preco_entre_700_1000", 701, 1000, e.target.checked)}
                        />
                        <label htmlFor="preco_entre_700_1000" className="font-light text-sm">R$ 700,00 - R$ 1.000,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_entre_1000_1500" 
                            checked={filters.minPrice === 1001 && filters.maxPrice === 1500}
                            onChange={(e) => handlePriceFilter("preco_entre_1000_1500", 1001, 1500, e.target.checked)}
                        />
                        <label htmlFor="preco_entre_1000_1500" className="font-light text-sm">R$ 1000,00 - R$ 1.500,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_maior_1500" 
                            checked={filters.minPrice === 1501 && filters.maxPrice === undefined}
                            onChange={(e) => handlePriceFilter("preco_maior_1500", 1501, undefined, e.target.checked)}
                        />
                        <label htmlFor="preco_maior_1500" className="font-light text-sm">R$ 1.500,00 - ...</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button 
                    onClick={applyFilters}
                    className="mt-3 bg-[#002179] py-[.5rem] px-[1rem] text-white font-light rounded-lg cursor-pointer"
                >
                    Aplicar Filtros
                </button>
            </div>
        </aside>
    )
}