import { useState } from "react"
import { checkPresentation } from "../../../utils"
import { TextField, Button } from "@mui/material"

export function HoldersTab() {
    const [receipt, setReceipt] = useState("");
    const [issuers, setIssuers] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.id) {
            case "receipt-field":
                setReceipt(event.target.value)
                break
            case "issuers-field":
                setIssuers(event.target.value)
                break
        }
    }

    const handleSubmit = () => {
        const issuersList = issuers.split(",").filter(x => x != "");
        checkPresentation(issuersList, receipt).then((result) => setMsg(JSON.stringify(result)))
    }

    const msgToStatus = (): string => {
        if (msg === "") {
            return "";
        }
        const parsedMsg = JSON.parse(msg);
        if (parsedMsg["verdict"] === true) {
            return "Success ✅";
        }
        else {
            return `Error: ${parsedMsg["error"]}`
        }
    }
    
    return (
        <>
            <br/>
            <TextField
                id="receipt-field"
                variant="outlined"
                label="Proof"
                value={receipt}
                onChange={handleChange}
            />
            <br/>
            <br/>
            <TextField
                id="issuers-field"
                variant="outlined"
                label="Credential issuers"
                value={issuers}
                onChange={handleChange}
            />
            <br/>
            <br/>
            <Button
                variant="contained"
                onClick={handleSubmit}
            >
                Submit
            </Button>
            <br/>
            <div>{msgToStatus()}</div>
        </>
    );
}