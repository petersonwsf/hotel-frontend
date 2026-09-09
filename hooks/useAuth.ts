"use client"
import { loginAction, logoutAction, registerClientUser } from "@/actions/auth"
import { useAuthContext, User } from "@/contexts/AuthContext";
import { UserRegister } from "@/types/User.types";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react"

export default function useAuth() {
    const [isPending, startTransition] = useTransition()
    const { setUser } = useAuthContext()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    async function login(data: {login: string, password: string}) {
        startTransition(async () => {
            const response = await loginAction(null, data)
            handleToast(response.message, response.data ? 'success' : 'error')
            if (response.data) {
                const payload = {
                    name: response.data.name,
                    login: response.data.sub,
                    role: response.data.role,
                    id: response.data.id,
                    imageKey: response.data.imageKey,
                }
                setUser(payload as User)
                if (payload.role === 'ADMIN') {
                    router.push('/admin/users')
                } else if (payload.role === 'ATTENDANT') {
                    router.push('/admin/reservations')
                } else {
                    router.push('/')
                }
            }
        })
    }

    function logout() {
        startTransition(async () => {
            await logoutAction(null)
            window.location.reload()
        })
    }

    async function registerClient(data: UserRegister) {
        startTransition(async () => {
            const response = await registerClientUser(null, data)
            handleToast(response.message, response.data ? 'success' : 'error')
            if (response.data) {
                const payload = {
                    name: response.data.name,
                    login: response.data.sub,
                    role: response.data.role,
                    id: response.data.id,
                    imageKey: response.data.imageKey,
                }
                setUser(payload as User)
                router.push('/')
            }
        })
    }
    
    return {
        login,
        logout,
        registerClient,
        loading: isPending,
    }
}