/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
const ViewBlogs = () => {

  const { slug } = useParams();

  //api calling
  const [product, setProduct] = useState({});
  const getProducts = async () => {

    let url = `${BaseUrl()}api/blogs/get-blog/${slug}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });
      setProduct(res.data.data);
    } catch (error) {

    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <p className="headP">
        {" "}
        <Link to="/dashboard">Dashboard</Link> / <Link to="/Product">Jobs</Link>{" "}
      </p>

      <section className="sectionCont">
        <div className="Detail_Section">
          <div className="right_Cont">
            <div className="blog-image">
              {product.blog_image && (
                <img
                  src={product.blog_image} 
                  alt={product.title}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </div>
            <div className="flex-job">
              <p className="Head">Title :</p>
              <p>{product?.title}</p>
            </div>

            <div className="flex-job">
              <p className="Head">short Description :</p>
              <p>{
                product?.short_desc
              }</p>
            </div>

            <div className="flex-job">
              <p className="Head">Content :</p>
              <div dangerouslySetInnerHTML={{ __html: product?.content }} />
            </div>

            <div className="flex-job">
              <p className="Head">Time :</p>
              <p>{
                product?.updatedAt?.slice(0, 10)
              }</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(ViewBlogs);
