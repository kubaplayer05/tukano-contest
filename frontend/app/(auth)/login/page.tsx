import AuthForm from "@/components/forms/authForm";

export default function LoginPage() {

    return (
        <main className="w-full min-h-screen flex justify-center items-center">
            <AuthForm type="login"/>
        </main>
    )
}
