import React, {useState} from 'react'
import {Paper, Stepper, Step, StepLabel,Typography,CircularProgress, Divider, Button} from "@material-ui/core"
import AddressForm from "../AddressForm"
import PaymentForm from "../PaymentForm"
import useStyles from "./styles";

const steps = ['Shipping adddress', 'Payment details']

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0)

  const Comfirmation = () => (
    <div>
      Confirmation
    </div>
  )

  const Form = () => activeStep == 0 ? <AddressForm /> : <PaymentForm />
  return (
    <>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">Checkout</Typography>
        <Stepper activeStep={0} className={classes.stepper}>
          {steps.map((step)=>{
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep == steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </>
  )
}

export default Checkout