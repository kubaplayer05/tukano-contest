import Navbar from "@/components/navbar";
import ProfileBar from "@/components/profileBar";

export default function Header() {

    return (<header className="w-full p-10 flex flex-col items-center gap-10 max-w-[1500px] mx-auto
    md:flex-row md:gap-2">
        <Navbar/>
        <ProfileBar/>
    </header>)
}
