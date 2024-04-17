"use client"
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {registerNewUser} from "@/utils/GlobalAPi";
import logo from "../../../public/logo.webp"
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function CreateAccount(){
    const [username, setUsername]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [confirmPassword, setConfirmPassword]=useState();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast("Password do not match")
            return;
        }
        registerNewUser(username, email, password)
        router.push("/")
    }

    return(
        <div className="flex items-baseline justify-center my-20">
            <form className={"flex flex-col items-center justify-center p-10 bg-slate-100 border-0 border-gray-200 rounded-2xl"}
                onSubmit={handleSubmit}
            >
                <Image src={logo} alt={"Logo"} width={200} height={200} style={{mixBlendMode: "darken"}}/>
                <h1 className={"font-bold text-3xl mt-2.5"}>Create una cuenta </h1>
                <p className={"text-gray-500"}>Introduce tu email contraseña para crear una cuenta </p>
                <div className={"w-full flex flex-col gap-4"}>
                    <div>
                        <label htmlFor="username"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre usuario</label>
                        <input type="text" id="username"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" required
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                            address</label>
                        <input type="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="john.doe@company.com" required
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="•••••••••" required
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma Contraseña</label>
                        <input type="password" id="confirmPassword"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="•••••••••" required
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        disabled={!(username || email || password)}
                    >Crear cuenta</Button>
                    <p>¿Ya tienes cuenta? &nbsp;
                        <Link href={"/sign-in"} className={"text-blue-600"}>Click aquí</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}