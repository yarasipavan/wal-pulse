import React from "react";
import Table from "react-bootstrap/Table";

function ProjectConcerns({ project_concerns }) {
  return (
    <div className=" mt-5 border p-2 mb-5">
      <h3>Project Concerns</h3>
      <hr></hr>
      <Table responsive="lg" striped hover>
        <thead style={{ fontSize: "0.9rem" }}>
          <tr>
            <th>Concern Id</th>
            <th>Concern Description</th>
            <th>Raised By</th>
            <th>Raised On</th>
            <th>Severity</th>
            <th>status</th>
            <th>Is Raised Internally</th>
            <th>Mitigated On</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.9rem" }}>
          {project_concerns?.map((concernObj) => (
            <tr key={concernObj.id}>
              <td>{concernObj.id}</td>
              <td>{concernObj.concern_description}</td>
              <td>{concernObj.raised_by}</td>
              <td>{concernObj.concern_raised_on.split("T")[0]}</td>
              <td>{concernObj.severity}</td>
              <td>{concernObj.status}</td>
              <td>{concernObj.is_concern_raised_internally ? "Yes" : "No"}</td>
              <td>{concernObj.mitigated_on ? concernObj.mitigated_on : "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProjectConcerns;
