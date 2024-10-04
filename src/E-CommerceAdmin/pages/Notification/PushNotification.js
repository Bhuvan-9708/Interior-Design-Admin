/** @format */

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import HOC from "../../layout/HOC";
import BreadCamp from "../Component/BreadCamp";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";

const PushNotification = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modelEdit, setModelEdit] = useState(false);
  const [id,setId]=useState("")
  const [massage,setMassage]=useState("")
  // const data = [
  //   {
  //     name: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content",
  //   },
  //   {
  //     name: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content",
  //   },
  // ];

   //api calling
   const [data, setData] = useState([]);
   const getProducts = async() => {

     let url = `${BaseUrl()}api/v1/notify`;
     try {
       const res = await axios.get(url, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });

       setData(res.data.message);

     } catch (error) {

     }
   }
   
 
   useEffect(() => {  
     getProducts();    
   }, []);

  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter((i) => i?.message?.toLowerCase().includes(query?.toLowerCase()))
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

  function MyVerticallyCenteredModal(props) {
    const [massagePost,setMassagePost]=useState("");

    const handlePost=async(e)=>{
      e.preventDefault()
      const formdata=new FormData()
      formdata.append("message",massagePost);

      try {
        const res=await axios.post(`${BaseUrl()}api/v1/notify`,formdata,{
          headers:{
            Authorization:`Bearer ${localStorage.get("token")}`
          }
        })
        getProducts();
        setModalShow();
      } catch (error) {
   
      }
    }
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {"Add"} Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePost}>
            <Form.Group className="mb-3">
              <Form.Label>Notification</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  row={3}
                  style={{ height: "100px" }}
                  value={massagePost}
                  onChange={(e)=>setMassagePost(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handleEdit=(i)=>{
    setId(i._id);
    setMassage(i.message)
    setModelEdit(true);
  }

  function MyVerticallyCenteredModalEdit(props) {
    const [mass,setMass]=useState(massage)

    const handleSubmit=async()=>{
      const formdata=new FormData()
      formdata.append("message",mass);

      try {
        const res=await axios.put(`${BaseUrl()}api/v1/notify/${id}`,formdata,{
          headers:{
            Authorization:`Bearer ${localStorage.get("token")}`
          }
        })
      } catch (error) {
        
      }
    }

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {"Edit"} Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Notification</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  row={3}
                  placeholder="Leave a comment here"
                  value={mass}
                  onChange={(e)=>setMass(e.target.value)}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModalEdit 
      show={modelEdit}
      onHide={()=>setModelEdit(false)}/>

      <BreadCamp name='Notification' />

      <div
        className="pb-4   w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Notification (Total : {data.length})
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
        >
          Add Notification
        </button>
      </div>
      <section className="sectionCont">
        {data?.length === 0 || !data ? (
          <Alert>No Data Found</Alert>
        ) : (
          <>
            {/* Filter */}
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Search By Message "
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Message</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td> {i.message} </td>
                      <td>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item key="2">
                                <div
                                  className="two_Sec_Div"
                                  onClick={() => {
                                    handleEdit(i)
                                  }}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>

                                  <p>Edit </p>
                                </div>
                              </Menu.Item>
                              <Menu.Item key="3">
                                <div className="two_Sec_Div">
                                  <i className="fa-sharp fa-solid fa-trash"></i>
                                  <p>Delete </p>
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
            </div>
            {/* Pagination */}
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
                className={currentPage2 === pages2?.length ? "activePage" : ""}
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
          </>
        )}
      </section>
    </>
  );
};

export default HOC(PushNotification);
