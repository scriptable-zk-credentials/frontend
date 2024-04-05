import { useState, useEffect } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button } from "@mui/material"
import { getCredentialInstances, modifyCredentialInstances } from "../../../utils"
import { InstanceInfo } from "../../../types";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    //{ field: 'credential_id', headerName: 'Credential ID', width: 130 },
    { field: 'data', headerName: 'Data', width: 700 },
    { field: 'hash', headerName: 'Hash', width: 400 },
];


export function InstancesTab() {
    const [credentialID, setCredentialID] = useState<string>("")
    const [instances, setInstances] = useState<InstanceInfo[]>([])
    const [toDelete, setToDelete] = useState<string>("")
    const [toAdd, setToAdd] = useState<string>("")

    const fetchInstances = async (credential_id: string) => {
        const numericID = parseInt(credential_id)
        if (!Number.isInteger(numericID)) return;
        const res = await getCredentialInstances(parseInt(credential_id))
        setInstances(res)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.id) {
            case "credential-id": {
                setCredentialID(event.target.value)
                fetchInstances(event.target.id)
                break
            }
            case "todelete":
                setToDelete(event.target.value)
                break
            case "toadd":
                setToAdd(event.target.value)
                break
        }
    }
    const applyDeleteInstances = () => {
        modifyCredentialInstances(
            parseInt(credentialID),
            toDelete.split(",").filter(x => x != "").map(x => parseInt(x)),
            0
        ).then(() => {fetchInstances(credentialID)})
    }
    const applyAddInstances = () => {
        modifyCredentialInstances(
            parseInt(credentialID),
            [],
            parseInt(toAdd)
        ).then(() => {fetchInstances(credentialID)})
    }

    useEffect(() => { fetchInstances(credentialID) }, [credentialID])


    return (
        <>
            <br />
            <TextField
                id="credential-id"
                variant="outlined"
                label="Credential ID"
                value={credentialID}
                onChange={handleChange}
            />
            <br />
            <br />
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={instances}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            <br/>
            <div><h2><b>Modify instances</b></h2></div>
            <TextField
                id="todelete"
                variant="outlined"
                label="IDs to delete"
                value={toDelete}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={applyDeleteInstances}
            >
                Apply
            </Button>
            <br/>
            <br/>
            <TextField
                id="toadd"
                variant="outlined"
                label="Instances to add"
                value={toAdd}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={applyAddInstances}
            >
                Apply
            </Button>
        </>
    )
}