import LoginForm from "@/app/(login)/components/FormLogin";
import { AiOutlineStar } from "react-icons/ai";

export default function Login() {
    return (
        <div className="bg-white max-w-[500px] rounded-lg p-5 flex flex-col items-center justify-center">
            <div className="text-center p-[.5rem] mb-3">
                <span className="inline-flex items-center gap-2 tracking-[.05rem] font-medium text-[#002179] my-[1rem]"><AiOutlineStar className="w-6 h-6" /> Lúmen Hotel</span>
                <h3 className="text-3xl font-[650] font-sans text-gray-700 mb-2">Bem-vindo de volta ao Lúmen</h3>
                <p className="font-light text-medium text-gray-500">Acesse sua conta para gerenciar suas reservas, benefícios exclusivos e estadias personalizadas.</p>
            </div>
            <LoginForm />
        </div>
    )
}