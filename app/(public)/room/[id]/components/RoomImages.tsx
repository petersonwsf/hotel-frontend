"use client";
import { Room, roomStatusLabel, roomStatusColor } from "@/types/Room.types";
import { useMemo, useState } from "react";

interface RoomImagesProps {
    images: string[];
    room: Room;
}

export default function RoomImages({ images, room }: RoomImagesProps) {
    const [mainImage, setMainImage] = useState<string>(images[0]);

    const remainingImages: string[] = useMemo(() => {
        return images.filter((i: string) => i !== mainImage);
    }, [mainImage, images]);

    return (
        <div className="w-full md:h-[450px] flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-[60%] h-[260px] sm:h-[340px] md:h-full overflow-hidden relative">
                <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${mainImage}`} alt="Imagem principal" className="w-full h-full object-cover rounded-t-xl md:rounded-tr-none md:rounded-bl-xl" />
                <div className="bg-gray-100 py-[.2rem] px-3 sm:px-[1.5rem] absolute top-3 left-3 sm:top-8 sm:left-8 rounded-lg font-medium text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                    Status Atual: <span className="font-normal inline-flex items-center gap-2"><div className={`w-3 h-3 ${roomStatusColor[room.status]} rounded-full`}></div>{roomStatusLabel[room.status]}</span>
                </div>
                <div className="bg-black/80 py-[.2rem] px-3 sm:px-[1.5rem] absolute bottom-3 left-3 sm:bottom-8 sm:left-8 rounded-lg text-white flex items-center gap-2 text-sm">
                    #{room.code}
                </div>
            </div>
            <div className="w-full md:w-[40%] md:h-full flex flex-col justify-between gap-3">
                <div className="flex h-[110px] sm:h-[150px] md:h-[calc(50%-0.375rem)] gap-3">
                    {remainingImages.slice(0, 2).map((image, index) => {
                        const listLength = remainingImages.slice(0, 2).length;
                        return (
                            <div 
                                onClick={() => setMainImage(image)} 
                                key={`top-${index}`} 
                                className="w-1/2 h-full overflow-hidden"
                            >
                                <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${image}`} alt="Imagem secundária" className={`w-full h-full object-cover hover:scale-[.95] duration-[.3s] cursor-pointer ${index === listLength - 1 ? 'rounded-tr-xl' : ''}`} />
                            </div>
                        );
                    })}
                </div>
                <div className="flex h-[110px] sm:h-[150px] md:h-[calc(50%-0.375rem)] gap-3">
                    {remainingImages.slice(2, 4).map((image, index) => {
                        const listLength = remainingImages.slice(2, 4).length;
                        return (
                            <div 
                                onClick={() => setMainImage(image)} 
                                key={`bottom-${index}`} 
                                className="w-1/2 h-full overflow-hidden"
                            >
                                <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${image}`} alt="Imagem secundária" className={`w-full h-full object-cover hover:scale-[.95] duration-[.3s] cursor-pointer ${index === listLength - 1 ? 'rounded-br-xl' : ''}`} 
/>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}