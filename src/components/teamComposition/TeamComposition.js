import React from "react";
import Table from "react-bootstrap/Table";

function TeamComposition({ team_members }) {
  return (
    <div>
      <div className=" mt-5 border p-2">
        <h3>Team Composition</h3>
        <hr></hr>
        <Table responsive="lg" striped hover>
          <thead style={{ fontSize: "0.9rem" }}>
            <tr>
              <th>Employee Id</th>
              <th>Role</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Status</th>
              <th>Billing status</th>
              <th>Exposed to customer</th>
              <th>Allocation Type</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {team_members?.map((memberObj) => (
              <tr key={memberObj.resource_id}>
                <td>{memberObj.resource_id}</td>
                <td>{memberObj.role}</td>
                <td>{memberObj.start_date}</td>
                <td>{memberObj.end_date}</td>
                <td>{memberObj.status}</td>
                <td>{memberObj.billing_status}</td>
                <td>{memberObj.exposed_to_customer ? "Yes" : "No"}</td>
                <td>{memberObj.allocation_type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TeamComposition;
