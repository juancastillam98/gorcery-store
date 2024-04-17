"use client"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import logo from "@/public/logo.webp";
import {Button} from "@/components/ui/button";
import {signInUser} from "@/utils/GlobalAPi";
import {toast} from "sonner";

export default function CreateAccount(){
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const router = useRouter()

    useEffect(() => {
        const jwt=sessionStorage.getItem("jwt")
        if (jwt) {
            router.push("/")
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInUser(email, password);
            toast("Inicio sesión exitoso")
            router.push("/");
        } catch (error) {
            // Si hay un error en el inicio de sesión, se mantiene en la misma página
            toast("Email o contraseña incorrectos")

        }
    };

    return(
        <div className="flex items-baseline justify-center my-20">
            <form className={"flex flex-col items-center justify-center p-10 bg-slate-100 border-0 border-gray-200 rounded-2xl"}
                  onSubmit={handleSubmit}
            >
                <Image src={logo} alt={"Logo"} width={200} height={200} style={{mixBlendMode: "darken"}}/>
                <h1 className={"font-bold text-3xl mt-2.5"}>Inicia sesión </h1>
                <p className={"text-gray-500"}>Introduce tu email y contraseña para inciar sesión</p>
                <div className={"w-full flex flex-col gap-4 "}>
                    <div className={"mt-2.5"}>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="john.doe@company.com" required
                               onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="•••••••••" required
                               onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        disabled={!(email || password)}
                    >¿Iniciar Sesión
                    </Button>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>¿Aún no tienes cuenta? &nbsp;
                        <Link href={"/create-account"} className={"text-blue-600"}>Click aquí</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}