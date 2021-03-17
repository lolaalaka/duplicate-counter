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
        <form
          onSubmit={submitForm}
          // style={{
          //   height: "100vh",
          //   width: "100vw",
          //   display: "grid",
          //   gridGap: "16px",
          //   placeContent: "center",
          // }}
          className="signinform"
        >
          {isNewUser ? (
            <p className="signintext">Welcome, Sign up</p>
          ) : (
            <p className="signintext">You've been here before? Madeaux</p>
          )}

          <div>
            <label htmlFor="email"></label>
            <input name="email" type="text" placeholder="Email" />
          </div>

          <div>
            <label htmlFor="password"></label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <div>
            <label htmlFor="new-user" className="signinbottom">
              New user? Click here to sign up
            </label>
            <input
              name="new-user"
              type="checkbox"
              checked={isNewUser}
              onChange={() => setIsNewUser(!isNewUser)}
            />
          </div>

          <button type="submit" className="signinbtn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
