import React, { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PaymentMethodResult, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const Subscription = () => {
  const router = useRouter();

  //stripe
  const elements = useElements();
  const stripe = useStripe();

  const [isData, setData] = useState({
    CardNumber: null,
    ExpirationDate: null,
    SecurityCode: null,
  });

  function handleChangeStripe(e: any) {}

  const handleStripePayment = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    // console.log(router.query?.paymentType, "handleStripePayment_1");
    const cardEl = elements.getElement(CardNumberElement);
    //card element
    const { error, paymentMethod } = (await stripe.createPaymentMethod({
      card: cardEl!,
      type: "card",
      billing_details: {
        name: "Ridma Kanchana",
        email: "ridma@sonicdevs.com",
      },
    })) as PaymentMethodResult;

    console.log(paymentMethod, "paymentMethod");
    console.log(error, "error");

    if (error) {
      console.log(error, "payment_method error");
      router.push(`/payment-fail`);
      return;
    } else {
      //call to action
      if (!paymentMethod.id) {
        console.log(error, "payment_method id error");
        router.push(`/payment-fail`);
        return;
      }
      const id = paymentMethod.id;
      await axios
        .post(`${process.env.STRIPE_BASE_URL}/create-subscription`, {
          id,
        })
        .then((data) => {
          router.push(`/payment-successful`);
        })
        .catch((err) => {
          console.log(`paymentfail ${err}`);
          router.push(`/payment-fail?error:${err}`);
        });
    }
  };

  const stripeInputOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#010203",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const FunctionSubmit = (e: any) => {
    handleStripePayment(e);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    FunctionSubmit(e);
  };

  return (
    <div>
      <div className={styles.mainDiv}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className={styles.input}>
            CARD NUMBER
            <CardNumberElement
              id="cardNumber"
              options={stripeInputOptions}
              onChange={(e) => {
                handleChangeStripe(e);
              }}
              // onReady={(e) => {
              //   // e.focus();
              //   setClick({
              //     ...isClick,
              //     CardNumber: true,
              //   });
              //   handleChange({ Number: "1" });
              // }}
            />
          </div>
          <div className={styles.input}>
            CARD EXPIRY
            <CardExpiryElement
              id="cardNumber"
              options={stripeInputOptions}
              onChange={(e) => {
                handleChangeStripe(e);
              }}
              // onReady={(e) => {
              //   // e.focus();
              //   setClick({
              //     ...isClick,
              //     CardNumber: true,
              //   });
              //   handleChange({ Number: "1" });
              // }}
            />
          </div>
          <div className={styles.input}>
            CARD CVC
            <CardCvcElement
              id="cardNumber"
              options={stripeInputOptions}
              onChange={(e) => {
                handleChangeStripe(e);
              }}
              // onReady={(e) => {
              //   // e.focus();
              //   setClick({
              //     ...isClick,
              //     CardNumber: true,
              //   });
              //   handleChange({ Number: "1" });
              // }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscription;
