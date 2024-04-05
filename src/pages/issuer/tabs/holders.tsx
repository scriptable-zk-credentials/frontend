import { useState, useEffect } from "react"
import { getHolders, modifyHolders } from "../../../utils"
import { HolderInfo } from "../../../types"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button } from "@mui/material"


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
];


export function HoldersTab() {
    const [holders, setHolders] = useState<HolderInfo[]>([])
    const [toDelete, setToDelete] = useState<string>("")
    const [toAdd, setToAdd] = useState<string>("")

    const fetchData = async () => {
        const res = await getHolders()
        setHolders(res)
    }

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

    const applyDeleteHolders = () => {
        modifyHolders(toDelete.split(",").filter(x => x != "").map(x => parseInt(x)), []).then(() => {fetchData()})
    }
    const applyAddHolder = () => {
        const [first_name, last_name] = toAdd.split(",")
        modifyHolders([], [{ first_name, last_name }]).then(() => {fetchData()})
    }

    useEffect(() => { fetchData() }, [])

    return (
        <>
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={holders}
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
            <div><h2><b>Modify holders</b></h2></div>
            <TextField
                id="todelete"
                variant="outlined"
                label="Holder IDs to delete"
                value={toDelete}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={applyDeleteHolders}
            >
                Apply
            </Button>
            <br/>
            <br/>
            <TextField
                id="toadd"
                variant="outlined"
                label="Holder info to add"
                value={toAdd}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={applyAddHolder}
            >
                Apply
            </Button>

        </>
      );
}