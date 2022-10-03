import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";

import Typography from '@mui/material/Typography';
import * as React from 'react';
import CreateAccess from './ActivationStep/CreateAccess';
import Success from './ActivationStep/Success';
import ConfirmNow from './ActivationStep/ConfirmNow';
const steps = ['Confirm Account', 'Setup Account', 'Start Now'];

export default function AccountActivation() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [account,setAccount] = React.useState({
      password:"",
        confirmPassword:"",
        subdomain:"",
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const setAccountDetailsOnChange = (data) => {
    setAccount(data);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
console.log({activeStep})
function getStepContent(step) {
    switch (step) {
        case 0:
            return (
              <ConfirmNow
                handleNext={handleNext}
                setAccountDetailsOnChange={setAccountDetailsOnChange}
              />
            );
        case 1:
        return (
          <CreateAccess
            handleNext={handleNext}
            handleBack={handleBack}
            accountData={account}
          />
        );
        case 2:
        return <Success accountData={ account}/>;
        default:
            return "Please Select the platform: Web/mobile";
    }
}
  return (
   <div style={{margin:"3rem auto"}}>
       <div style={{marginTop:"3rem"}}>
       <center>
                <img
                  src={axiom_protect_logo}
                  style={{ width: 50, height: 50 }}
                  alt="Axiom logo"
                />
              </center>
              <center>
                <h3 className="page_title">Axiom Protect 2.0</h3>
              </center>
       </div>
        <Box sx={{ width: '60%', margin:"0 auto", marginTop:"3rem", padding:"2rem", backgroundColor:"#fff", boxShadow:"0 0 5px lightblue", borderRadius:"0.3rem" }}>
            <h1 style={{textAlign:"center", color:"#1976d2"}}>Congratulations for creating account</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div >
            {getStepContent(activeStep)}
            {/* <div style={{display:"flex", justifyContent:"space-between", width:"60%", margin:"0 auto", marginTop:"-1rem", marginBottom:"1rem"}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
      
            >
              Back
            </Button>

            <Button color="primary" variant="contained" size="small" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            </div> */}
          </div>
        
    </Box>
   </div>
  );
}
