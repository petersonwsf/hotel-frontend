import ReviewsSlide from "./ReviewsSlide";

export default async function Reviews() {
    return (
        <section id="reviews" className="my-[4rem]" aria-label="Avaliações do hotel">
            <div className="w-[50%]">
                <span className="text-[#002179] font-[500] text-sm">EXPERIÊNCIAS REAIS</span>
                <h3 className="text-3xl font-[650] text-gray-800 font-sans">O Que Nossos Hóspedes Dizem</h3>
                <p className="font-light text-gray-500">A satisfação e o conforto de quem já viveu a experiência Lúmen refletidos em cada relato espontâneo.</p>
            </div>
            <div className="my-5 pointer-events-none">
                <ReviewsSlide />
            </div>
        </section>
    )
}