import { CredentialInfo, HolderInfo, InstanceInfo, ModifyCredentialsArgs } from "../types"
import { getBackendUrl } from "."


export async function sayHello(): Promise<string> {
    return (await fetch(`${getBackendUrl()}/hello`)).text()
}

export async function getHolders(): Promise<HolderInfo[]> {
    return (await fetch(`${getBackendUrl()}/issuer/holders`)).json()
}

export async function modifyHolders(remove: number[], add: Omit<HolderInfo, "id">[]): Promise<boolean> {
    return (await fetch(`${getBackendUrl()}/issuer/holders`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ remove, add })
    })).json()
}

export async function getSchemas(): Promise<string[]> {
    const result: string[] = (await (await fetch(`${getBackendUrl()}/issuer/schemas`)).json())
    return result.filter(x => x.slice(0, 4) != "test")
}

export async function getCredentials(userId: number): Promise<CredentialInfo[]> {
    return (await fetch(`${getBackendUrl()}/issuer/credentials/${userId}`)).json()
}

export async function modifyCredentials(params: ModifyCredentialsArgs[]): Promise<boolean> {
    return (await fetch(`${getBackendUrl()}/issuer/credentials`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })).json()
}

export async function getCredentialInstances(credentialId: number): Promise<InstanceInfo[]> {
    return (await fetch(`${getBackendUrl()}/issuer/instances/${credentialId}`)).json()
}

export async function modifyCredentialInstances(credentialId: number, remove: number[], num_to_add: number): Promise<boolean> {
    return (await fetch(`${getBackendUrl()}/issuer/instances/${credentialId}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ remove, num_to_add })
    })).json()
}

export async function syncInstances(): Promise<boolean> {
    return (await fetch(`${getBackendUrl()}/issuer/instances/sync`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })).json()
}
