import React from 'react'

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
export default function BusinessUrl({handleSubmit, subdomainExist}) {
  return (
    <div>

<Container>
                    <Grid container spacing={3} style={{ marginTop: 20 }}>
                      <Grid item xs={1} md={3}></Grid>

                      <Grid item xs={6} md={6}>
                        <center>
                          <Button
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                            disabled={subdomainExist.noExist}
                          >
                            Continue
                          </Button>
                        </center>
                      </Grid>
                      <Grid item xs={1} md={3}></Grid>
                    </Grid>
                  </Container>
    </div>
  )
}
