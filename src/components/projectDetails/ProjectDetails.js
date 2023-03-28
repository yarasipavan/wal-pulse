import React from "react";
import "./ProjectDetails.css";

function ProjectDetails({ detailedView }) {
  return (
    <div>
      <div className="mt-5 border p-2">
        <div className="col-12 col-md-12 col-lg-12 ">
          <h3>Project Details</h3>
          <hr></hr>

          <div className="row">
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Project Id:
                <span className="filed-value">{detailedView.project_id}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Project Name:
                <span className="filed-value">{detailedView.project_name}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Client:
                <span className="filed-value">
                  {detailedView.client_account}
                </span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Client:
                <span className="filed-value">
                  {detailedView.client_account}
                </span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Account Manager:
                <span className="filed-value">
                  {detailedView.account_manager_id}
                </span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Status:
                <span className="filed-value">{detailedView.status}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Start date:
                <span className="filed-value">{detailedView.start_date}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                End date:
                <span className="filed-value">{detailedView.end_date}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Fitness:
                <span className="filed-value">{detailedView.fitness}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Domain:
                <span className="filed-value">{detailedView.domain}</span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Type:
                <span className="filed-value">
                  {detailedView.type_of_project}
                </span>
              </p>
            </div>
            <div className="col-12  col-md-6 col-lg-3 ">
              <p className="field-heading">
                Team Size:
                <span className="filed-value">
                  {detailedView?.team_members?.length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
