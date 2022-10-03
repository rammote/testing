import React, { useState, Component, useCallback } from 'react';
import Server from '../APIUrl';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

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
});

export default function EditApplication() {
    const history = useHistory();
        return (
            <div style={{paddingTop: '90px', paddingLeft: "20px"}}>
                <Grid container>
                    <Grid item >
                        <Breadcrumbs aria-label="breadcrumb" >
                            <StyledBreadcrumb
                                component="a"
                                //href="/DashBoard"
                                onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                onClick={useCallback(() => history.push('/AxiomProtect/Applications'))}
                                label="Applications"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                            <StyledBreadcrumb
                                //onClick={useCallback(() => history.push('/Applications'))}
                                label="Edit Application"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{paddingTop: '30px'}}>
                    <Grid item>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '18px', color: '#000000', fontWeight: '800'}}>
                            Edit Application
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
}