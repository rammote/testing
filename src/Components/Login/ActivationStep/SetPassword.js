import React from 'react';

import { TextField } from '@mui/material';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import Input from "@mui/material/Input";
import { FormHelperText } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
export default function SetPassword({passwordForm, setpasswordForm, setPassword, passwordShown, confirmpasswordShown, togglePassword, toggleConfirmPassword}) {
  return (
    <div>
        <Container>
        <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          type={passwordShown ? "text" : "password"}
                          name="password"
                          id="password"
                          label="Create your password"
                          variant="outlined"
                          required
                          value={passwordForm.password}
                          onChange={(e) =>
                            setpasswordForm({
                              ...passwordForm,
                              password: e.target.value,
                            })
                          }
                        />
                        <InputAdornment style={{ float: "right" }}>
                          <IconButton>
                            <RemoveRedEyeIcon
                              onClick={togglePassword}
                              style={{ marginTop: "-55px" }}
                            />
                          </IconButton>
                        </InputAdornment>
                        <br />
                        <br />
                        <TextField
                          fullWidth
                          type={confirmpasswordShown ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          label="Confirm your password"
                          required
                          variant="outlined"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setpasswordForm({
                              ...passwordForm,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                        <InputAdornment style={{ float: "right" }}>
                          <IconButton>
                            <RemoveRedEyeIcon
                              onClick={toggleConfirmPassword}
                              style={{ marginTop: "-55px" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      </Grid>
                    </Grid>
        </Container>
    </div>
  )
}
