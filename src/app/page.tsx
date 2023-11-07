import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <h2 className={styles.glow}>Choose Payment</h2>
        <div className={styles.mainDiv}>
          <a className={styles.btnPay} href="payment/stripe">
            Stripe
          </a>
          <a className={styles.btnPay} href="payment/papal">
            Papal
          </a>
          <a className={styles.btnPay} href="payment/coinpayment">
            Coin Payment
          </a>
        </div>
      </div>
    </main>
  );
}
