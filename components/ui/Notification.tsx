"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import Modal from "./Modal"
import { useEffect, useState, MouseEvent } from "react"
import { NotificationData } from "@/types/Notification.types"
import useNotification from "@/hooks/useNotification"
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { handleToast } from "@/utils/handleToast"
import useReview from "@/hooks/useReview"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Notification() {

    const { user } = useAuthContext()
    const [notification, setNotification] = useState<NotificationData | null>(null)
    const [comment, setComment] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    const [hoverRating, setHoverRating] = useState<number>(0)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { getUserNotifications, updateStatus } = useNotification()
    const { createReview } = useReview()
    
    useEffect(() => {
        const fetch = async () => {
            if (user?.id) {
                const response : NotificationData[] = await getUserNotifications(user.id)
                if (response.length > 0) {
                    setNotification(response[0])
                    setOpenModal(true)
                }
            }
        }
        if (user) fetch()
    }, [user])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>, starIndex: number) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - left) / width;
        const value = percent <= 0.5 ? starIndex - 0.5 : starIndex;
        setHoverRating(value);
    };

    const handleClick = (value: number) => {
        setRating(value);
    };

    const renderStar = (starIndex: number) => {
        const currentRating = hoverRating || rating;

        if (currentRating >= starIndex) {
            return <FaStar className="w-7 h-7 text-yellow-400 cursor-pointer" />;
        } else if (currentRating >= starIndex - 0.5) {
            return <FaStarHalfAlt className="w-7 h-7 text-yellow-400 cursor-pointer" />;
        } else {
            return <FaRegStar className="w-7 h-7 text-gray-400 cursor-pointer" />;
        }
    };

    const onCloseModal = async () => {
        setOpenModal(false)
        await updateStatus(notification!.id, 'DISMISSED')
    }

    const sendReview = async () => {
        console.log(notification)
        try {
            setLoading(true)
            await createReview(rating, comment, notification!.reservationInfos.id)
            await updateStatus(notification!.id, 'COMPLETED')
            setOpenModal(false)
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    if (!user) return null

    return (
        <Modal
            isOpen={openModal}
            onClose={onCloseModal}
            size="xl"
        >
            <div className="w-full flex flex-col items-center gap-[1rem]">
                <h3 className="text-2xl font-semibold text-center text-[#0033AD]">Avalie sua estadia</h3>
                <p className="font-light text-sm text-gray-600 text-center">
                    Você realizou uma estadia entre os dias 10/09/2026 e 20/09/2026. Faça uma avaliação para nos ajudar com seu feedback!
                </p>
                <div 
                    className="w-full flex justify-center gap-2"
                    onMouseLeave={() => setHoverRating(0)}
                >
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <div
                            key={starIndex}
                            className="p-1 select-none transition-transform hover:scale-110"
                            onMouseMove={(e) => handleMouseMove(e, starIndex)}
                            onClick={() => handleClick(hoverRating)}
                        >
                            {renderStar(starIndex)}
                        </div>
                    ))}
                </div>

                <div className="w-[80%]">
                    <textarea 
                        name="comment" 
                        id="comment" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Descreva como foi sua estadia no Lúmen Hotel" 
                        className="border-1 border-gray-300 text-gray-800 rounded-lg p-[.5rem] w-full min-h-[150px] overflow-auto outline-none resize-none focus:border-[#0033AD]"
                    />
                </div>

                <div className="w-full flex justify-end items-center gap-3">
                    <button onClick={onCloseModal} className="text-[#002179] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1rem] rounded-lg duration-[.3s] hover:bg-gray-100">
                        Lembrar mais tarde
                    </button>
                    <button onClick={sendReview} className={`text-white bg-[#002179] font-normal inline-flex gap-2 items-center cursor-pointer py-[.5rem] px-[1rem] rounded-lg duration-[.3s] hover:bg-[#001859] ${rating < 0 || loading ? 'opacity-[.5] pointer-events-none' : ''}`}>
                        {loading && <AiOutlineLoading3Quarters className="animate-spin"/>}{loading ? 'Enviando' : 'Enviar'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}