/** @format */
import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import BreadCamp from "../Component/BreadCamp";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";

const EVendorList = () => {


  //  api calling single data
  const [data, setData] = useState([]);
  const getProducts = async () => {

    let url = `${BaseUrl()}api/auth/get-all-admin`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data.data);

    } catch (error) {

    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete data
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl()}api/v1/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
    } catch (error) {

    }
  }


  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
      (i) =>
        i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
        // i?.number?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.email?.toLowerCase().includes(query?.toLowerCase())
    )
    : data;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);

  for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
    pages2.push(i);
  }

  function Next() {
    setCurrentPage2(currentPage2 + 1);
  }

  function Prev() {
    if (currentPage2 !== 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  return (
    <>
      <BreadCamp name="Admin" />
      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Admin's ( Total : {data?.length} )
        </span>
      </div>

      <section className="sectionCont">
        {data?.length === 0 || !data ? (
          <Alert>No Data Found</Alert>
        ) : (
          <>
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                value={query}
                placeholder="Start typing to search for Customers"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Email Address</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td> {i.email} </td>
                      <td> {i.password} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => Prev()}
                  className="prevBtn"
                >
                  <i className="fa-solid fa-backward"></i>
                </button>
                {currentPage2 === 1 ? (
                  ""
                ) : (
                  <button onClick={() => setCurrentPage2(1)}>1</button>
                )}

                {pages2
                  ?.slice(currentPage2 - 1, currentPage2 + 3)
                  .map((i, index) =>
                    i === pages2?.length ? (
                      ""
                    ) : (
                      <button
                        key={index}
                        onClick={() => setCurrentPage2(i)}
                        className={currentPage2 === i ? "activePage" : ""}
                      >
                        {" "}
                        {i}{" "}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setCurrentPage2(pages2?.length)}
                  className={
                    currentPage2 === pages2?.length ? "activePage" : ""
                  }
                >
                  {" "}
                  {pages2?.length}{" "}
                </button>

                {currentPage2 === pages2?.length ? (
                  ""
                ) : (
                  <button
                    onClick={() => Next()}
                    className="nextBtn"
                  >
                    {" "}
                    <i className="fa-sharp fa-solid fa-forward"></i>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(EVendorList);
