import React, { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentMethodResult, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const URL = process.env.URL;

const OneTime = () => {
  const router = useRouter();

  //stripe
  const elements = useElements();
  const stripe = useStripe();

  const [isData, setData] = useState({
    CardNumber: null,
    ExpirationDate: null,
    SecurityCode: null,
  });

  const checkout = async ({ lineItems }: any) => {
    console.log(lineItems);
    let stripePromise: any = null;
    const getstripe = () => {
      if (!stripePromise) {
        stripePromise = loadStripe(
          "pk_test_51NsecMGkTL30QvsEIvccaEDK7uSUZHRyt4ZdpfbKfRolnau3ggEDmyG815CCS7eoMYbR0yFTSqgfbuzDe10r3ahh00vi18gP0N"
        );
      }
      return stripePromise;
    };
    const stripe = await getstripe();
    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `${URL}/payment/stripe?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${URL}/payment/stripe/`,
    });
  };

  return (
    <div>
      <div className={styles.mainDiv}>
        <button
          className={styles.btnBuy}
          onClick={() => {
            checkout({
              lineItems: [
                { price: "price_1O79hMGkTL30QvsE7uQFTgXt", quantity: 1 },
              ],
            });
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default OneTime;
