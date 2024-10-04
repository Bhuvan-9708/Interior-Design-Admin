/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Alert } from "react-bootstrap";
import { Store } from 'react-notifications-component';
import axios from "axios";
import BaseUrl from "../../BaseUrl";


const Login = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    email: email,
    password: password

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = `${BaseUrl()}api/auth/login-admin`;


    try {
      const res = await axios.post(url, data);
      localStorage.setItem("token", res.data.data.token);
      navigate("/dashboard");
      Store.addNotification({
        title: "Login Success",
        message: "Welcome Admin",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
      setLoading(false);
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
                <Alert variant="danger">Check Your Credentials</Alert>
                <i class="fa-solid fa-x" onClick={() => setError(false)}></i>
              </div>
            ) : (
              ""
            )}

            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-[100%]   p-2 rounded-md">
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

            <button
              type="submit"
              className="EcommerceAdminLogin"
              onClick={submitHandler}
            >
              {loading ? (
                <Oval height={30} secondaryColor="black" color="black" />
              ) : (
                "LOG IN"
              )}
            </button>
            <br />
            <button
              type="button"
              onClick={() => navigate("/newRegistation")}
              className="EcommerceVendorLogin"
            >
              New Registation
            </button>
          </section>
        </form>
      </div>
    </>
  );
};

export default Login;
