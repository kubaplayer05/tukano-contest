export const config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000",
    options: {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    }
}
