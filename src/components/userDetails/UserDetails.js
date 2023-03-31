import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function UserDetails({ users, getAllUsers, getnewUsers }) {
  //state
  let [message, setMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  let {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  //modal state
  let [showModal, setShowModal] = useState(0);

  const openModel = () => {
    setShowModal(1);
  };
  const closeModel = () => {
    setShowModal(0);
  };

  const editUser = (userObj) => {
    openModel();
    setValue("emp_id", userObj.emp_id);
    setValue("name", userObj.name);
    setValue("email", userObj.email);
    setValue("status", userObj.status);
    setValue("user_type", userObj.user_type);
  };

  //update user
  const saveUser = async () => {
    let token = localStorage.getItem("token");
    let modifiedUser = getValues();
    console.log(modifiedUser);
    if (modifiedUser.user_type == "") {
      modifiedUser.user_type = null;
    }

    try {
      //update the details in db
      let res = await axios.put(
        `http://localhost:4000/super-admin/employee/${modifiedUser.emp_id}`,
        modifiedUser,
        { headers: { Authorization: `bearer ${token}` } }
      );
      //close the model
      closeModel();
      getAllUsers();
      getnewUsers();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  //delete user
  const deleteUser = async (emp_id) => {
    let token = localStorage.getItem("token");
    let res = await axios.delete(
      `http://localhost:4000/super-admin/employee/${emp_id}`,
      { headers: { Authorization: `bearer ${token}` } }
    );
    getAllUsers();
    getnewUsers();
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>user Details</h4>
        </Accordion.Header>
        <Accordion.Body>
          {users.length === 0 ? (
            <p>No Users</p>
          ) : (
            <>
              <Table responsive="lg" striped hover className="text-center">
                <thead style={{ fontSize: "0.9rem" }}>
                  <tr>
                    <th>Employee Id</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.9rem" }}>
                  {users.map((userObj, index) => (
                    <tr key={userObj.emp_id}>
                      <td>{userObj.emp_id}</td>
                      <td>{userObj.name}</td>
                      <td>{userObj.email}</td>
                      <td>{userObj.user_type}</td>
                      <td>{userObj.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => editUser(userObj)}
                        >
                          <FontAwesomeIcon icon={faUserPen} />
                        </button>
                      </td>
                      <td>
                        {userObj.status ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUser(userObj.emp_id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* modal */}
              <Modal show={showModal} onHide={closeModel} backdrop={"static"}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <form
                  className="text-start   p-3 "
                  style={{ borderRadius: "20px" }}
                  onSubmit={handleSubmit(saveUser)}
                >
                  <Modal.Body>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        hidden
                        {...register("emp_id")}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        disabled
                        {...register("email")}
                      />
                    </div>

                    {/* name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("name", { required: true })}
                      />
                      {errors.name?.type === "required" && (
                        <p className="text-danger">Enter name</p>
                      )}
                    </div>
                    {/* role */}
                    <div className="mb-3">
                      <label
                        htmlFor="user_type"
                        id="user_type"
                        className="mb-1"
                      >
                        Role
                      </label>

                      <select
                        className="form-control mb-1"
                        {...register("user_type")}
                      >
                        <option value="">--select role--</option>
                        <option value="PROJECT-MANAGER">Project Manager</option>
                        <option value="GDO-HEAD"> GDO Head </option>
                        <option value="HR"> HR </option>
                        <option value="ADMIN-USER"> Admin User </option>
                        <option value="SUPER-ADMIN">Super Admin</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="mb-1">
                        Status
                      </label>
                      <select
                        className="form-control"
                        {...register("status", { required: true })}
                      >
                        <option value="">--select status--</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                      {errors.status?.type === "required" && (
                        <p className="text-danger">select Status</p>
                      )}
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
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default UserDetails;
