import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import search from "../../assets/images/search.png";
import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import linkedin from "../../assets/images/linkedin.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterAndLogin = () => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [isValid, setIsValid] = useState({
    username: null,
    email: null,
    password: null,
    phoneNo: null,
    address: null,
  });

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/client/registerC`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, address, phoneNo, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setPhoneNo("");
        setAddress("");
        // console.log(data);
        alert("Vendor Registered Successfully");
      }
      // console.log(response);
    } catch (error) {
      console.error("Registration Failed", error);
      alert("Registration Failed");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/client/loginC`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is not JSON
      // const contentType = response.headers.get("Content-Type");
      // if (!contentType || !contentType.includes("application/json")) {
      //   const text = await response.text();
      //   console.error("Unexpected response type:", text);
      //   // alert("Unexpected response from server.");
      //   return;
      // }

      const data = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        localStorage.setItem("loginTokenC", data.tokenC);

        const clientId = data.clientId;
        // console.log("Checking for clientId:", clientId);

        const clientResponse = await fetch(
          `${API_URL}/client/single-Client/${clientId}`
        );
        const clientData = await clientResponse.json();
        if (clientResponse.ok) {
          const clientId = clientData.clientId;
          const clientName = clientData.client.username;
          const clientEmail = clientData.client.email;
          const clientPhoneNo = clientData.client.phoneNo;
          const clientAddress = clientData.client.address;

          // console.log("Checking for clientData:", clientData);
          localStorage.setItem("clientId", clientId);
          localStorage.setItem("clientName", clientName);
          localStorage.setItem("clientEmail", clientEmail);
          localStorage.setItem("clientPhoneNo", clientPhoneNo);
          localStorage.setItem("clientAddress", clientAddress);
          // console.log("Checking for clientId:", clientId);
          // console.log("Checking for clientName:", clientName);
          navigate("/landing");
        } else {
          console.error("Error fetching client data:", clientData);
          alert("Error fetching client data.");
        }
      } else {
        console.error("Login failed with status:", response.status);
        alert("The username or password is incorrect");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed.");
    }
  };

  const validateInput = (value, type) => {
    // const namePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ'’\- ]{2,50}$/;
    const namePattern = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    // const namePattern = /^[a-zA-Z]+( [a-zA-Z]+ )*$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^_])[A-Za-z\d@$!%*?&#^_]{6,12}$/;
    const phonePattern = /^[0-9]{10}$/;

    let isValidField;

    switch (type) {
      case "username":
        isValidField = namePattern.test(value);
        setUsername(value);
        break;
      case "email":
        isValidField = emailPattern.test(value);
        setEmail(value);
        break;
      case "password":
        isValidField = passwordPattern.test(value);
        setPassword(value);

        break;
      case "phoneNo":
        isValidField = phonePattern.test(value);
        setPhoneNo(value);
        break;
      case "address":
        isValidField = value.trim() !== "";
        setAddress(value);
        break;
      default:
        break;
    }

    setIsValid((prev) => ({ ...prev, [type]: isValidField }));
  };

  return (
    <>
      <div className="mainContainer">
        <div className={`containerRL ${isActive ? "activeRL" : ""}`}>
          <div className="formRL-containerRL sign-upRL">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <div className="social-iconsRL">
                <div className="iconRL">
                  <img src={search} alt="" />
                </div>
                <div className="iconRL">
                  <img src={facebook} alt="" />
                </div>
                <div className="iconRL">
                  <img src={github} alt="" />
                </div>
                <div className="iconRL">
                  <img src={linkedin} alt="" />
                </div>
              </div>
              <span>or use your email for registration</span>
              <input
                required
                type="text"
                name="username"
                value={username}
                onChange={(e) => validateInput(e.target.value, "username")}
                placeholder="Name"
                onInvalid={(e) =>
                  e.target.setCustomValidity("Fill the name, please")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                className={
                  isValid.username === null
                    ? ""
                    : isValid.username
                    ? "valid"
                    : "invalid"
                }
              />
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => validateInput(e.target.value, "email")}
                placeholder="Enter your email"
                className={
                  isValid.email === null
                    ? ""
                    : isValid.email
                    ? "valid"
                    : "invalid"
                }
                onInvalid={(e) =>
                  e.target.setCustomValidity("Fill the email, please")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
              <div className="password-input-container">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => validateInput(e.target.value, "password")}
                  placeholder="Password"
                  className={
                    isValid.password === null
                      ? ""
                      : isValid.password
                      ? "valid"
                      : "invalid"
                  }
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "password must be at least one letter,number,special character and minimum 6 character maximum 12 character  EG: Abc_123"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />

                {showPassword ? (
                  <FaEye
                    className="passworButton"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEyeSlash
                    className="passworButton"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <input
                required
                type="text"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => validateInput(e.target.value, "phoneNo")}
                placeholder="Phone no"
                className={
                  isValid.phoneNo === null
                    ? ""
                    : isValid.phoneNo
                    ? "valid"
                    : "invalid"
                }
                onInvalid={(e) =>
                  e.target.setCustomValidity("Fill the Phone No, please")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
              <div className="addressBoxC">
                <input
                  required
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => validateInput(e.target.value, "address")}
                  placeholder="Address"
                  className={
                    isValid.address === null
                      ? ""
                      : isValid.address
                      ? "valid"
                      : "invalid"
                  }
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Fill the address, please")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
                <div className="addressEg">
                  EG:-<span>No:2,Murali Street,Kadambathur,Thiruvallur</span>
                </div>
              </div>
              {/* <input
                required
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <p className="addressEg">EG:-<span>No:2,Murali Street,Kadambathur,Thiruvallur</span></p> */}
              <button className="signInBtn">Sign Up</button>
            </form>
          </div>
          <div className="formRL-containerRL sign-inRL">
            <form onSubmit={loginHandler}>
              <h1>Sign In</h1>
              <div className="social-iconsRL">
                <div className="iconRL">
                  <img src={search} alt="" />
                </div>
                <div className="iconRL">
                  <img src={facebook} alt="" />
                </div>
                <div className="iconRL">
                  <img src={github} alt="" />
                </div>
                <div className="iconRL">
                  <img src={linkedin} alt="" />
                </div>
              </div>
              <span>or use your email for password</span>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => validateInput(e.target.value, "email")}
                placeholder="Enter your email"
                className={
                  isValid.email === null
                    ? ""
                    : isValid.email
                    ? "valid"
                    : "invalid"
                }
              />
              <div className="password-input-container">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => validateInput(e.target.value, "password")}
                  placeholder="Password"
                  className={
                    isValid.password === null
                      ? ""
                      : isValid.password
                      ? "valid"
                      : "invalid"
                  }
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "The password must contain at least one letter, one number, and one special character (e.g., ABC_123)."
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />

                {showPassword ? (
                  <FaEye
                    className="passworButton"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEyeSlash
                    className="passworButton"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <a href="#" className="forgetPassword">
                Forget Your Password?
              </a>
              <button className="signInBtn">Sign In</button>
            </form>
          </div>
          <div className="toggleRL-containerRL">
            <div className="toggleRL">
              <div className="toggleRL-panelRL toggleRL-leftRL">
                <h1>Welcome Back!</h1>
                <p>
                  Enter your personal details to use
                  <br /> all of the site's features
                </p>
                <button
                  type="button"
                  className="hiddenRL"
                  onClick={handleLoginClick}
                >
                  Sign In
                </button>
              </div>
              <div className="toggleRL-panelRL toggleRL-rightRL">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use
                  <br /> all of the site's features
                </p>
                <button
                  type="button"
                  className="hiddenRL"
                  onClick={handleRegisterClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAndLogin;
