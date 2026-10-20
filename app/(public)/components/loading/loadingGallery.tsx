export default function LoadingGallery() {
    return (
        <section id="reviews" className="my-[4rem]" aria-label="Avaliações do hotel">
            <h3 className="text-3xl font-semibold font-sans">Fotos</h3>
            <div className="my-5 pointer-events-none flex gap-4 justify-between overflow-hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full sm:w-[300px] h-[300px] shrink-0 bg-gray-200 animate-pulse"></div>
                ))}
            </div>
        </section>
    )
}