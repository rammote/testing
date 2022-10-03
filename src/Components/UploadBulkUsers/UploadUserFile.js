import React, { useState } from 'react'
import { Stack, Typography, Button, FormHelperText } from '@mui/material'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Swal from 'sweetalert2'
export default function UploadUserFile({ setCSVFile }) {
    const [fileName, setFileName] = useState("")
    function handleChange(e) {
        e.preventDefault();
        console.log(e.target.files)
        if (e.target.files[0].type === "text/plain") {
            setFileName(e.target.files[0]?.name);
            var file = e.target.files[0];
            setCSVFile(file);
        } else {
            Swal.fire(
                "Warning", "Please Select .text/.txt file", "warning"
            )
        }
    }
    return (
        <div >
            <Typography variant="p" sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "red" }}>Only CSV file will be accepted</Typography>
            <Stack direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}>
                <Typography variant="p" sx={{ fontSize: "1rem" }}>Select File: </Typography>

                <label htmlFor="csv-user-button-file">
                    <input
                        accept="text/plain"
                        style={{ display: 'none' }}
                        id="csv-user-button-file"
                        type="file"
                        onChange={(e) => handleChange(e)}
                        required
                    />

                    <div>
                        <Button
                            startIcon={<AttachFileOutlinedIcon />}
                            style={{
                                backgroundColor: '#fff',
                                width: 'fit-content',
                                textTransform: "capitalize",
                               
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
            </Stack>


        </div>
    )
}
