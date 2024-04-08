import { useState, useEffect } from "react"
import { getSchemas, addSchema } from "../../../utils"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button } from "@mui/material"


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'schema', headerName: 'Schema', width: 10000 },
];

export function SchemasTab() {
    const [schemas, setSchemas] = useState<string[]>([]);
    const [newSchema, setNewSchema] = useState<string>("");

    const fetchData = async () => {
        const res = await getSchemas()
        setSchemas(res.map(x => atob(x)))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSchema(event.target.value);
    }

    const applyAddSchema = () => {
        addSchema(btoa(newSchema)).then(() => { fetchData(); })
    }

    useEffect(() => { fetchData() }, [])

    return (
      <>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={schemas.map((x, i) => ({ id: i, schema: x }))}
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
        <div><h2><b>Add new schema</b></h2></div>
        <TextField
            id="toadd"
            variant="outlined"
            multiline
            inputProps={{ style: { resize: "both" } }}
            label="Schema"
            value={newSchema}
            onChange={handleChange}
        />
        <Button
            variant="contained"
            onClick={applyAddSchema}
        >
            Add
        </Button>
      </>
    );
}