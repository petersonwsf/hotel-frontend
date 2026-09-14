import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ClientFilters from "./components/ClientFilters";

export default function LoadingClientsPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Clientes</h2>
            </div>
            <ClientFilters />
            <div className="w-full min-h-[500px] flex justify-center items-center gap-3">
                <p className="text-2xl font-light">Carregando</p>
                <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={30}/></div>
            </div>
        </div>
    )
}