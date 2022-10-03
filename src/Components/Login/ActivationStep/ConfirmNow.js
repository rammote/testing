import { Button } from "@mui/material";
import React from "react";
import career from "../../../Assets/career.png";
export default function ConfirmNow({handleNext}) {
  return (
    <div>
      <div style={{textAlign:"center"}}>
        <h3 style={{ textAlign: "center" }}> Confirm Account</h3>
        <div style={{ textAlign: "center" }}>
          <img width={100} src={career} alt="success" />
        </div>
        <p>
          We are excited to have you get started.First you need to confirm your
          account.Just press the button below.
        </p>
      <Button size="small" onClick={handleNext} variant="contained" style={{textTransform:"capitalize"}}>Confirm Now</Button>
      </div>
    </div>
  );
}
