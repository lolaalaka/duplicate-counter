import React from "react";
import { useState } from "react";
import { useAuth } from "../lib/auth";

export default function Authenticate() {
  const [isNewUser, setIsNewUser] = React.useState(false);
  const { signIn, signUp } = useAuth();

  const submitForm = (event) => {
    event.preventDefault();

    const { email, password } = event.target;

    if (isNewUser) {
      signUp(email.value, password.value);
    } else {
      signIn(email.value, password.value);
    }
  };

  return (
    <>
      <div className="formcontainer">
        <form onSubmit={submitForm} className="signinform">
          {isNewUser ? (
            <p className="signintext">Welcome, Sign up</p>
          ) : (
            <p className="signintext">Sign in!</p>
          )}

          <div>
            <label htmlFor="email"></label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="signinput"
              required
            />
          </div>

          <div>
            <label htmlFor="password"></label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              minLength="6"
              className="signinput"
              required
            />
          </div>
          <div className="signinbottom">
            <label htmlFor="new-user">
              Don't have an account? Click here to sign up
            </label>
            <input
              name="new-user"
              type="checkbox"
              checked={isNewUser}
              onChange={() => setIsNewUser(!isNewUser)}
            />
          </div>

          <button type="submit" className="signinbtn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
