import React from "react";
import '../globals.css';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login | Lúmen Hotel'
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen w-full bg-[url('/images/hotel_background.webp')] bg-cover bg-fixed bg-center bg-no-repeat overflow-hidden">
            <div className="min-h-screen w-full bg-black/30 backdrop-blur-sm relative flex justify-center items-center">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse at top left, #002179 0%, transparent 30%)",
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse at bottom right, #002179 0%, transparent 30%)",
                    }}
                />
                <div className="relative z-10 w-full flex justify-center items-center">
                    {children}
                </div>
            </div>
        </main>
    );
}