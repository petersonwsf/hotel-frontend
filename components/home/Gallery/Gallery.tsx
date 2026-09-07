import Image from "next/image"

export default async function Gallery() {
    return (
        <section id="gallery" className="my-[4rem] w-full" aria-label="Galeria de fotos">
            <div className="w-[50%]">
                <span className="text-[#002179] font-[500] text-sm">NOSSA GALERIA</span>
                <h3 className="text-3xl font-[650] text-gray-800 font-sans">Momentos Exclusivos no Lúmen Hotel</h3>
                <p className="font-light text-gray-500">Conheça os detalhes arquitetônicos e recantos de contemplação que tornam nossa propriedade única.</p>
            </div>
            <div className="my-2 w-full">
                <div className="w-full flex gap-3 mt-3">
                    <div className="w-1/2 h-auto relative">
                        <Image fill src={`/images/hotel_0.jpg`} alt="Foto do hotel" className="object-cover rounded-lg" />
                    </div>
                    <div className="w-1/2 h-auto flex flex-col gap-3">
                        <div className="w-full flex gap-4">
                            <div className="h-[200px] w-1/2 relative">
                                <Image fill src={`/images/hotel_4.webp`} alt="Foto do hotel" className="object-cover rounded-lg" />
                            </div>
                            <div className="h-[200px] w-1/2 relative">
                                <Image fill src={`/images/hotel_3.jpg`} alt="Foto do hotel" className="object-cover rounded-lg" />
                            </div>
                        </div>
                        <div className="w-full flex gap-4">
                            <div className="h-[200px] w-1/2 relative">
                                <Image fill src={`/images/hotel_2.jpg`} alt="Foto do hotel" className="object-cover rounded-lg" />       
                            </div>
                            <div className="h-[200px] w-1/2 relative">
                                <Image fill src={`/images/hotel_1.webp`} alt="Foto do hotel" className="object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}