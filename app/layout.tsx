import React from "react";
import './globals.css'
import Toast from "@/components/ui/Toast";
import { AuthProvider, User } from "@/contexts/AuthContext";
import { getUser } from "@/utils/userServices";
import Notification from "@/components/ui/Notification";

export default async function Layout({ children } : Readonly<{ children: React.ReactNode}>) {

    const user = await getUser()

    return (
        <html lang="pt-br">
            <body>
                <Toast />
                <Notification />
                <AuthProvider user={user?.success ? user.user as User : null}>
                    { children }
                </AuthProvider>
            </body>
        </html>
    )
}