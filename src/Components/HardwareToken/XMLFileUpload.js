import React, { useState } from 'react'
import { Stack, Typography, Button, FormHelperText } from '@mui/material'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Swal from 'sweetalert2'
export default function XMLFileUpload({ setXMLFile }) {
    const [fileName, setFileName] = useState("")
    function handleChange(e) {
        e.preventDefault();
        console.log(e.target.files)
        if (e.target.files[0].type === "text/xml") {
            setFileName(e.target.files[0]?.name);
            var file = e.target.files[0];
            setXMLFile(file);
        } else {
            Swal.fire(
                "Warning", "Please Select correct file name", "warning"
            )
        }
    }
    return (
        <div>
            <Typography variant="p" sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>Step 1: Click To Upload</Typography>
            <br />
            <Typography variant="p" sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "red" }}>Only xml file will be accepted</Typography>

            <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}>
                <Typography variant="p" sx={{ fontSize: "1rem" }}>Select PSKC XML File: </Typography>
                <label htmlFor="icon-button-file">
                    <input
                        accept="text/xml"
                        style={{ display: 'none' }}
                        id="icon-button-file"
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
            </Stack>


        </div>
    )
}
