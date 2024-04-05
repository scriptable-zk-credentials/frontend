import { useState, useEffect } from "react"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button } from "@mui/material"
import { getCredentials, getHolders, modifyCredentials } from "../../../utils"
import { CredentialInfo } from "../../../types";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'schema_id', headerName: 'Schema ID', width: 130 },
    { field: 'details', headerName: 'Details', width: 130 },
];


export function CredentialsTab() {
    const [holderIDs, setHolderIDs] = useState<number[]>([])
    const [activeHolderID, setActiveHolderID] = useState<string>("")
    const [holderCredentials, setHolderCredentials] = useState<CredentialInfo[]>([])
    const [toDelete, setToDelete] = useState<string>("")
    const [toAdd, setToAdd] = useState<string>("")

    const fetchHolderIDs = async () => {
        const res = await getHolders()
        setHolderIDs(res.map(x => x.id))
    }
    const fetchHolderCredentials = async (holderID: string) => {
        const res = await getCredentials(parseInt(holderID))
        setHolderCredentials(res)
    }
    const handleSelectChange = (event: SelectChangeEvent) => {
        setActiveHolderID(event.target.value)
        fetchHolderCredentials(event.target.value)
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.id) {
            case "todelete":
                setToDelete(event.target.value)
                break
            case "toadd":
                setToAdd(event.target.value)
                break
        }
    }
    const applyDeleteCredentials = () => {
        modifyCredentials([{
            holder_id: parseInt(activeHolderID),
            remove: toDelete.split(",").filter(x => x != "").map(x => parseInt(x)),
            add: [],
        }]).then(() => {fetchHolderCredentials(activeHolderID)})
    }
    const applyAddCredential = () => {
        const [schema_id, details] = toAdd.split(",")
        modifyCredentials([{
            holder_id: parseInt(activeHolderID),
            remove: [],
            add: [[parseInt(schema_id), details]]
        }]).then(() => {fetchHolderCredentials(activeHolderID)})
    }


    useEffect(() => { fetchHolderIDs() }, [])

    return (
        <>
            <br />
            Choose holder by ID: 
            <Select
                value={activeHolderID}
                label="Holder ID"
                onChange={handleSelectChange}
            >
                { holderIDs.map(x => <MenuItem value={x}>{x}</MenuItem>) }
            </Select>
            <br />
            <br />
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={holderCredentials}
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
            <div><h2><b>Modify credentials</b></h2></div>
            <TextField
                id="todelete"
                variant="outlined"
                label="IDs to delete"
                value={toDelete}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={applyDeleteCredentials}
            >
                Apply
            </Button>
            <br/>
            <br/>
            <TextField
                id="toadd"
                variant="outlined"
                label="To add: schemaID, details"
                value={toAdd}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={applyAddCredential}
            >
                Apply
            </Button>
        </>
    )
}