import React, { useState, useEffect } from "react";
import styles from "./emailSend.module.css";
import email from "../../Assets/email.png";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Server from '../APIUrl';
import { useHistory } from "react-router-dom";
export default function EmailSend() {
  const location = useLocation();
  const history = useHistory();
  const requestTime = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
  const [loading, setLoading] = useState(false)
  const [emailId, setEmailId] = useState(location.state.form.email);
  const [formData, setFormData] = useState("");
  console.log({ emailId })
  useEffect(() => {
    setFormData(location.state.form);
  }, [])
  console.log({ StateObject: location.state });
  console.log({ formData: formData });
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await Server.get(`/account/resendAccountActivation?requestTime=${requestTime}&email=${emailId}`)
      .then((response) => {
        setLoading(false);
        if (response.data.resultCode === 0) {
          Swal.fire({
            title: 'Success',
            text: 'Email sent successfully, Please check your email box',
            icon: 'success',
            confirmButtonText: 'OK'
          })

        } else {
          Swal.fire({
            title: 'Warning',
            text: response.data.resultMessage,
            icon: 'error',
            showCancelButton: true,
          })


        }
      }).catch((err) => {
        console.log(err)
        setLoading(false);
        Swal.fire({
          title: 'Error',
          text: err,
          icon: 'error',
          showCancelButton: true,
        })


      })

  }
  return (
    <div>
      <div className={styles.mainContainer}>
        <div>
          <img src={email} alt="email" className={styles.email} />
        </div>
        <p>We have sent an email to <strong style={{ color: "#000" }}>{emailId}</strong></p>
        <p className={styles.paragraphContainer}>
          If you don't see message in your inbox make sure the email address
          listed above is correct and check your spam or Junk mail folder.This
          email is sent from help@axiomprotect.com.
        </p>
        {
          loading ? <p style={{color:"green"}}>Sending...</p> :
            <p>
              If You want to resend email <span onClick={handleSubmit} style={{ textTransform: "capitalize", color: "#1976d2", cursor: "pointer" }}>Click Here</span>
            </p>
        }
        <Button onClick={() => history.push("/")} size="small" color="primary" variant="contained">Go Back</Button>
      </div>
    </div>
  );
}
