import React, { useState } from 'react'
import { Stack, Typography, Button, FormHelperText, TextField } from '@mui/material'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Swal from 'sweetalert2'
export default function PasswordFileUpload({ setPassword,setXmlPasswordFile }) {
    const [fileName, setFileName] = useState("")
    function handleChangeFile(e) {
        e.preventDefault();
        console.log(e.target.files)
        
        if (e.target.files[0].type === "text/plain" || e.target.files[0].type === "text/xml") {
            setFileName(e.target.files[0]?.name);
            var file = e.target.files[0];
            setXmlPasswordFile(file);
        } else {
            Swal.fire(
                "Warning", "Please Select correct file name", "warning"
            )
        }
    }
    return (
        <div>
            <Typography variant="p" sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>Step 2: Click To Upload</Typography>
            <br />
            <Typography variant="p" sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "red" }}>Only text and xml file will be accepted</Typography>

            <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}>
                <Typography variant="p" sx={{ fontSize: "1rem" }}>Select Password File: </Typography>
                <label htmlFor="password-file-button-file">
                    <input
                        accept=".txt, text/xml"
                        style={{ display: 'none' }}
                        id="password-file-button-file"
                        type="file"
                        required
                        onChange={e => handleChangeFile(e)}
                    />

                    <div>
                        <Button
                            startIcon={<AttachFileOutlinedIcon />}
                            style={{
                                backgroundColor: '#fff',
                                width: 'fit-content',
                                textTransform: "capitalize"
                            }}
                            variant="outlined"
                            color="primary"
                            component="span"
                            size="small"
                        >
                            Upload File
                        </Button>
                        <FormHelperText sx={{ color: "blueviolet" }}>{fileName}</FormHelperText>
                    </div>
                </label>
                <Typography variant="p">OR</Typography>
                <TextField onChange={e=>setPassword(e.target.value)} variant="outlined" size="small" sx={{ width: 200 }} type="password" />
            </Stack>


        </div>
    )
}
