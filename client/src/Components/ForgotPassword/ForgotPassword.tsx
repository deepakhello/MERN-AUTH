import { useEffect, useState } from "react";

import styles from "./ForgotPassword.module.css";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader.tsx/Loader";


import { IsloggedIn } from "../../Utils/Auth";

function ForgotPassword() {
  const [step, setstep] = useState(0);

  const navigate = useNavigate()

    useEffect(()=>{
    IsloggedIn() ? navigate("/home") : ""
  },[]) 


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Forgot Password...</h2>
        {step === 0 && <EmailComponent setstep={setstep} />}
        {step === 1 && <OTPComponent setstep={setstep} />}
        {step === 2 && <PasswordComponent />}
      </div>
    </div>
  );
}

const PasswordComponent = () => {
  const [isloading, setisloading] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async () => {
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be at least 8 characters long and include at least one number and one special character.");
      return;
    }

    try {
      setisloading(true);
      const email = localStorage.getItem("email");
      const response = await axios.post(
        `${API_BASE_URL}/user/resetPassword`,
        { email, password: newPassword, isOTPVerified: true }
      );

      toast.success(response.data.message);
      localStorage.removeItem("email");
      setisloading(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error resetting password");
      setisloading(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.passwordContainer}>
        <input
          value={newPassword}
          placeholder="Enter new password..."
          type={show ? "text" : "password"}
          name="password"
          onChange={(e) => setnewPassword(e.target.value)}
        />
        <button onClick={() => setshow(!show)}>
          {show ? "HIDE" : "SHOW"}
        </button>
      </div>
      <button onClick={resetPassword}>{isloading ? <Loader /> : "RESET PASSWORD"}</button>
      <Link to="/">Back to Login</Link>
    </div>
  );
};


const EmailComponent = ({ setstep }: { setstep: (step: number) => void }) => {
  const [isloading, setisloading] = useState(false);
  const [email, setemail] = useState("");

  const getOTP = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setisloading(true);
      const response = await axios.post(
        `${API_BASE_URL}/user/resetPassword`,
        { email }
      );

      toast.success(response.data.message);
      localStorage.setItem("email", email);
      setstep(1);
      setisloading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setisloading(false);

      console.log(error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={email}
        placeholder="Enter your email..."
        type="email"
        name="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <button onClick={getOTP}>{isloading ? <Loader /> : "GET OTP"}</button>
      <Link to="/">Wanna Login?</Link>
    </div>
  );
};

const OTPComponent = ({ setstep }: { setstep: (step: number) => void }) => {
  const [isloading, setisloading] = useState(false);
  const [OTP, setTOTP] = useState("");

  const verifyOTP = async () => {
    if (!OTP) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      setisloading(true);
      const response = await axios.post(
        `${API_BASE_URL}/user/verifyPasswordOTP`,
        { OTP }
      );

      toast.success(response.data.message);

      setisloading(false);
      setstep(2);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error verifying OTP");
      setstep(0);
      setisloading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={OTP}
        placeholder="Enter your OTP..."
        type="text"
        onChange={(e) => {
          setTOTP(e.target.value);
        }}
      />
      <button onClick={verifyOTP}>
        {isloading ? <Loader /> : "VERIFY OTP"}
      </button>
    </div>
  );
};

export default ForgotPassword;
