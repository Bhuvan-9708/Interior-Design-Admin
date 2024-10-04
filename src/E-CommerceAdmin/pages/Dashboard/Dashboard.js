/** @format */

import HOC from "../../layout/HOC";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "../../../BaseUrl";

const Dashboard = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState();
  const [admin,setAdmin] = useState();
  const [product, setProduct] = useState();
  const [job, setJob] = useState();
  const [apllication,setApllication] = useState();
  const getProducts = async () => {
    
    let url = `${BaseUrl()}api/contact/get-all-mail`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCustomer(res.data.data);
  
    } catch (error) {
      
    }
  };

  const getProductsAdmin = async () => {
   
    let url = `${BaseUrl()}api/auth/get-all-admin`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAdmin(res.data.data);

    } catch (error) {
      
    }
  };

  const getProductsJobs = async () => {
    let url = `${BaseUrl()}api/jobs/all-jobs`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProduct(res.data.data);
    } catch (error) {
      
    }
  };

  const getProductsBlogs = async () => {
    let url = `${BaseUrl()}api/blogs/get-all-blog`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });

      setJob(res.data.data);
    } catch (error) {
      
    }
  };
  const fetchDataApllication = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl()}api/career/get-all-application`
      );
      setApllication(data?.data);
    } catch (e) {
    
    }
  };



  useEffect(() => {
    getProducts();
    getProductsAdmin();
    getProductsJobs();
    getProductsBlogs();
    fetchDataApllication();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "Total candidate",
      number: (customer && customer.length) || 0,
      icon: (
        <i
          className="fa-solid fa-user text-2xl"
          style={{ color: "#4099ff" }}
        ></i>
      ),
      bg: "#4099ff",
      link: "/candidate",
    },
    {
      progress: "bg-green-400",
      title: "Total Admin's",
      number: (admin && admin.length) || 0,
      icon: <i className="fa-solid fa-user-tie text-2xl text-[#29cccc]" />,
      bg: "#29cccc",
      link: "/admin",
    },
    {
      progress: "bg-green-400",
      title: "Total Jobs",
      number: (product && product.length) || 0,
      icon: <i className="fa-solid fa-box text-2xl text-[#3c335d]"></i>,
      bg: "#3c335d",
      link: "/job",
    },
    {
      progress: "bg-green-400",
      title: "Total Blogs",
      number: (job && job.length) || 0,
      icon: <i className=" fa-brands fa-slack text-2xl text-[#64878e]"></i>,
      bg: "#64878e",
      link: "/blogs",
    },
    {
      progress: "bg-green-400",
      title: "Total Applications",
      number: (apllication && apllication.length) || 0,
      icon: <i className=" fa-brands fa-slack text-2xl text-[#64878e]"></i>,
      bg: "#063970",
      link: "/application",
    },

    // {
    //   progress: "bg-green-400",
    //   title: "total subcategory",
    //   number: 100,
    //   icon: (
    //     <i className=" fa-solid fa-layer-group text-2xl text-[#1b6975]"></i>
    //   ),
    //   bg: "#1b6975",
    //   link: "/SubCategory",
    // },

    // {
    //   progress: "bg-green-400",
    //   title: "total Notification",
    //   number: 100,
    //   icon: <i className=" fa-solid fa-envelope text-2xl text-[#659cca]"></i>,
    //   bg: "#659cca",
    //   link: "/pushNotification",
    // },

    // {
    //   progress: "bg-green-400",
    //   title: "total Banner",
    //   number: 100,
    //   icon: <i className=" fa-solid fa-image text-2xl text-[#6bb07e]"></i>,
    //   bg: "#6bb07e",
    //   link: "/banner",
    // },

    // {
    //   progress: "bg-green-400",
    //   title: "total Coupon",
    //   number: 100,
    //   icon: <i className=" fa-solid fa-ticket text-2xl text-[#944f81]"></i>,
    //   bg: "#944f81 ",
    //   link: "/coupon",
    // },
    // {
    //   progress: "bg-green-400",
    //   title: "total Orders",
    //   number: 100,
    //   icon: (
    //     <i className=" fa-solid fa-cart-shopping text-2xl text-[#637ce6]"></i>
    //   ),
    //   bg: "#637ce6",
    //   link: "/Orders",
    // },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
