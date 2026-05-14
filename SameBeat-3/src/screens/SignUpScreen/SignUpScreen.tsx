import styles from "./SignupScreen.module.css";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import loginImg from "../../assets/Log in.svg";
import gifanimado from "../../assets/gifanimado.gif";

function SignupScreen() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [accepted, setAccepted] =
    useState(false);

  const [error, setError] =
    useState("");

  const [attempted, setAttempted] =
    useState(false);

  const [showGif, setShowGif] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setAttempted(true);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.username.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.dateOfBirth.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password ===
      formData.confirmPassword &&
    accepted;

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    if (!accepted) {

      setError(
        "You must accept the terms and conditions."
      );

      return;

    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;

    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const emailExists = users.some(
      (user: any) =>
        user.email === formData.email
    );

    if (emailExists) {

      setError(
        "This email is already registered."
      );

      return;

    }

    users.push(formData);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(formData)
    );

    setShowGif(true);

    // ✅ 3 segundos
    setTimeout(() => {
      setShowGif(false);
      navigate("/genres");
    }, 3000);

  };

  return (

    <div className={styles.signupScreen}>

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
          className={`${styles.blob5}`}
        />

      </div>

      {/* MAIN */}

      <main
        className={
          styles["register-container"]
        }
      >

        {/* LEFT */}

        <section
          className={styles["left-panel"]}
        >

          <img
            src={loginImg}
            alt="Same Beat"
            className={styles["left-art"]}
          />

        </section>

        {/* RIGHT */}

        <section
          className={styles["right-panel"]}
        >

          <h1>Sign Up</h1>

          <p className={styles.subtitle}>
            Create your account and start
            discovering concerts.
          </p>

          <form
            className={
              styles["register-form"]
            }
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div
              className={
                styles["double-input"]
              }
            >

              <div
                className={
                  styles["input-group"]
                }
              >

                <i className="fa-regular fa-user"></i>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={
                    formData.firstName
                  }
                  onChange={handleChange}
                />

              </div>

              <div
                className={
                  styles["input-group"]
                }
              >

                <i className="fa-regular fa-user"></i>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={
                    formData.lastName
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* USERNAME */}

            <div
              className={
                styles["input-group"]
              }
            >

              <i className="fa-solid fa-at"></i>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />

            </div>

            {/* PHONE */}

            <div
              className={
                styles["input-group"]
              }
            >

              <i className="fa-solid fa-phone"></i>

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            {/* EMAIL */}

            <div
              className={
                styles["input-group"]
              }
            >

              <i className="fa-regular fa-envelope"></i>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* DATE */}

            <div
              className={`${styles["input-group"]} ${styles["input-group--date"]}`}
            >

              <i className="fa-regular fa-calendar"></i>

              <input
                type="date"
                name="dateOfBirth"
                value={
                  formData.dateOfBirth
                }
                onChange={handleChange}
                max={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
              />

            </div>

            {/* PASSWORD */}

            <div
              className={
                styles["input-group"]
              }
            >

              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            {/* CONFIRM */}

            <div
              className={
                styles["input-group"]
              }
            >

              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
              />

            </div>

            {/* CHECKBOX */}

            <label
              className={
                styles["checkbox-group"]
              }
            >

              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => {

                  setAttempted(true);

                  setAccepted(
                    e.target.checked
                  );

                }}
              />

              <span>

                I accept the{" "}

                <a
                  href="#"
                  className={
                    styles["link-terms"]
                  }
                >
                  Terms of Service
                </a>

                {" "}and{" "}

                <a
                  href="#"
                  className={
                    styles["link-privacy"]
                  }
                >
                  Privacy Policy
                </a>

              </span>

            </label>

            {/* ERROR */}

            {error && (

              <p
                className={
                  styles["error-message"]
                }
              >
                {error}
              </p>

            )}

            {/* BUTTON */}

            <button
              type="submit"
              className={`
                ${styles["create-btn"]}
                ${
                  attempted &&
                  !isFormValid
                    ? styles["create-btn--error"]
                    : ""
                }
              `}
              disabled={!isFormValid}
            >

              Create

            </button>

            {/* LOGIN */}

            <p
              className={
                styles["login-link"]
              }
            >

              Already have an account?{" "}

              <Link to="/login">
                Sign in
              </Link>

            </p>

          </form>

        </section>

      </main>

      {/* GIF OVERLAY — solo fondo morado, sin caja negra */}

      {showGif && (

        <div className={styles.gifOverlay}>

          <img
            src={gifanimado}
            alt="Cargando..."
            className={styles.gifImage}
          />

        </div>

      )}

    </div>
  );
}

export default SignupScreen;