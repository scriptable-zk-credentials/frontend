import { useState, useEffect } from "react"
import { getPresentations, modifyPresentations} from "../../../utils"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button } from "@mui/material"


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'cred_hashes', headerName: 'Credential hashes', width: 140 },
    { field: 'cred_schemas', headerName: 'Credential schemas', width: 1000 },
    { field: 'lang', headerName: 'Language', width: 100 },
    { field: 'script', headerName: 'Script', width: 1000 },
    { field: 'result', headerName: 'Result', width: 70 },
];


export function AdminsTab() {
    const [presentations, setPresentations] = useState<object[]>([]);
    const [toApprove, setToApprove] = useState<string>("");
    const [toDeny, setToDeny] = useState<string>("");

    const fetchData = async () => {
        const res = await getPresentations()
        setPresentations(res.map((x, index) => {
            x["id"] = index;
            x["cred_schemas"] = x["cred_schemas"].map((y: string) => atob(y));
            return x;
         }));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.id) {
            case "todeny":
                setToDeny(event.target.value)
                break
            case "toapprove":
                setToApprove(event.target.value)
                break
        }
    }

    const handleApprove = () => {
        const idx = toApprove.split(",").filter(x => x != "").map(x => parseInt(x));
        modifyPresentations(idx, []).then(() => { fetchData() });
    }

    const handleDeny = () => {
        const idx = toDeny.split(",").filter(x => x != "").map(x => parseInt(x));
        modifyPresentations([], idx).then(() => { fetchData() });
    }

    useEffect(() => { fetchData() }, [])

    return (
      <>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={presentations}
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
        <div><h2><b>Manage presentation status</b></h2></div>
        <TextField
            id="toapprove"
            variant="outlined"
            label="IDs to approve"
            value={toApprove}
            onChange={handleChange}
        />
        <Button
            variant="contained"
            onClick={handleApprove}
        >
            Approve
        </Button>
        <br/>
        <br/>
        <TextField
            id="todeny"
            variant="outlined"
            label="IDs to deny"
            value={toDeny}
            onChange={handleChange}
        />
        <Button
            variant="contained"
            onClick={handleDeny}
        >
            Deny
        </Button>
      </>
    );
}