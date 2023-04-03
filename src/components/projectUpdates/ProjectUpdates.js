import React from "react";
import Table from "react-bootstrap/Table";

function ProjectUpdates({ project_updates }) {
  return (
    <div className=" mt-5 border p-2">
      <h3>Project Updates</h3>
      <hr></hr>
      <Table responsive="lg" striped hover>
        <thead style={{ fontSize: "0.9rem" }}>
          <tr>
            <th>Update Id</th>
            <th>Update</th>
            <th>Quality Status</th>
            <th>Resource Status</th>
            <th>Schedule Status</th>
            <th>Date</th>
            <th>Waiting for Client Inputs</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.9rem" }}>
          {project_updates?.map((updateObj) => (
            <tr key={updateObj.id}>
              <td>{updateObj.id}</td>
              <td>{updateObj.update_description}</td>
              <td>{updateObj.quality_status}</td>
              <td>{updateObj.resourcing_status}</td>
              <td>{updateObj.schedule_status}</td>
              <td>{updateObj.date.split("T")[0]}</td>

              <td>{updateObj.waiting_for_client_inputs ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProjectUpdates;
