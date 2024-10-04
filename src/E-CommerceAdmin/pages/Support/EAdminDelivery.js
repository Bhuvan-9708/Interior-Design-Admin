/** @format */

import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { Dropdown, Menu } from "antd";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { nofification } from "../../utils/utils.js";
const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState("");

  const [data, setData] = useState([]);
  const getProducts = async () => {
    let url = `${BaseUrl()}api/contactinfo/get-contact-info`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });
      setData(res?.data?.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${BaseUrl()}api/contactinfo/delete-contact-info/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("boon")}`,
          },
        }
      );
      nofification("Help & Support Deleted Successfully", "success");
      getProducts();
    } catch (e) {
      
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
        email,
        address,
      };
      let url = `${BaseUrl()}api/contactinfo/create-contact-info`;
      try {
        const res = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        nofification("Help & Support Added Successfully", "success");
        getProducts();
        setModalShow(false);
      } catch (error) {
        
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Reply Help & Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Admin Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
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

      <section>
        <p className="headP">Dashboard / Help & Support </p>

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Help & Support
          </span>

          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Help and Support
          </button>
        </div>
        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Help and Support Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data?.email}</td>
                      <td>{data?.address}</td>
                      <td>
                        <MdDelete
                          size={25}
                          onClick={() => deleteHandler(data?._id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
