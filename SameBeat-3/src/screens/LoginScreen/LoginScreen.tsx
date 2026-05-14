import styles from "./LoginScreen.module.css";

import AuthForm from "../../components/AuthForm/AuthForm";

import loginImg from "../../assets/Log in.svg";

function LoginScreen() {

  return (

    <div className={styles.loginScreen}>

      {/* SVG FILTER */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles["svg-filter"]}
      >

        <filter id="goo">

          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="45"
            result="blur"
          />

          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 35 -15
            "
            result="goo"
          />

        </filter>

      </svg>

      {/* BACKGROUND */}

      <div
        className={
          styles["gooey-container"]
        }
      >

        <div
          className={`${styles.blob} ${styles.blob1}`}
        />

        <div
          className={`${styles.blob} ${styles.blob2}`}
        />

        <div
          className={`${styles.blob} ${styles.blob3}`}
        />

        <div
          className={`${styles.blob} ${styles.blob4}`}
        />

        <div
          className={styles.blob5}
        />

      </div>

      {/* CONTENT */}

      <main
        className={styles.container}
      >

        {/* LEFT */}

        <section
          className={styles.left}
        >

          <img
            src={loginImg}
            alt="Illustration"
            className={
              styles.illustration
            }
          />

        </section>

        {/* RIGHT */}

        <AuthForm />

      </main>

    </div>
  );
}

export default LoginScreen;