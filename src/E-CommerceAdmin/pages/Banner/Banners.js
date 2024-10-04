/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import BreadCamp from "../Component/BreadCamp";

const Banners = () => {
  const data = [
    {
      img: "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
    },
    {
      img: "https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGgM8RlZ0uehCZUxvIxTnjQY_DU_rYNAVTyA_eCrsZzUZiF9HzPni8ptGY4pTtXcf-EB0&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKac3r1g5y_0iC8LssfWLn1VZXA6CMfXn1A&usqp=CAU ",
    },
  ];

  return (
    <>
      <BreadCamp name='Banners' />

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Banners ( Total : {data.length} )
        </span>
      </div>

      <div className="gridCont">
        {data.map((i, index) => (
          <div key={index}>
            <img src={i.img} alt="" />
            <button className="delete-Btn">Button</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default HOC(Banners);
