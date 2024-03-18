import { useState } from "react"
import { TextField, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { setBackendUrl, getBackendUrl, sayHello } from "../../utils"


export function Root() {
    const [status, setStatus] = useState<string>("❌");
    const navigate = useNavigate();

    async function testBackendUrl() {
        try {
            const result = await sayHello()
            console.log(result)
            if (result == "Hello, World!") setStatus("✅")
            else setStatus("❌")   
        } catch (error) {
            setStatus("❌")
        }
    }

    return(
        <Box
            display="block"
        >
            <TextField
                variant="outlined"
                label="Backend URL"
                defaultValue={getBackendUrl()}
                onBlur={(e) => {
                    setBackendUrl(e.target.value)
                    testBackendUrl()
                }}
            />
            <div>{status}</div>
            <Button
                variant="contained"
                onClick={() => { navigate("/issuer") }}
            >
                Go to Issuer page
            </Button>
            <Button
                variant="contained"
                onClick={() => { navigate("/verifier") }}
            >
                Go to Verifier page
            </Button>
        </Box>
    )
}