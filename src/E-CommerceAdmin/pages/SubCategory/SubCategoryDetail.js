/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC.jsx";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import BreadCamp from "../Component/BreadCamp.js";
import axios from "axios";
import BaseUrl from "../../../BaseUrl.jsx";
import { nofification } from "../../utils/utils.js";
import { FaFilePdf } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ESubCategory = () => {
  const {id} = useParams()
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [data, setData] = useState([]);
  const [currentStatus,setCurrentStatus]=useState("")


  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl()}api/career/applications/${id}/status-history`
      );
      setCurrentStatus(data?.data?.currentStatus)
      setData(data?.data?.history);
      
    } catch (e) {
     
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 

  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter((i) =>
        [
        
          i?.status,
          i?.message,
          i?.date.slice(0, 10),
         
        ].some((field) => field?.toLowerCase().includes(query?.toLowerCase()))
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

  function MyVerticallyCenteredModal(props) {
    const [adminMessage, setAdminMessage] = useState("");
    const [status, setStatus] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${BaseUrl()}api/career/applications/${id}/reply`,
          {
            adminMessage,
            status,
          }
        );
        nofification("Mail send applicant Successfully", "success");
        props.onHide();
      } catch (e) {
   
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? "Send Application in Response to Applicant" : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Send Message</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>-- Select Status --</option>
              <option value={"pending"}>Pending</option>
              <option value={"reviewed"}>Reviewed</option>
              <option value={"processed"}>Processed</option>
              <option value={"rejected"}>Rejected</option>
            </Form.Select>

            <Button
              style={{
                backgroundColor: "#19376d",
                borderRadius: "0",
                border: "1px solid #19376d",
              }}
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

      <section>
        <BreadCamp name="Career" />
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Career's ( Total : {data?.length} )
          </span>
          {/* <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Career
          </button> */}
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Career Not Found</Alert>
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Search By Category Name"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <h5 style={{fontWeight:"bold"}}>Apllicants Status :  {currentStatus.toUpperCase()}</h5>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Status</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{`${i?.status}`} </td>
                        <td> {i?.message} </td>
                        <td> {i?.date?.slice(0, 10)} </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
      </section>
    </>
  );
};

export default HOC(ESubCategory);
