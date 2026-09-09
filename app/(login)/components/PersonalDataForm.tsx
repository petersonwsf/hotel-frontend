"use client";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { FormSection } from "./FormRegister";
import { UserRegister } from "@/types/User.types";
import { useMemo } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { TiBusinessCard } from "react-icons/ti";
import InputText from "@/components/form/InputText";
import { FaLongArrowAltRight } from "react-icons/fa";

interface PersonalDataFormProps {
    setSection: (value: FormSection) => void;
}

export default function PersonalDataForm({ setSection } : PersonalDataFormProps) {

    const { errors,  values } = useFormikContext<UserRegister>()

    const hasError = useMemo(() => {
        const emptyValues = Object.entries(values).some(([key, value]) => {
            if (key !== 'conteactInformation') {
                return !value || value === undefined || value === ''
            }
        })
        const isMissingFields =  Object.entries(errors).some(([key, value]) => {
            if (key !== 'contactInformation') {
                return value || value !== undefined || value !== ''
            }
        })
        return isMissingFields || emptyValues
    }, [errors])

    return (
        <div className="w-full flex flex-col">
            <div className="flex gap-1 items-center mb-[.5rem]">
                <div className="bg-[#0033AD] p-[.5rem] text-white rounded-lg">
                    <BsFillPersonVcardFill className="w-6 h-6" />
                </div>
                <div>
                    <span className="text-sm font-medium tracking-[.05rem] text-gray-700">Etapa 1</span>
                    <h2 className="font-[650] text-xl mb-2 text-gray-700">Dados pessoais</h2>
                </div>
            </div>
            <div className="flex flex-col my-1 my-1">
                <InputText name="name" placeholder="Insira seu nome" label="Nome Completo" icon={MdPersonOutline} />
            </div>
            <div className="flex flex-col my-1 my-1">
                <InputText type="emal" name="email" label="Email" placeholder="Insira seu email" icon={MdOutlineMail} />
            </div>
            <div className="flex gap-[10px] my-1">
                <InputText type="password" name="password" label="Senha" placeholder="Insira sua senha" icon={CiLock} />
                <InputText type="password" name="confirmPassword" label="Confirmar senha" placeholder="Confirme sua senha" icon={CiLock} />
            </div>
            <div className="flex gap-[10px] my-1">
                <InputText name="pin" label="CPF" placeholder="Insira seu CPF" icon={TiBusinessCard} />
                <InputText type="date" name="dateOfBirth" label="Data de nascimento" />
            </div>
            <div className="flex justify-center mb-[2rem] mt-[1rem]">
                <button 
                    onClick={() => setSection('CONTACT')} 
                    type="button" 
                    className={`group w-full gap-2 flex items-center justify-center bg-[#0033AD] duration-[.3s] py-2 rounded-[5px] text-white cursor-pointer hover:bg-[#002179] ${hasError ? 'opacity-[.5] pointer-events-none' : ''}`} 
                    disabled={hasError}
                >
                    Seguir <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-1"/>
                </button>
            </div>
        </div>
    )
}