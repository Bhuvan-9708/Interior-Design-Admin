/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import BreadCamp from "../Component/BreadCamp";
import axios from "axios";
import BaseUrl from "../../../BaseUrl";
import { nofification } from "../../utils/utils.js";
import { useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";

const ECategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  //api calling
  const [data, setData] = useState([]);
  const getProducts = async () => {
    let url = `${BaseUrl()}api/blogs/get-all-blog`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });

      setData(res.data.data);
    } catch (error) { }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl()}api/blogs/delete-blog/${id}`);
      getProducts();
      nofification("Blogs Deleted Successfully", "danger");
    } catch (error) { }
  };

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
        i?.title?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.content?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.createdAt
          ?.slice(0, 10)
          ?.toLowerCase()
          .includes(query?.toLowerCase())
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
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [id, setId] = useState("");
    const [short_desc, setShort_desc] = useState("")

    useEffect(() => {
      if (edit) {
        setId(editData?._id);
        setTitle(editData?.title);
        setContent(editData?.content);
        setImage(editData?.blog_image);
        setShort_desc(editData?.short_desc);
        setImagePreview(editData?.blog_image);
      }
    }, [edit, editData]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("blog_image", image);
      formData.append("short_desc", short_desc);
      axios
        .post(`${BaseUrl()}api/blogs/create-blog?`, formData)
        .then((res) => {
          getProducts();
          nofification("Blogs Added Successfully", "success");
          props.onHide();
        })
        .catch((err) => { });
    };

    const handleEdit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("blog_image", image);
      formData.append("short_desc", short_desc);
      axios
        .put(`${BaseUrl()}api/blogs/update-blog/${id}`, formData)
        .then((res) => {
          getProducts();
          nofification("Blogs Updated Successfully", "success");
          props.onHide();
        })
        .catch((err) => { });
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
            {edit ? "Edit Blogs" : " Add Blogs"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleEdit : handleSubmit}>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                  {...(edit ? {} : { required: true })}
                />
              </Form.Group>
              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>

              <Form.Control
                value={title}
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>

              <Form.Control
                value={short_desc}
                type="text"
                required
                onChange={(e) => setShort_desc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Editor
                value={content}
                onTextChange={(e) => setContent(e.htmlValue)}
                style={{ height: "200px" }}
              />
            </Form.Group>

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
        <BreadCamp name="Blogs" />
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Blogs's ( Total : {data?.length} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Blogs
          </button>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Blogs Not Found</Alert>
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Search By Blogs Title, Content"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>CreatedAt</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img
                            src={i?.blog_image}
                            alt=""
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{i?.title} </td>
                        <td>{i?.short_desc} </td>


                        <td> {i.createdAt.slice(0, 10)}</td>

                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="1">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => navigate(`/viewblogs/${i?.slug}`)}
                                  >
                                    <i className="fa-solid fa-eye"></i>

                                    <p>View Blog</p>
                                  </div>
                                </Menu.Item>
                                <Menu.Item key="2">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => {
                                      setEdit(true);
                                      setModalShow(true);
                                      setEditData(i);
                                    }}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>

                                    <p>Edit </p>
                                  </div>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <div className="two_Sec_Div">
                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                    <p onClick={() => handleDelete(i?._id)}>
                                      Delete{" "}
                                    </p>
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

export default HOC(ECategory);
