import React from "react";
import styles from "./index.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/navigation";

// BASE URLS
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

export const PaypalPayment = () => {
  const router = useRouter();

  //create subscription
  const createSubscription = async (data: any) => {
    try {
      return await axios
        .post(`${PAYPAL_BASE_URL}/create-subscription`, {
          userId: "edc4abc1-7b41-4e07-b67f-b88e019b6321",
          paymentType: "YEARLY",
          membershipId: 1,
          country_code: "LK",
        })
        .then((res) => {
          if (!res?.data?.id) {
            console.log(res);
            return;
          }
          console.log(res);
          return res?.data?.id;
        })
        .catch((err) => {
          if (err) {
            // router.push(`/payment-fail?error:${err}`);
            console.log(`Create subscription error: ${err}`);
          }
        });
    } catch (err) {
      // router.push(`/payment-fail?error:${err}`);
      console.log(`Create subscription error: ${err}`);
    }
  };

  const approveSubscription = async (data: any, action: any) => {
    console.log("RAN THIS ON APPROVE");
    console.log(data, "data");
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios
      .post(
        `${PAYPAL_BASE_URL}/subscriptions-save`,
        {
          subscriptionId: data?.subscriptionID,
          paymentSource: data?.paymentSource,
          userId: "5600b6d6-3f8f-49b6-8938-3aafc9e24c25",
          membershipId: 1,
          paymentType: "YEARLY",
        },
        config
      )
      .then((data) => {
        router.push(`/payment-successful`);
      })
      .catch((err) => {
        console.log(`paymentfail ${err}`);
        router.push(`/payment-fail?error:${err}`);
      });

    return data.subscriptionID;
  };

  return (
    <div className={styles.mainDiv}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AbuyQvTPCjBL9SfP7-q53QEgjhtdt-4iXaKuuytEo6Hh5LpqzRhGYLZ1R0MWfH_UxGF4ISArz2t-9rI2",
          components: "buttons",
          currency: "USD",
          intent: "subscription",
          vault: true,
          "disable-funding": "card",
        }}
      >
        <div>
          <PayPalButtons
            createSubscription={(data: any) => createSubscription(data)}
            onApprove={(data: any, action: any) =>
              approveSubscription(data, action)
            }
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
};
