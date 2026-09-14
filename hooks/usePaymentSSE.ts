"use client"

import { PaymentSSEData } from "@/types/Payment.types";
import { useEffect, useState } from "react";

interface UsePaymentSSEProps {
    reservationId: number;
    token: string;
}

export function usePaymentSSE({ reservationId, token } : UsePaymentSSEProps) {
    const [paymentData, setPaymentData] = useState<PaymentSSEData | null>(null)
    const [shouldConnect, setShouldConnect] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!reservationId || !token || !shouldConnect) return;

        const sseUrl = `${process.env.NEXT_PUBLIC_URL_API_PAYMENT}/webhook/sse/${reservationId}?token=${token}`
        const eventSource = new EventSource(sseUrl);

        eventSource.onopen = () => {
            setIsConnected(true)
            setError(null)
        }

        eventSource.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data)
                setPaymentData(parsed)
                if (parsed.payment?.status === 'CONFIRMED') {
                    eventSource.close();
                    setIsConnected(false);
                    setShouldConnect(false);
                }
            } catch (error) {
                console.error('Erro ao converter JSON', error)
            }
        }

        eventSource.onerror = (error) => {
            console.error('Erro na conexão SSE:', error);
            setIsConnected(false);
            setError('Conexão perdida. Tentando reconectar...');
        }

        return () => {
            eventSource.close();
            setIsConnected(false);
        };

    }, [reservationId, token, shouldConnect])

    const startListening = () => {
        setShouldConnect(true)
    }

    const stopListening = () => {
        setShouldConnect(false)
    }

    return { paymentData, isConnected, error, startListening, stopListening }
}