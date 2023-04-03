import React, { useState, memo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { logout } from "../../slices/loginSlice";

import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function AllProjects({
  type,
  projects,
  employees,
  gdoHeads,
  projectManagers,
  getProjects,
}) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();

  //state
  // let [message, setMessage] = useState([]);
  let [errorMessage, setErrorMessage] = useState([]);

  const getDetailedView = (project_id, project_name) => {
    navigate(`detailed-view?project_name=${project_name}`, {
      state: { project_id: project_id, type: type },
    });
  };

  //modal state
  let [showModal, setShowModal] = useState(0);

  const openModel = () => {
    setShowModal(1);
  };
  const closeModel = () => {
    setShowModal(0);
  };

  //function to eddit project
  const editProject = (projectObj) => {
    //open the model
    openModel();
    //set values in the model
    setValue("project_id", projectObj.project_id);
    setValue("project_name", projectObj.project_name);
    setValue("client_account", projectObj.client_account);
    setValue("account_manager_id", projectObj.account_manager_id);
    setValue("gdo_head_id", projectObj.gdo_head_id);
    setValue("project_manager_id", projectObj.project_manager_id);
    setValue("fitness", projectObj.fitness);
    setValue("status", projectObj.status);

    setValue("end_date", projectObj.end_date);
  };

  const saveProject = async () => {
    let token = localStorage.getItem("token");
    let updatedProject = getValues();
    // if end date is null remove from the  obj
    if (!updatedProject.end_date) delete updatedProject.end_date;

    try {
      //update the details in db
      let res = await axios.put(
        `http://localhost:4000/admin-user/modify-project/project_id/${updatedProject.project_id}`,
        updatedProject,
        { headers: { Authorization: `bearer ${token}` } }
      );
      //close the model
      reset();
      getProjects();
      closeModel();
    } catch (err) {
      if (err.response.status == 401) {
        dispatch(logout());
        navigate("/");
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  console.log("All projects renders");

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>Projects Portfolio</h4>
        </Accordion.Header>
        <Accordion.Body>
          {projects?.length === 0 ? (
            <p>No Projects</p>
          ) : (
            <>
              <p className="text-danger">
                Click at anywhere on the project details to get detailed view of
                particular project
              </p>
              <Table responsive="lg" striped hover className="text-center">
                <thead style={{ fontSize: "0.9rem" }}>
                  <tr>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Account Manager</th>
                    <th>GDO Head</th>
                    <th>Project Maganer</th>
                    <th>Fitness</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {type === "admin-user" && <th>Edit</th>}
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.9rem" }}>
                  {projects?.map((projectObj, index) => (
                    <tr key={index} style={{ cursor: "pointer" }}>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.project_id}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.project_name}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.client_account}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.account_manager_id}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.gdo_head_id}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.project_manager_id}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.fitness}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.status}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.start_date.split("T")[0]}
                      </td>
                      <td
                        onClick={() => {
                          getDetailedView(
                            projectObj.project_id,
                            projectObj.project_name
                          );
                        }}
                      >
                        {projectObj.end_date
                          ? projectObj.end_date.split("T")[0]
                          : "-"}
                      </td>
                      {type === "admin-user" && (
                        <td>
                          <button className="btn btn-warning">
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              onClick={() => editProject(projectObj)}
                            />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* model for update */}
              {type === "admin-user" && (
                <Modal
                  show={showModal}
                  onHide={closeModel}
                  backdrop={"static"}
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                  </Modal.Header>
                  <form
                    className="text-start   p-3 "
                    style={{ borderRadius: "20px" }}
                    onSubmit={handleSubmit(saveProject)}
                  >
                    <Modal.Body>
                      <div className="row">
                        <div className="col-12 col-md-6  col-lg-4">
                          {/* project id */}
                          <div className="mt-3">
                            <input
                              type="text"
                              className="form-control"
                              id="project_id"
                              hidden
                              {...register("project_id")}
                            />
                          </div>

                          {/* project name */}
                          <div className="mt-3">
                            <label className="mb-1" htmlFor="project_name">
                              Project Name
                            </label>
                            <input
                              type="text"
                              placeholder="Project name"
                              className="form-control"
                              id="project_name"
                              disabled
                              {...register("project_name")}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6  col-lg-4">
                          {/* client */}
                          <div className="mt-3">
                            <label className="mb-1" htmlFor="client_account">
                              Client
                            </label>
                            <input
                              type="text"
                              placeholder="Client"
                              className="form-control"
                              {...register("client_account", {
                                required: true,
                              })}
                            />
                            {errors.client_account?.type === "required" && (
                              <p className="text-danger">Mention the client</p>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-6  col-lg-4">
                          {/* account manager id */}
                          <div className="mt-3">
                            <label
                              className="mb-1"
                              htmlFor="account_manager_id"
                            >
                              Account manager
                            </label>
                            <select
                              className="form-control mt-1"
                              {...register("account_manager_id", {
                                required: true,
                              })}
                            >
                              <option value=""> -- select -- </option>
                              {employees.map((empObj) => (
                                <option
                                  value={empObj.emp_id}
                                  key={empObj.emp_id}
                                >
                                  {empObj.name} - {empObj.emp_id}
                                </option>
                              ))}
                            </select>
                            {errors.account_manager_id?.type === "required" && (
                              <p className="text-danger">
                                Please select the account manager
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-6  col-lg-4">
                          {/*GDO HEAD */}
                          <div className="mt-3">
                            <label className="mb-1" htmlFor="gdo_head_id">
                              GDO Head
                            </label>
                            <select
                              className="form-control mt-1"
                              id="gdo_head_id"
                              {...register("gdo_head_id", { required: true })}
                            >
                              <option value=""> -- select -- </option>
                              {gdoHeads.map((gdoObj) => (
                                <option
                                  value={gdoObj.emp_id}
                                  key={gdoObj.emp_id}
                                >
                                  {gdoObj.name} - {gdoObj.emp_id}
                                </option>
                              ))}
                            </select>
                            {errors.gdo_head_id?.type === "required" && (
                              <p className="text-danger">
                                Please select the GDO Head
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6  col-lg-4">
                          {/*Project Manager */}
                          <div className="mt-3">
                            <label
                              className="mb-1"
                              htmlFor="project_manager_id"
                            >
                              Project Manager
                            </label>
                            <select
                              className="form-control mt-1"
                              id="project_manager_id"
                              {...register("project_manager_id", {
                                required: true,
                              })}
                            >
                              <option value=""> -- select -- </option>
                              {projectManagers.map((managerObj) => (
                                <option
                                  value={managerObj.emp_id}
                                  key={managerObj.emp_id}
                                >
                                  {managerObj.name} - {managerObj.emp_id}
                                </option>
                              ))}
                            </select>
                            {errors.project_manager_id?.type === "required" && (
                              <p className="text-danger">
                                Please select the project manager
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6  col-lg-4">
                          {/* fitness */}
                          <div className="mt-3">
                            <label className="mb-1" htmlFor="fitness">
                              Fitness
                            </label>
                            <select
                              className="form-control"
                              {...register("fitness", { required: true })}
                            >
                              <option value=""></option>
                              <option value="green">Green</option>
                              <option value="amber">Amber</option>
                              <option value="red">Red</option>
                            </select>
                            {errors.fitness?.type === "required" && (
                              <p className="text-danger">
                                Enter fitness of the project
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6  col-lg-4">
                          {/* status */}
                          <div className="mt-3">
                            <label className="mb-1" htmlFor="status">
                              Status of the project
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="domain"
                              id="status"
                              {...register("status", { required: true })}
                            />
                            {errors.status?.type === "required" && (
                              <p className="text-danger">
                                Enter status of the project
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-6  col-lg-4">
                          {/* project end data */}
                          <div className="mt-3">
                            <label className="mb-1" htmlFor="end_date">
                              Project end date (optional)
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              {...register("end_date")}
                            />
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </form>
                  <p className="text-danger text-center">{errorMessage}</p>
                </Modal>
              )}
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default memo(AllProjects);
