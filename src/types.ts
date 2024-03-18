export type HolderInfo = {
    id: number,
    first_name: string,
    last_name: string,
}

export type CredentialInfo = {
    id: number,
    holder_id: number
    schema_id: number
    details: string,
}

export type InstanceInfo = {
    id: number,
    credential_id: number
    data: string
    hash: string,
}

export type ModifyCredentialsArgs = {
    holder_id: number,
    // vector of credential IDs to be removed for this user
    remove: number[],
    // vector of credential details (schemaID, Credential content as JSON string) to be added for this user
    add: [number, string][],
}