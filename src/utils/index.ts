export * from "./api"


const BACKEND_URL_KEY = "BACKEND_URL"

export function setBackendUrl(backendUrl: string) {
    localStorage.setItem(BACKEND_URL_KEY, backendUrl)
}

export function getBackendUrl(): string {
    return localStorage.getItem(BACKEND_URL_KEY) ?? ""
}