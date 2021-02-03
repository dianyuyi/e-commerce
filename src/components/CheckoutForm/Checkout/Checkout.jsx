import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";
import { useGlobalContext } from "../../../context";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping adddress", "Payment details"];

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const { cart } = useGlobalContext();

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          console.log(token);

          setCheckoutToken(token);
        } catch (error) {
          console.log(error);
          // if (activeStep !== steps.length) history.push('/');
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Comfirmation = () => <div>Confirmation</div>;

  const Form = () =>
    activeStep == 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={0} className={classes.stepper}>
          {steps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep == steps.length ? (
          <Comfirmation />
        ) : (
          checkoutToken && <Form />
        )}
      </Paper>
    </>
  );
};

export default Checkout;
