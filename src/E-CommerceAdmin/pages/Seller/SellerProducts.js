
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table } from "react-bootstrap";
import SpinnerComp from "../Component/SpinnerComp";
import { Dropdown, Menu } from "antd";
import { Link, useParams } from "react-router-dom";
import BaseUrl from './../../../BaseUrl';
import axios from "axios";

const SellerProducts = () => {
    const { name } = useParams()
    const [query, setQuery] = useState("");

    
    
     //api calling
   const [seller, setSeller] = useState([]);
   const getProducts = async() => {
   
     let url = `${BaseUrl()}api/auth/get-all-admin`;
     try {
       const res = await axios.get(url, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("boon")}`,
         },
       });
       setSeller(res.data.data);

     } catch (error) {
 
     }
   }

   useEffect(() => {  
     getProducts();    
   }, []);

     //delete data
  const handleDelete=async(id)=>{
    try {
      const res=await axios.delete(`${BaseUrl()}api/v1/`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
    } catch (error) {
  
    }
  }
    
  
    // Pagination
    const [currentPage2, setCurrentPage2] = useState(1);
    const [postPerPage2] = useState(10);
    const lastPostIndex2 = currentPage2 * postPerPage2;
    const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  
    let pages2 = [];
  
    const TotolData = query
      ? seller?.filter(
          (i) =>
            i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
            i?.sellerName
              ?.toString()
              ?.toLowerCase()
              .includes(query?.toLowerCase())
        )
      : seller;
  
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
        <p className="headP"><Link to='/dashboard'>Dashboard</Link> / {name} /  Product  </p>
  
        <div
          className="pb-4  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All {name} Product's ( Total : {seller?.length} )
          </span>
        </div>
  
        <section className="sectionCont">
          {seller?.length === 0 || !seller ? (
            <SpinnerComp />
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Start typing to search for products"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
  
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Reviews</th>
                      <th>Discount</th>
                      <th>Total Stock</th>
                      <th>Price</th>
                      <th>Discounted Price</th>
                      <th>  </th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td> {index + 1} </td>
                        <td>
                          <img src={i.img} alt="" style={{ width: "60px" }} />
                        </td>
                        <td>{i.name}</td>
                        <td>{i.review}</td>
                        <td>{i.discount}</td>
                        <td>{i.stock}</td>
                        <td>{i.price}</td>
                        <td>{i.discountedPrice}</td>
                        <td style={{ textAlign: "center" }}>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="2">
                                  <div className="two_Sec_Div">
                                    <i className="fa-solid fa-eye"></i>
                                    <Link to={`/product/${i.name}`}>
                                      <p>View Product</p>
                                    </Link>
                                  </div>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <div className="two_Sec_Div">
                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                    <p onClick={()=>handleDelete(i._id)}>Delete Product</p>
                                  </div>
                                </Menu.Item>
                              </Menu>
                            }
                            trigger={["click"]}
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
  
                <div className="pagination">
                  <button onClick={() => Prev()} className="prevBtn">
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
                    <button onClick={() => Next()} className="nextBtn">
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


export default HOC(SellerProducts)