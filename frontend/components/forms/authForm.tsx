"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {loginHandler} from "@/lib/api/loginHandler";
import Link from "next/link";
import {registerHandler} from "@/lib/api/registerHandler";
import {BeatLoader} from "react-spinners";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useAtom} from "jotai";
import {authAtom} from "@/atoms/authAtom";

interface Inputs {
    username: string,
    password: string,
}

interface AuthFormProps {
    type: "login" | "register"
}

export default function AuthForm({type}: AuthFormProps) {

    const [, setUsername] = useAtom(authAtom)

    const {register, handleSubmit} = useForm<Inputs>()
    const {toast, dismiss} = useToast()
    const router = useRouter()


    const mutation = useMutation({
        mutationFn: type === "login" ? loginHandler : registerHandler,
        onSuccess: (res) => {
            setUsername(res.data.user.username)

            toast({
                title: "Successfully authenticated",
                description: "You will, be redirected to graph creator",
                className: "bg-teal-900 text-white shadow-md",
            })

            setTimeout(() => {
                dismiss()
                router.push("/")
            }, 3000)
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data)
    }

    const disabled = mutation.isPending

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="min-w-[400px] bg-teal-900 px-10 py-14 flex flex-col gap-5 shadow-xl">

            <h2 className="text-center text-2xl mb-4">{type === "login" ? "Welcome Back!" : "Create new Account!"}</h2>

            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" placeholder="Enter your username"
                       className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                       {...register("username", {required: true})}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Password"
                       className="text-white border-4 border-teal-600 bg-teal-800 placeholder:text-gray-300"
                       {...register("password", {required: true})}/>
            </div>
            <Button disabled={disabled} className="bg-teal-600 hover:bg-teal-700 my-4 font-semibold shadow-md">
                {mutation.isPending ? <BeatLoader color="#FFF"/> : "Submit"}
            </Button>
            {type === "login" &&
                <p className="text-center">Do not have a account? <Link href="/register"
                                                                        className="text-blue-500 font-bold">Create
                    one!</Link></p>}
            {type === "register" &&
                <p className="text-center">Already have an account? <Link href="/login"
                                                                          className="text-blue-500 font-bold">Log
                    in!</Link></p>}
        </form>
    )
}
