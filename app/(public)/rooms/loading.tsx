export default function LoadingRoomsList() {
    return (
        <div id="rooms" aria-label="Quartos disponíveis" className="my-8 md:my-[4rem] w-full max-w-7xl px-4 md:px-6 m-auto">
            <div className="w-full lg:w-[60%] mb-[1rem]">
                <span className="text-[#002179] font-[500] text-sm">COLEÇÃO DE ACOMODAÇÕES</span>
                <h3 className="text-2xl md:text-4xl font-[650] font-sans text-[#002179]">Acomodações & Suítes Exclusivas</h3>
                <p className="font-light text-gray-500">Encontre o refúgio perfeito nos Jardins. Conforto contemporâneo, isolamento acústico impecável e alta hospitalidade personalizada.</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-stretch lg:items-start gap-5">
                <aside aria-label="Filtros" className="bg-gray-300 p-5 hidden lg:block lg:w-[30%] lg:h-[500px] rounded-[10px] sticky top-10 animate-pulse"></aside>
                <div className="w-full min-w-0 flex flex-col gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="bg-gray-300 rounded-xl animate-pulse h-[300px]" key={index}></div>
                    ))}
                </div>
            </div>
        </div>
    )
}