import { useState, useEffect } from "react"
import { getSchemas } from "../../../utils"
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'schema', headerName: 'Schema', width: 10000 },
];

export function SchemasTab() {
    const [schemas, setSchemas] = useState<string[]>([])

    const fetchData = async () => {
        const res = await getSchemas()
        setSchemas(res.map(x => atob(x)))
    }

    useEffect(() => { fetchData() }, [])

    return (
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
      );
}