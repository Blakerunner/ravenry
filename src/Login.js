import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import React from "react";
import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => alert(e.message));
  };

  return (
    <div className="login">
      <div className="login__title">
        <h1>Ravenry</h1>
      </div>
      <div className="login__logo">
        <img src="/images/raven-statue-logo.png" alt="Raven Logo" />
      </div>
      <div className="login__blurb">
        <h4>a game of thrones raven sending app</h4>
      </div>
      <Button onClick={signIn}>sign in</Button>
    </div>
  );
}

export default Login;
