/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { Store } from 'react-notifications-component';

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/dashboard ",
      name: "Dashboard",
    },

    // {
    //   icon: (
    //     <i className="fa-solid fa-user text-xl mr-3 rounded-full"></i>
    //   ),
    //   link: "/candidate",
    //   name: "candidate",
    // },
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/admin",
      name: "Admin",
    },
    {
      icon: (
        <i className="fa-solid fa-box text-xl mr-3 rounded-full"></i>
      ),
      link: "/job",
      name: "Career Form",
    },
    {
      icon: <i className=" fa-brands fa-slack text-2xl mr-3"></i>,
      link: "/blogs",
      name: "Blog",
    },

    {
      icon: <i className=" fa-solid fa-layer-group text-xl mr-3 rounded-full" />,
      link: "/application",
      name: "Contact Form",
    },
    {
      icon: <i className="fa-solid fa-phone  text-xl mr-3 rounded-full"></i>,
      link: "/Support",
      name: "Help & Suppport",
    },
    // {
    //   icon: <i className="fa-solid fa-envelope text-xl mr-3 rounded-full"></i>,
    //   link: "/pushNotification",
    //   name: "Push Notification",
    // },

    // {
    //   icon: <i className="fa-solid fa-image   text-xl mr-3 rounded-full " />,
    //   link: "/banner",
    //   name: "Banner",
    // },
    {
      icon: <i className=" fa-solid fa-ticket text-xl mr-3 rounded-full " />,
      link: "/coupon",
      name: "Projects",
    },

    // {
    //   icon: (
    //     <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full"></i>
    //   ),
    //   link: "/Orders",
    //   name: "Orders",
    // },




    // {
    //   icon: <i className="fa-solid fa-shield text-xl mr-3 rounded-full"></i>,
    //   link: "/privacy",
    //   name: "Privacy Policy",
    // },
    // {
    //   icon: <i className="fa-solid fa-barcode text-xl mr-3 rounded-full"></i>,
    //   link: "/terms",
    //   name: "Terms&Condition",
    // },
    // {
    //   icon: <i className="fa-solid fa-phone  text-xl mr-3 rounded-full"></i>,
    //   link: "/customerquery",
    //   name: "Customer&Query",
    // }
  ];

  const logOut = () => {
    localStorage.clear()

    navigate("/");
    Store.addNotification({
      title: "Logout Success",
      message: "You've been logged out ",
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
  };

  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#19376d", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[#fff]"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {" "}
            ADMIN PANEL
          </span>
        </figure>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link
                to={nav.link}
                key={nav.name}
                className=""
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
                  style={{ color: "#FFF" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
            style={{ color: "#FFF", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
