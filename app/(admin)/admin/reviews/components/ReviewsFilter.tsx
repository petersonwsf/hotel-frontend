"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { CiFilter } from "react-icons/ci"
import FilterLabel from "../../reservations/components/FilterLabel"
import { formatDateToPtBR } from "@/utils/formatDate"

interface FilterState {
    createdAt: string
    sentiment: string[]
    replied: boolean
}

const sentimentLabels: Record<string, string> = {
    POSITIVE: "Positivo",
    NEGATIVE: "Negativo",
    NEUTRAL: "Neutro",
}

export default function ReviewsFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const createdAtParam = searchParams.get("createdAt") || ""
    const sentimentParams = searchParams.getAll("sentiment")
    const isRepliedActive = searchParams.get("replied") === "true"

    const [createdAtInput, setCreatedAtInput] = useState<string>(createdAtParam)
    const [loadingCreatedAt, setLoadingCreatedAt] = useState<boolean>(false)

    // Sincroniza o estado local quando a URL muda externamente
    useEffect(() => {
        setCreatedAtInput(createdAtParam)
    }, [createdAtParam])

    // Debounce para atualização da URL ao alterar a data
    useEffect(() => {
        if (createdAtInput === createdAtParam) {
            setLoadingCreatedAt(false)
            return
        }

        setLoadingCreatedAt(true)
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (createdAtInput) {
                params.set("createdAt", createdAtInput)
            } else {
                params.delete("createdAt")
            }
            router.push(`${pathname}?${params.toString()}`)
            setLoadingCreatedAt(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [createdAtInput, createdAtParam, pathname, router, searchParams])

    const handleToggleReplied = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (isRepliedActive) {
            params.delete("replied")
        } else {
            params.set("replied", "true")
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleToggleArrayFilter = (field: "sentiment", value: string) => {
        if (!value) return

        // Trata opção de limpar/restaurar seleção
        if (value === "all") {
            onDeleteFilter(field)
            return
        }

        const values = searchParams.getAll(field)
        if (values.includes(value)) return

        const params = new URLSearchParams(searchParams.toString())
        params.append(field, value)
        router.push(`${pathname}?${params.toString()}`)
    }

    const onDeleteFilter = (name: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(name)
        router.push(`${pathname}?${params.toString()}`)
    }

    const onDeleteValueFilter = (name: keyof FilterState, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        const values = searchParams.getAll(name).filter((v) => v !== value)
        params.delete(name)
        values.forEach((v) => params.append(name, v))
        router.push(`${pathname}?${params.toString()}`)
    }

    // Mapeamento dos rótulos de filtros ativos
    const filtersLabels: { label: string; value: string; onDelete: () => void }[] = []

    if (isRepliedActive) {
        filtersLabels.push({
            label: "Apenas Respondidos",
            value: "replied",
            onDelete: () => onDeleteFilter("replied"),
        })
    }

    if (sentimentParams.length > 0) {
        sentimentParams.forEach((s) => {
            filtersLabels.push({
                label: `Sentimento: ${sentimentLabels[s] || s}`,
                value: s,
                onDelete: () => onDeleteValueFilter("sentiment", s),
            })
        })
    }

    if (createdAtParam) {
        filtersLabels.push({
            label: `A partir de: ${formatDateToPtBR(createdAtParam)}`,
            value: createdAtParam,
            onDelete: () => onDeleteFilter("createdAt"),
        })
    }

    return (
        <div className="w-full rounded-lg mt-[1.5rem] shadow-lg p-[1rem]">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-light mb-5 flex gap-1 items-center">
                    <CiFilter className="w-5 h-5" /> Filtros
                </h3>
            </div>

            <div className="flex items-center gap-4 justify-between flex-wrap mt-3">
                <div className="flex flex-col flex-1 min-w-[200px]">
                    <label htmlFor="createdAt" className="text-sm font-medium mb-1 text-gray-700">
                        Avaliações a partir de
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            value={createdAtInput}
                            onChange={(e) => setCreatedAtInput(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loadingCreatedAt && (
                            <div className="absolute right-10 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 min-w-[200px]">
                    <label htmlFor="sentiment" className="text-sm font-medium mb-1 text-gray-700">
                        Sentimento
                    </label>
                    <div className="relative flex items-center w-full">
                        <select
                            name="sentiment"
                            id="sentiment"
                            value=""
                            onChange={(e) => handleToggleArrayFilter("sentiment", e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                        >
                            <option value="" hidden>
                                Selecione um sentimento
                            </option>
                            <option value="all">Todos / Limpar seleção</option>
                            <option value="POSITIVE">Positivo</option>
                            <option value="NEGATIVE">Negativo</option>
                            <option value="NEUTRAL">Neutro</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-end min-w-[160px] self-end">
                    <button
                        type="button"
                        onClick={handleToggleReplied}
                        className={`w-full py-4 px-4 rounded-xl text-base font-medium transition-all duration-200 border flex items-center justify-center gap-2 ${
                            isRepliedActive
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        <span>Respondidos</span>
                        <div
                            className={`w-2 h-2 rounded-full ${
                                isRepliedActive ? "bg-white" : "bg-gray-300"
                            }`}
                        />
                    </button>
                </div>
            </div>

            {filtersLabels.length > 0 && (
                <div className="flex items-end gap-4 flex-wrap mt-4">
                    {filtersLabels.map((filter) => (
                        <FilterLabel key={`filter_${filter.value}`} label={filter.label} onDelete={filter.onDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}