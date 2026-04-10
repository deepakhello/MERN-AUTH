import { useState, type ChangeEvent } from 'react';
import { Link } from "react-router-dom";

import styles from "./Signup.module.css";
import { emailRegex, passwordRegex } from '../../Utils/RegEx';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../Utils/api';

function Signup() {

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [show, setShow] = useState(false);
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    // console.log(name, value);

    setuserDetails((prev) => ({
      ...prev,
      [name]: value
    }))

     
  }

  const handleSignUp = async () => {
    if (!userDetails.username) {
      toast.error("Please enter a valid username.");
      return;
    }
    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(userDetails.password)) {
      toast.error("Password must be at least 8 characters long and include at least one number and one special character.");
      return;
    }
     try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, userDetails);
      toast.success(response.data.message);
      console.log(response);
      setuserDetails({username: "", email: "", password: ""});
     } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
     }

    
  };

  return(  
  <div className={styles.container}> 
    <div className={styles.formContainer}>
      <h2>Sign Up...</h2>
      <div className={styles.inputContainer}>
        <input 
          placeholder="Enter your Username..." 
          type="text" 
          name="username"
          value={userDetails.username}
          onChange={handleInputChange}
        />
        <input 
          placeholder="Enter your email..." 
          type="email" 
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
        />
        <div className={styles.passwordContainer}>
        <input 
          placeholder="Enter your password..." 
          type={show ? "text" : "password"}
          name="password"
          value={userDetails.password}
              onChange={handleInputChange}
            />
            <button onClick={() => setShow(!show)}>
              {show ? "HIDE" : "SHOW"}
            </button>
            </div>
        <button onClick={handleSignUp}>Sign Up</button>
        </div>

        
       <Link to="/"> Already have an account? Login</Link> 
        
    </div>
  </div>
  )
}

export default Signup