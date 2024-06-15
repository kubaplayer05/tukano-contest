"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {

    const pathname = usePathname()

    console.log(pathname)

    const activeLinkStyle = "bg-teal-600 font-semibold"

    return (
        <nav className="mx-auto w-fit px-8 py-4 bg-teal-900 flex items-center gap-10 rounded-2xl shadow-md">
            <Link href="/" className={`px-4 py-2 transition rounded-3xl ${pathname === "/" ? activeLinkStyle : ""}`}>Graph Creator</Link>
            <Link href="/list" className={`px-4 py-2 transition rounded-3xl ${pathname === "/list" ? activeLinkStyle : ""}`}>Graph List</Link>
        </nav>
    )
}
