import Navbar from "@/components/navbar";
import ProfileBar from "@/components/profileBar";

export default function Header() {

    return (<header className="w-full p-10 flex items-center gap-2 max-w-[1500px] mx-auto">
        <Navbar/>
        <ProfileBar/>
    </header>)
}
