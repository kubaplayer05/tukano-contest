"use client"

import {useAtom} from "jotai";
import {authAtom} from "@/atoms/authAtom";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function ProfileBar() {

    const [username, setUsername] = useAtom(authAtom)

    const logoutHandler = () => {
        setUsername(null)
    }

    return (<div>
        {username &&
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <h3 className="px-8 py-4 bg-teal-900 transition rounded shadow-md hover:bg-teal-600 font-semibold">
                        {username}
                    </h3>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-2 border-teal-700">
                    <DropdownMenuItem onClick={logoutHandler}
                                      className="hover:bg-zinc-700 bg-zinc-800 text-white cursor-pointer">Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
        {!username &&
            <Link href="/login" className="px-8 py-4 bg-teal-900 transition rounded shadow-md hover:bg-teal-600">
                Log in
            </Link>}
    </div>)
}
