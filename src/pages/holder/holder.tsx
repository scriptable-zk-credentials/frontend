import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CodeMirror from "@uiw/react-codemirror";
import { generateProof, getProofStatus } from "../../utils";

export function Holder() {
    const [numCreds, setNumCreds] = useState(1);
    const [creds, setCreds] = useState([""]);
    const [lang, setLang] = useState("Rhai");
    const [code, setCode] = useState("credentials[0][\"EXAMPLE\"] == \"EXAMPLE\"");
    const [proof, setProof] = useState("");
    const [taskId, setTaskId] = useState(0);
    const [statusMsg, setStatusMsg] = useState("");

    const STATUS_MSG_PENDING = "In progress... ⏳🤌🏻";
    const STATUS_MSG_READY = "Ready ✅";

  const handleLangChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  const handleNumCredsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumCreds = parseInt(event.target.value ?? 1);
    setNumCreds(newNumCreds);
    setCreds(new Array(newNumCreds).fill(""));
  };

  const handleCredsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputIdx = parseInt(event.target.id.split("-")[1]);
    const newCreds = creds;
    newCreds[inputIdx] = event.target.value;
    setCreds(newCreds);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const checkStatus = () => {
    getProofStatus(taskId).then((response: object) => {
        if ("Pending" in response) {
            setTimeout(checkStatus, 1000);
        }
        else if ("Ready" in response) {
            setStatusMsg(STATUS_MSG_READY);
            // @ts-expect-error: we know that "Ready" key has a string value
            setProof(response["Ready"]);
        }
    })
  }

  const handleGenProof = () => {
    generateProof(creds, lang, code).then((task_id: number) => {
        setTaskId(task_id);
        setStatusMsg(STATUS_MSG_PENDING);
        checkStatus();
    })
  };

  return (
    <>
        <b>Holder Page</b>
        <br />
        <br />
        <TextField
            id="numCreds"
            variant="outlined"
            label="How many credentials?"
            type='number'
            InputProps={{ inputProps: { min: 0 } }}
            value={numCreds}
            onChange={handleNumCredsChange}
        />
        <br />
        <div id='creds-container'>
            {
                creds.map((val, i) =>
                    <div key={i}>
                        <br />
                        <TextField
                            id={`cred-${i}`}
                            variant="outlined"
                            label="Credential instance"
                            onChange={handleCredsChange}
                        />
                    </div>
                )
            }
        </div>
        <br />
        <Box>
        <FormControl>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="Language"
            onChange={handleLangChange}
            >
            <MenuItem value={"Rhai"}>Rhai</MenuItem>
            <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
            </Select>
        </FormControl>
        </Box>
        <br />
        <CodeMirror
            value={code}
            onChange={handleCodeChange}
        />
        <br />
        <Button
            variant="contained"
            onClick={handleGenProof}
        >
            Generate proof
        </Button>
        <h3>{statusMsg}</h3>
        {
            proof == ""
                ? <></>
                : 
                <Button
                    variant="contained"
                    onClick={() => {navigator.clipboard.writeText(proof)}}
                    >
                    Copy
                </Button>
        }
    </>
  );
}