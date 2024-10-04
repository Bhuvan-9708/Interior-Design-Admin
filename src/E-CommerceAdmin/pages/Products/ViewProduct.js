/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
const ViewProduct = () => {
  const { id } = useParams();

  //api calling
  const [product, setProduct] = useState({});
  const getProducts = async () => {
   
    let url = `${BaseUrl()}api/jobs/get-job/${id}`;
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
            <p className="Head">Job Id : {product?.jobId}</p>
            <p className="Rating">
              <span className="rat">Role : {product?.role}</span>{" "}
            </p>

            <p className="Rating rat">
              <span className="rat">Location : {product?.location}</span>{" "}
            </p>

            <div>
              <h4 className="Head">Job Responsibilities :</h4>

              <ul>
                <li>{product?.job_description?.keyResponsibilities}</li>
              </ul>
            
            </div>

            <div>
              <h4 className="Head">Job Requirements :</h4>

              <ul>
                <li>{product?.job_description?.keyRequirements}</li>
              </ul>
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(ViewProduct);
