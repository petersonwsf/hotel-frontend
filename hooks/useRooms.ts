import { api } from "@/lib/api/api"
import { RoomQueryParams } from "@/types/Room.types"
import { buildQueryParams } from "@/utils/buildQueryParams"
import { handleToast } from "@/utils/handleToast"
import { useRouter } from "next/navigation"
import { useCallback, useRef } from "react"
import axios from "axios"

export default function useRooms() {

    const router = useRouter()
    
    // Referência para guardar o timer do debounce e o AbortController da requisição anterior
    const debounceTimer = useRef<NodeJS.Timeout | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    async function getRoomsList(params: RoomQueryParams) {
        const queryParams = buildQueryParams(params)
        try {
            const response = await api.get(`/hotel/room${queryParams}`)
            return response.data.content
        } catch (error: any) {
            handleToast(error.response?.data?.message || 'Erro ao carregar quartos', 'error')
            return []
        }
    }

    async function createRoom(data: FormData) {
        try {
            const response = await api.post(`/hotel/room`, data)
            router.refresh()
            return response.data
        } catch (error : any) {
            throw error
        }
    }

    async function editRoom(id: number, data: FormData) {
        try {
            const room = await api.patch(`/hotel/room/${id}`, data)
            router.refresh()
            return room.data
        } catch (error : any) {
            throw error
        }
    }

    async function getRoomById(id: number) {
        try {
            const room = await api.get(`hotel/room/${id}`)
            return room.data
        } catch (err : any) {
            handleToast(err.response?.data?.message || 'Erro ao carregar quarto', 'error')
        }
    }

    async function finishCleaning(id: number) {
        try {
            await api.patch(`/hotel/room/finishCleaning/${id}`);
            handleToast('Limpeza do quarto feita com sucesso!', 'success');
            router.refresh()
        } catch (error : any) {
            handleToast(error.response?.data?.message || 'Erro ao finalizar limpeza', 'error')
        }
    }

    const checkAvailability = useCallback(
        (checkIn: string, checkOut: string, roomId: number, reservationId?: number): Promise<boolean | null> => {
                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current)
                }
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort()
                }
                return new Promise((resolve) => {
                    debounceTimer.current = setTimeout(async () => {
                        const controller = new AbortController()
                        abortControllerRef.current = controller

                        try {
                            const response = await api.get(`hotel/room/disponibility/${roomId}`, {
                                params: {
                                    checkIn,
                                    checkOut,
                                    reservationId
                                },
                                signal: controller.signal
                            });
                            resolve(response.data);
                        } catch (err: any) {
                            if (axios.isCancel(err)) {
                                return resolve(null);
                            }
                            let errorMessage = 'Não foi possível verificar a disponibilidade do quarto';
                            if (Array.isArray(err.response?.data)) {
                                errorMessage = err.response.data[0].error;
                            } else if (err.response?.data?.message) {
                                errorMessage = err.response.data.message;
                            }
                            
                            handleToast(errorMessage, 'error');
                            resolve(null);
                        }
                    }, 2000);
                });
            },
            []
        );

    return {
        getRoomsList,
        createRoom,
        editRoom,
        getRoomById,
        checkAvailability,
        finishCleaning
    }
}