import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUser() {
    try {
        const cookiesStore = await cookies()
        const token = cookiesStore.get('token')?.value

        if (!token) return { user: null, success: false }

        const secret = new TextEncoder().encode(process.env.SECRET_JWT)
        const { payload } = await jwtVerify(token, secret)

        return {
            user: {
                id: payload.id,
                name: payload.name,
                role: payload.role,
                login: payload.sub,
                imageKey: payload.imageKey,
            },
            success: true
        }
    } catch (error: any) {
        return { user: null, success: false }
    }
}

export async function getJwt() {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
    return token ?? null
}