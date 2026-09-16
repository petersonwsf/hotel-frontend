"use client"
import { FaMinus } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoAdd, IoChevronDownOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

import { optionsCategory } from "@/types/Room.types";
import { useState } from "react";

interface RoomsFilterProps {
    capacity: number;
    setCapacity: React.Dispatch<React.SetStateAction<number>>;
    category: string;
    setCategory: (value: string) => void;
    prices: { minPrice?: number; maxPrice?: number };
    setPrices: (value: { minPrice?: number; maxPrice?: number }) => void;
}

export default function RoomsFilter({ capacity, setCapacity, category, setCategory, prices, setPrices } : RoomsFilterProps) {

    const [viewFilters, setViewFilters] = useState<boolean>(false)

    const handlePriceToggle = (min?: number, max?: number) => {
        if (prices.minPrice === min && prices.maxPrice === max) {
            setPrices({ minPrice: undefined, maxPrice: undefined });
        } else {
            setPrices({ minPrice: min, maxPrice: max });
        }
    };

    return (
        <div className="rounded-lg border p-[.5rem] border-gray-300 transition-all duration-300">
            <div 
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => setViewFilters((prev) => !prev)}
            >
                <h4 className="font-semibold text-sm inline-flex gap-2 items-center">
                    <HiOutlineAdjustmentsHorizontal /> Filtros 
                </h4>
                <div className="text-gray-600 transition-transform duration-300">
                    {viewFilters ? <IoIosArrowUp /> : <IoChevronDownOutline />}
                </div>
            </div>
            <div 
                className={`grid transition-all duration-300 ease-in-out ${
                    viewFilters 
                        ? "grid-rows-[1fr] opacity-100 pt-2" 
                        : "grid-rows-[0fr] opacity-0 pt-0"
                }`}
            >
                <div className="overflow-hidden space-y-3">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="font-medium text-sm text-gray-600 mb-1">Capacidade</p>
                            <div className="inline-flex">
                                <div 
                                    onClick={() => setCapacity((prev) => Math.max(1, prev - 1))} 
                                    className={`flex-1 flex justify-center items-center border-e-0 border border-gray-200 px-[.5rem] rounded-s-xl hover:bg-gray-100 duration-300 cursor-pointer ${capacity <= 1 ? 'pointer-events-none' : ''}`}
                                >
                                    <FaMinus className={`${capacity <= 1 ? 'opacity-20' : ''} duration-300`} />
                                </div>
                                <div className="w-[50px] text-center border py-1 text-base outline-none transition-all border-gray-200 border-x-0 text-gray-800 flex items-center justify-center">
                                    {capacity}
                                </div>
                                <div 
                                    onClick={() => setCapacity((prev) => prev + 1)} 
                                    className="flex-1 flex justify-center items-center border-s-0 border border-gray-200 px-[.5rem] rounded-e-xl hover:bg-gray-100 duration-300 cursor-pointer"
                                >
                                    <IoAdd />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="font-medium text-sm text-gray-600 mb-1">Categoria</p>
                            <div className="relative">
                                <select
                                    id="category"
                                    value={category ?? ''}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-1 text-base outline-none transition-all cursor-pointer appearance-none px-3 pr-10"
                                >
                                    <option value="" disabled hidden>Selecione</option>
                                    <option value="all">Limpar seleção</option>
                                    {optionsCategory.map(option => (
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

                    {/* Filtro de Custos */}
                    <div>
                        <p className="font-medium text-sm text-gray-600 mb-1">Custos do quarto</p>
                        <div className="flex flex-wrap gap-5 pb-1">
                            <div className="flex gap-1 items-center">
                                <input 
                                    type="checkbox" 
                                    id="preco_menor_700" 
                                    checked={prices.minPrice === 0 && prices.maxPrice === 700}
                                    onChange={() => handlePriceToggle(0, 700)}
                                />
                                <label htmlFor="preco_menor_700" className="font-light text-sm cursor-pointer">R$ 0,00 - R$ 700,00</label>
                            </div>
                            <div className="flex gap-1 items-center">
                                <input 
                                    type="checkbox" 
                                    id="preco_entre_700_1000" 
                                    checked={prices.minPrice === 700 && prices.maxPrice === 1000}
                                    onChange={() => handlePriceToggle(700, 1000)}
                                />
                                <label htmlFor="preco_entre_700_1000" className="font-light text-sm cursor-pointer">R$ 700,00 - R$ 1.000,00</label>
                            </div>
                            <div className="flex gap-1 items-center">
                                <input 
                                    type="checkbox" 
                                    id="preco_entre_1000_1500" 
                                    checked={prices.minPrice === 1000 && prices.maxPrice === 1500}
                                    onChange={() => handlePriceToggle(1000, 1500)}
                                />
                                <label htmlFor="preco_entre_1000_1500" className="font-light text-sm cursor-pointer">R$ 1000,00 - R$ 1.500,00</label>
                            </div>
                            <div className="flex gap-1 items-center">
                                <input 
                                    type="checkbox" 
                                    id="preco_maior_1500" 
                                    checked={prices.minPrice === 1500 && prices.maxPrice === undefined}
                                    onChange={() => handlePriceToggle(1500, undefined)}
                                />
                                <label htmlFor="preco_maior_1500" className="font-light text-sm cursor-pointer">R$ 1.500,00 - ...</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}