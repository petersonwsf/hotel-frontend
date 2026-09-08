"use client";

import { FormSection } from "./FormRegister";
import { UserRegister } from "@/types/User.types";
import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";
import { getAddress } from "@/services/address";
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import InputText from "@/components/form/InputText";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ContactInformationFormProps {
    setSection: (value: FormSection) => void;
    isPending: boolean;
}

export default function ContactInformationForm({ setSection, isPending } : ContactInformationFormProps) {

    const { values, setFieldValue, errors } = useFormikContext<UserRegister>()

    async function fetchAddress(postalCode: string) {
        try {
            const response = await getAddress(postalCode)
            setFieldValue('contactInformation.city', response.data.localidade ? response.data.localidade : values.contactInformation.city)
            setFieldValue('contactInformation.street', response.data.logradouro ? response.data.logradouro : values.contactInformation.street)
            setFieldValue('contactInformation.state', response.data.uf ? response.data.uf : values.contactInformation.state)
            setFieldValue('contactInformation.neighborhood', response.data.bairro ? response.data.bairro : values.contactInformation.neighborhood)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (values.contactInformation.postalCode.length === 8) {
            fetchAddress(values.contactInformation.postalCode)
        }
    }, [values.contactInformation.postalCode])

    const hasError = useMemo(() => {
        const hasValidationFiels = Object.keys(errors).length > 0
        const isMissingFields =  Object.entries(errors).some(([key, value]) => {
            return value || value !== undefined || value !== ''
        })
        return isMissingFields || hasValidationFiels
    }, [errors])

    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center gap-1 font-light my-3 text-sm cursor-pointer" onClick={() => setSection('PERSONAL')}>
                <IoIosArrowBack className="w-3 h-3"/>
                Voltar
            </div>
            <div className="flex gap-1 items-center mb-[.5rem]">
                <div className="bg-[#0033AD] p-[.5rem] text-white rounded-lg">
                    <IoLocationOutline className="w-6 h-6" />
                </div>
                <div>
                    <span className="text-sm font-medium tracking-[.05rem] text-gray-700">Etapa 2</span>
                    <h2 className="font-[650] text-xl mb-2 text-gray-700">Dados de Contato e Endereço</h2>
                </div>
            </div>
            <div className="flex flex-col my-1">
                <InputText name="contactInformation.phoneNumber" label="Número de telefone" placeholder="Informe seu número de telefone" icon={LuPhone} />
            </div>
            <div className="flex gap-[10px] my-1">
                <InputText name="contactInformation.postalCode" label="CEP" placeholder="Informe seu CEP" />
                <InputText name="contactInformation.neighborhood" label="Bairro" placeholder="Informe seu bairro" />
            </div>
            <div className="flex gap-[10px] my-1">
                <div className="w-[80%]">
                    <InputText name="contactInformation.street" label="Endereço" placeholder="Informe seu endereço" />
                </div>
                <div className="w-[20%]">
                   <InputText name="contactInformation.number" label="Número" />
                </div>
            </div>
            <InputText name="contactInformation.complement" label="Complemento" placeholder="Ex: Casa, Apto..." />
            <div className="flex gap-[10px] my-1">
                <InputText name="contactInformation.city" label="Cidade" placeholder="Informe sua cidade" />
                <InputText name="contactInformation.state" label="Estado" placeholder="Informe seu estado" />
            </div>
            <div className="flex justify-center mb-[2rem] mt-[1rem]">
                <button
                    type="submit" 
                    className={`group w-full gap-2 flex items-center justify-center bg-[#0033AD] duration-[.3s] py-2 rounded-[5px] text-white cursor-pointer hover:bg-[#002179] ${(hasError || isPending) ? 'opacity-[.5] pointer-events-none' : ''}`} 
                    disabled={hasError}
                >
                   {isPending && <AiOutlineLoading3Quarters className="animate-spin" />} Registrar-se
                </button>
            </div>
        </div>
    )
}