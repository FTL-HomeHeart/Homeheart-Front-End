import React, { useState } from "react";
import "./RegistrationForm.css";

export default function RegistrationForm({ handleRegistrationSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setpasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setpasswordError(true);
      return;
    } else {
      setpasswordError(false);
      handleRegistrationSubmit({
        username,
        email,
        firstName,
        lastName,
        password,
      });
    }
    // onRegister(firstName, lastName, username, password, confirmPassword, email);
  };

  return (
    <>
      <div className="registration-form-container">
        <h2>CREATE AN ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name: </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {passwordError && <p>Password does not match!</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
