export const config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000",
    options: {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }
}
