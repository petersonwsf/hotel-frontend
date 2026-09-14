export default function LoadingFeaturedRooms() {
    return (
        <section id="featured-rooms" className="my-[4rem]" aria-label="Featured rooms">
            <div className="w-[50%]">
                <span className="text-[#002179] font-[500] text-sm">ACOMODAÇÕES EXCLUSIVAS</span>
                <h3 className="text-3xl font-[650] text-gray-800 font-sans">Quartos e Suítes Desenhados para o Máximo Relaxamento</h3>
                <p className="font-light text-gray-500">Cada espaço combina acústica perfeita, lençóis de algodão egípcio 600 fios, tecnologia intuitiva e vistas privilegiadas da capital.</p>
            </div>
            <div className="mt-3 flex justify-between">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-lg bg-gray-200 w-[300px] h-[250px]"></div>
                ))}
            </div>
        </section>
    )
}