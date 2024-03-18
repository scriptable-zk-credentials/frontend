import { syncInstances } from "../../../utils"
import { Button } from "@mui/material"


export function SyncTab() {
    return (
    <>
    <h2><b>Click to sync instance hashes between DB and smart contract</b></h2>
    <Button
        variant="contained"
        onClick={() => syncInstances()}
    >
        Sync
    </Button>
    </>)
}