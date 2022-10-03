import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UploadToken from './UploadToken'
import Typography from '@mui/material/Typography'
export default function HardwareTokenUpload() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', mt: 10 }}>
            <Typography variant="h5" sx={{ ml: 1, pt: 2, fontWeight: "bold" }} color="primary"> Hardware Token File Uploader</Typography>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="Hardware Token Uploader"
                     >
                    <Tab label="One Time Password Token" value="1"  sx={{ minWidth: "100%" }} />

                </TabList>
                <TabPanel value="1" sx={{minWidth:"100vw"}}>
                    <UploadToken />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
