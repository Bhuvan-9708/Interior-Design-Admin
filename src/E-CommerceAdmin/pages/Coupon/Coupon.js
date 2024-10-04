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

const ProjectAdmin = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [editData, setEditData] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const getProjects = async () => {
    let url = `${BaseUrl()}api/project/projects`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });

      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const getProjectTypes = async () => {
    try {
      const res = await axios.get(`${BaseUrl()}api/project/project-types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });
      setProjectTypes(res.data.data);
    } catch (error) {
      console.error("Error fetching project types:", error);
    }
  };

  useEffect(() => {
    getProjects();
    getProjectTypes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl()}api/project/delete-project/${id}`);
      getProjects();
      nofification("Project Deleted Successfully", "danger");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
        i?.projectName?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.projectShortDescription?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.projectType?.project_type?.toLowerCase().includes(query?.toLowerCase()) ||
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
    const [projectName, setProjectName] = useState("");
    const [projectShortDescription, setProjectShortDescription] = useState("");
    const [selectedProjectType, setSelectedProjectType] = useState("");
    const [newProjectType, setNewProjectType] = useState({ project_type: "", type_description: "" });
    const [projectImage, setProjectImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [id, setId] = useState("");
    const [sections, setSections] = useState({
      mainHeading: "",
      sub_sections_one: { title: "", description: "" },
      sub_sections_two: { title: "", description: "" },
      sub_sections_three: { title: "", description: "" },
    });
    const [gallery, setGallery] = useState({
      heading: "",
      subheading: "",
      images: [],
    });
    const [newGalleryImages, setNewGalleryImages] = useState([]);
    const [projectDetails, setProjectDetails] = useState({
      heading: "",
      subheading: "",
      videoURL: "",
    });
    const [additionalMedia, setAdditionalMedia] = useState({
      title: "",
      headingDescription: "",
      description: "",
      videoLink: "",
    });

    useEffect(() => {
      if (edit) {
        setId(editData?._id);
        setProjectName(editData?.projectName);
        setProjectShortDescription(editData?.projectShortDescription);
        setSelectedProjectType(editData?.projectType?._id || "");
        setProjectImage(editData?.projectImage);
        setImagePreview(editData?.projectImage);
        setSections(editData?.sections);
        setGallery({
          heading: editData?.gallery?.heading || "",
          subheading: editData?.gallery?.subheading || "",
          images: editData?.gallery?.images || [],
        });
        setNewGalleryImages([]);
        setProjectDetails(editData?.projectDetails);
        setAdditionalMedia(editData?.additionalMedia);
      } else {
        resetForm();
      }
    }, [edit, editData]);

    const resetForm = () => {
      setProjectName("");
      setProjectShortDescription("");
      setSelectedProjectType("");
      setNewProjectType({ project_type: "", type_description: "" });
      setProjectImage("");
      setImagePreview(null);
      setSections({
        mainHeading: "",
        sub_sections_one: { title: "", description: "" },
        sub_sections_two: { title: "", description: "" },
        sub_sections_three: { title: "", description: "" },
      });
      setGallery({ heading: "", subheading: "", images: [] });
      setNewGalleryImages([]);
      setProjectDetails({ heading: "", subheading: "", videoURL: "" });
      setAdditionalMedia({ title: "", headingDescription: "", description: "", videoLink: "" });
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProjectImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleGalleryImagesChange = (e) => {
      const files = Array.from(e.target.files);
      setNewGalleryImages((prev) => [...prev, ...files]);
    };

    const removeGalleryImage = (index, isExisting = false) => {
      if (isExisting) {
        setGallery((prev) => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index),
        }));
      } else {
        setNewGalleryImages((prev) => prev.filter((_, i) => i !== index));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("projectShortDescription", projectShortDescription);

      // Handle project type
      if (selectedProjectType === "new") {
        if (!newProjectType.project_type || !newProjectType.type_description) {
          nofification("Project type and description are required", "error");
          return;
        }
        // Append new project type fields separately
        formData.append("projectType", newProjectType.project_type);
        formData.append("type_description", newProjectType.type_description);
      } else {
        // Append existing project type ID
        formData.append("projectType", selectedProjectType);
      }

      formData.append("projectImage", projectImage);
      formData.append("sections", JSON.stringify(sections));
      formData.append("gallery", JSON.stringify({ heading: gallery.heading, subheading: gallery.subheading }));

      newGalleryImages.forEach((image) => {
        formData.append("galleryImages", image);
      });

      formData.append("projectDetails", JSON.stringify(projectDetails));
      formData.append("additionalMedia", JSON.stringify(additionalMedia));

      try {
        if (edit) {
          await axios.put(`${BaseUrl()}api/project/update-project/${id}`, formData);
          nofification("Project Updated Successfully", "success");
        } else {
          await axios.post(`${BaseUrl()}api/project/create-project`, formData);
          nofification("Project Added Successfully", "success");
        }
        getProjects();
        getProjectTypes();
        props.onHide();
        resetForm();
      } catch (error) {
        console.error("Error submitting project:", error);
        nofification(error.response?.data?.message || "Failed to submit project", "error");
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
            {edit ? "Edit Project" : "Add Project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Image</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                value={projectName}
                type="text"
                required
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Short Description</Form.Label>
              <Form.Control
                value={projectShortDescription}
                type="text"
                required
                onChange={(e) => setProjectShortDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Type</Form.Label>
              <Form.Select
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
                required
              >
                <option value="">Select existing or create new</option>
                {projectTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.project_type}
                  </option>
                ))}
                <option value="new">Create New Project Type</option>
              </Form.Select>
            </Form.Group>
            {selectedProjectType === "new" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>New Project Type</Form.Label>
                  <Form.Control
                    value={newProjectType.project_type}
                    type="text"
                    required
                    onChange={(e) => setNewProjectType({ ...newProjectType, project_type: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Type Description</Form.Label>
                  <Form.Control
                    value={newProjectType.type_description}
                    type="text"
                    required
                    onChange={(e) => setNewProjectType({ ...newProjectType, type_description: e.target.value })}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Sections</Form.Label>
              <Form.Control
                value={sections.mainHeading}
                type="text"
                placeholder="Main Heading"
                required
                onChange={(e) => setSections({ ...sections, mainHeading: e.target.value })}
              />
              {['one', 'two', 'three'].map((num) => (
                <div key={num}>
                  <Form.Control
                    value={sections[`sub_sections_${num}`].title}
                    type="text"
                    placeholder={`Sub Section ${num} Title`}
                    required
                    onChange={(e) => setSections({
                      ...sections,
                      [`sub_sections_${num}`]: { ...sections[`sub_sections_${num}`], title: e.target.value }
                    })}
                  />
                  <Form.Control
                    value={sections[`sub_sections_${num}`].description}
                    as="textarea"
                    placeholder={`Sub Section ${num} Description`}
                    required
                    onChange={(e) => setSections({
                      ...sections,
                      [`sub_sections_${num}`]: { ...sections[`sub_sections_${num}`], description: e.target.value }
                    })}
                  />
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gallery</Form.Label>
              <Form.Control
                value={gallery.heading}
                type="text"
                placeholder="Gallery Heading"
                required
                onChange={(e) => setGallery({ ...gallery, heading: e.target.value })}
              />
              <Form.Control
                value={gallery.subheading}
                type="text"
                placeholder="Gallery Subheading"
                required
                onChange={(e) => setGallery({ ...gallery, subheading: e.target.value })}
              />
              <Form.Control
                type="file"
                multiple
                onChange={handleGalleryImagesChange}
              />
              <div className="gallery-preview">
                {gallery.images.map((image, index) => (
                  <div key={index} className="gallery-image">
                    <img src={image} alt={`Gallery ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    <button type="button" onClick={() => removeGalleryImage(index, true)}>Remove</button>
                  </div>
                ))}
                {newGalleryImages.map((image, index) => (
                  <div key={`new-${index}`} className="gallery-image">
                    <img src={URL.createObjectURL(image)} alt={`New Gallery ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    <button type="button" onClick={() => removeGalleryImage(index)}>Remove</button>
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Details</Form.Label>
              <Form.Control
                value={projectDetails.heading}
                type="text"
                placeholder="Project Details Heading"
                required
                onChange={(e) => setProjectDetails({ ...projectDetails, heading: e.target.value })}
              />
              <Form.Control
                value={projectDetails.subheading}
                type="text"
                placeholder="Project Details Subheading"
                required
                onChange={(e) => setProjectDetails({ ...projectDetails, subheading: e.target.value })}
              />
              <Form.Control
                value={projectDetails.videoURL}
                type="text"
                placeholder="Project Details Video URL"
                onChange={(e) => setProjectDetails({ ...projectDetails, videoURL: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Additional Media</Form.Label>
              <Form.Control
                value={additionalMedia.title}
                type="text"
                placeholder="Additional Media Title"
                required
                onChange={(e) => setAdditionalMedia({ ...additionalMedia, title: e.target.value })}
              />
              <Form.Control
                value={additionalMedia.headingDescription}
                type="text"
                placeholder="Additional Media Heading Description"
                required
                onChange={(e) => setAdditionalMedia({ ...additionalMedia, headingDescription: e.target.value })}
              />
              <Editor
                value={additionalMedia.description}
                onTextChange={(e) => setAdditionalMedia({ ...additionalMedia, description: e.htmlValue })}
                style={{ height: "200px" }}
              />
              <Form.Control
                value={additionalMedia.videoLink}
                type="text"
                placeholder="Additional Media Video Link"
                onChange={(e) => setAdditionalMedia({ ...additionalMedia, videoLink: e.target.value })}
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
              {edit ? "Update" : "Submit"}
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
        <BreadCamp name="Projects" />
        <div
          className="pb-4 w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Projects ( Total : {data?.length} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Project
          </button>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Projects Not Found</Alert>
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Search By Project Name, Description, Type"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Image</th>
                      <th>Project Name</th>
                      <th>Short Description</th>
                      <th>Project Type</th>
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
                            src={i?.projectImage}
                            alt=""
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{i?.projectName} </td>
                        <td>{i?.projectShortDescription} </td>
                        <td>{i?.projectType?.project_type || 'N/A'}</td>
                        <td> {i.createdAt ? new Date(i.createdAt).toLocaleDateString() : 'N/A'}</td>

                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="1">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => navigate(`/viewproject/${i?._id}`)}
                                  >
                                    <i className="fa-solid fa-eye"></i>
                                    <p>View Project</p>
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

export default HOC(ProjectAdmin);