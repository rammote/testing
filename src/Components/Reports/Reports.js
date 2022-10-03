import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
   
import { emphasize } from '@mui/material/styles';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
},{index:1});

export default function Reports() {

    const history = useHistory();
    return(
        <div style={{paddingTop: '90px', marginLeft: '20px'}}>
            {/* <Grid container spacing={3} >
                <Grid item xs={12} md={6}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            //href="/DashBoard"
                            onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Reports"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </Grid>
            </Grid> */}
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                        <h4>Reports</h4>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}