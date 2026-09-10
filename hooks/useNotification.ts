"use client"

import { api } from "@/lib/api/api"
import { StatusNotification } from "@/types/Notification.types"

export default function useNotification() {

    async function getUserNotifications(id: number) {
        try {
            const response = await api.get(`/hotel/notification/${id}`)
            return response.data
        } catch (error : any) {
            return []
        }
    }

    async function updateStatus(id: number, status: StatusNotification) {
        try {
             await api.patch(`/hotel/notification/${id}`, { status })
        } catch (error : any) {
            throw error;
        }
    }

    return {
        getUserNotifications,
        updateStatus
    }
}