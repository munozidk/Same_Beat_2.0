import "./AuthForm.css";

import mascota from "../../assets/mascota.svg";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { supabase } from "../../lib/supabaseClient";

type AuthFormProps = {
  setLoading?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

function AuthForm({
  setLoading,
}: AuthFormProps) {

  const navigate = useNavigate();

  /* ESTADOS */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* VALIDACION */

  const isDisabled =
    email.trim() === "" ||
    password.trim() === "" ||
    isSubmitting;

  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    if (setLoading) {
      setLoading(true);
    }

    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      if (setLoading) {
        setLoading(false);
      }

      setIsSubmitting(false);
      setError(
        error.message === "Email not confirmed"
          ? "Please verify your email before logging in."
          : "Invalid email or password."
      );
      return;
    }

    setTimeout(() => {
      navigate("/genres");
    }, 2500);
  };

  return (

    <div className="right">

      {/* Mascota */}

      <img
        src={mascota}
        alt="Mascota"
        className="mascota"
      />

      <h1>Log In</h1>

      <p className="sub">
        with email
      </p>

      {/* BOTONES */}

      <div className="social">

        <button>

          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" />

          Google

        </button>

        <button>

          <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" />

          Apple

        </button>

      </div>

      <p className="divider">
        Or continue with
      </p>

      {/* INPUT EMAIL */}

      <div className="input-box">

        <img
          src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
          className="icon"
        />

        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

      </div>

      {/* INPUT PASSWORD */}

      <div className="input-box">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
          className="icon"
        />

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

      </div>

      {error && (
        <p className="auth-error">
          {error}
        </p>
      )}

      {/* BOTON */}

      <button
        className={`signup ${
          isDisabled
            ? "disabled"
            : ""
        }`}
        disabled={isDisabled}
        onClick={handleLogin}
      >

        {isSubmitting ? "Logging in..." : "Log In"}

      </button>

      {/* LOGIN */}

      <p className="login">

        Don&apos;t have an account?{" "}

        <span
          onClick={() =>
            navigate("/signup")
          }
        >

          Sign Up

        </span>

      </p>

    </div>
  );
}

export default AuthForm;
