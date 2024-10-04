/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Alert } from "react-bootstrap";

import axios from "axios";
import BaseUrl from "../../BaseUrl";
import { nofification } from "../utils/utils";

const NewRegistation = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = `${BaseUrl()}api/auth/register-admin`;

    const data = {
      email: email,
      password: password,
    };

    try {
        const res = await axios.post(url, data);
        setShowOtp(true);
        nofification("Otp send successfully", "success");
        setLoading(false);
    } catch (err) {
     
      setLoading(false);
      setError(true);
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = `${BaseUrl()}api/auth/verify-otp`;

    const data = {
      email: email,
      otp: otp,
    };
    
    try {
        const res = await axios.post(url, data);
        nofification("Register successfully", "success");
        setLoading(false);
        navigate("/");
    } catch (err) {
  
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-col justify-center items-center "
        style={{ backgroundColor: "#19376d" }}
      >
        <form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 ">
          <img src="./Image/logo.png" alt="" className="logo" />
          <section className="py-2">
            {error ? (
              <div className="dangerBox">
                <Alert variant="danger">Check Your Detail</Alert>
                <i class="fa-solid fa-x" onClick={() => setError(false)}></i>
              </div>
            ) : (
              ""
            )}
          
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-[100%]   p-2 rounded-md mt-3">
              <input
                type="email"
                placeholder="admin@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiOutlineMail className="text-xl " />
            </div>
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-[100%]   p-2 rounded-md mt-3">
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="outline-none px-0.5  bg-transparent tracking-wider w-full  "
              />

              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            {showOtp && (
              <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-[100%]   p-2 rounded-md mt-3">
                <input
                  type="type"
                  placeholder="Enter your Otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                />
                <AiOutlineMail className="text-xl " />
              </div>
            )}

            <button
              type="submit"
              className="EcommerceAdminLogin"
              onClick={showOtp ? handleOtp : submitHandler}
            >
              {loading ? (
                <Oval height={30} secondaryColor="black" color="black" />
              ) : showOtp ? (
                "Verify Otp"
              ) : (
                "Register"
              )}
            </button>
            <br />
            <button
              type="button"
              onClick={() => navigate("/")}
              className="EcommerceVendorLogin"
            >
              Login
            </button>
          </section>
        </form>
      </div>
    </>
  );
};

export default NewRegistation;
