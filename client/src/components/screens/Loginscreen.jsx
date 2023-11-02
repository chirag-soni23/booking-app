import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import Success from "../Success";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function Login() {
    setLoading(true); // Set loading state to true before making the request.
    setError(false); // Reset the error state.
    setSuccess(false); // Reset the success state.

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      const data = response.data;

      // Assuming your API returns a token or user data
      localStorage.setItem("currentUser", JSON.stringify(data));
      window.location.href = "/"
      setSuccess(true);
      setLoading(false); // Reset loading state.
      // You can redirect the user to a different page or perform other actions as needed.
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false); // Reset loading state.
      // Handle the error or provide feedback to the user.
    }
  }

  return (
    <div className="container">
        {loading && (<Loader/>)}
      <div className="row justify-content-center mt-5">
      {error && (<Error message ="Invalid Credentials"/>)}
        <div className="col-md-5 bs">
          <h2>Login</h2>
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
          <button className="btn mt-3" onClick={Login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
