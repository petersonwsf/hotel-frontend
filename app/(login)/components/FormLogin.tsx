"use client";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import useAuth from "@/hooks/useAuth";
import InputText from "@/components/form/InputText";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

const validationSchema = Yup.object({
    login: Yup.string().email('Email inválido').required('Email obrigatório'),
    password: Yup.string().required('Senha é obrigatória').min(8, 'Senha deve conter 8 caracteres no mínimo')
})

export default function LoginForm() {

    const { login, loading } = useAuth()

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={login}
        >
            <Form className="w-[80%]">
                <div className="mb-[.5rem]">
                    <InputText name="login" label="Email" placeholder="Insira seu email" icon={MdOutlineMail} />
                </div>
                <div className="mb-[.5rem]">
                    <InputText name="password" label="Senha" type="password" placeholder="Insira sua senha" icon={CiLock} />
                </div>
                <div className="w-full flex my-4">
                    <button type="submit" className="flex w-full justify-center items-center bg-[#0033AD] duration-[.3s] py-2 rounded-[5px] text-white font-medium cursor-pointer hover:bg-[#002179]" disabled={loading} style={{opacity: loading ? '0.5' : undefined}}>
                        {loading ? <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" /> Acessando</span> 
                            :<span className="flex items-center gap-2">Acessar minha conta <FaLongArrowAltRight /></span>
                        }
                    </button>
                </div>
                <div className="my-3 flex flex-col gap-2">
                    <p className="text-[#0033AD] font-medium">Esqueceu a senha?</p>
                    <p className="text-gray-500 flex items-center gap-1">Não possui conta? <Link href="/register" className="text-[#0033AD] font-medium underline">Cadastre-se agora</Link> </p>
                </div>
            </Form>
        </Formik>
    )
}