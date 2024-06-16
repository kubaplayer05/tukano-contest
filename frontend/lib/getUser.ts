export function getUserFromClient() {
    const user = getCookie("user")
    return user ? JSON.parse(user).username : null
}

export function getCookie(name: string) {

    const cookies = document.cookie.split(";")

    for (let i = 0; i < cookies.length; i++) {
        let cookiePair = cookies[i].split("=")

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1])
        }
    }

    return null
}

export function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
