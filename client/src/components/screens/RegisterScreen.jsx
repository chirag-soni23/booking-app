import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import Success from "../Success";

function RegisterScreen() {
  const [loading, setLoading] = useState(false); // Initialize loading state with false
  const [error, setError] = useState(false); // Initialize error state with false
  const [success ,setSuccess] = useState()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true)
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          user
        );

        const data = response.data;
        setLoading(false)
        setSuccess(true)
        setName("")
        setEmail("")
        setPassword("")
        setCPassword("")
        // Handle the data or provide feedback to the user.
      } catch (error) {
        console.log(error);
        setLoading(false)
        setError(true)
        // Handle the error or provide feedback to the user.
      }
    } else {
      alert("Passwords don't match");
    }
  }

  return (
    <div className="container">
      {loading && (<Loader/>)}
      {error && (<Error/>)}
     
      <div className="row justify-content-center mt-5">
        {success  && (<Success message="Registration Success ✅"/>)}
        <div className="col-md-5 bs">
          <h2>Register</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <button className="btn mt-3" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
