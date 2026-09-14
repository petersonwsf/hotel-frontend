'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function ModalPaymentConfirm() {

  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsCompleted(true);
    });

    const timer = setTimeout(() => {
      router.push('/user');
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" />
      <div className="relative flex flex-col bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden p-6 transform transition-all duration-300 scale-100 opacity-100 animate-zoom-in">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 overflow-hidden">
          <div
            className={`h-full bg-emerald-500 transition-all duration-[5000ms] ease-linear ${
              isCompleted ? 'w-full' : 'w-0'
            }`}
          />
        </div>
        <div className="py-4 text-gray-600 px-[1rem] leading-relaxed overflow-y-auto mt-2">
          <div className="flex flex-col items-center justify-center gap-[1rem]">
            <FaCheckCircle className="w-[50px] h-[50px] text-emerald-500 animate-bounce" />
            <p className="text-center text-xl font-medium text-gray-800">
              Pagamento confirmado com sucesso, você será redirecionado para a sua conta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}