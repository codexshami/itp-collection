import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Context } from "../main";
const Pres = () => {
  const { date } = useParams();
  const [pres, setPres] = useState([]);
  useEffect(() => {
    const getUserPres = async () => {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/pres/getUserPres/${date}`,
          { withCredentials: true }
        );
        setPres(data.data.pres);
        console.log(data.data.pres);
      } catch (error) {
        setPres([]);
        console.log("Error occured while retrieving the data", error);
      }
    };
    getUserPres();
  }, []);

  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <div>
        <h1 style={{ marginTop: "100px", paddingLeft: "45px" }}>
          Prescriptions for {date}
        </h1>
        {/* Render your prescriptions here */}
        {pres.length > 0 ? (
          pres.map((prescription) => (
            <div key={prescription._id}>
              {/* Display prescription details */}
            </div>
          ))
        ) : (
          <p style={{ marginLeft: "50px" }}>
            No prescriptions found for this date.
          </p>
        )}
      </div>
      <section className="dashboard page" style={{ marginTop: "30px" }}>
        <div className="banner" style={{ paddingTop: "10px" }}>
          <table
            border={1}
            style={{
              tableLayout: "auto",
              width: "100%",
              height: "75px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Disease</th>
                <th>BP</th>
                <th>Weight</th>
                <th>Medicenes</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {pres && pres.length > 0 ? (
                pres.map((pre) => (
                  <tr key={pre._id}>
                    <td>{`${pre.firstName} ${pre.lastName}`}</td>
                    <td>{pre.appointment_date.substring(0, 16)}</td>
                    <td>{`${pre.doctor.firstName} ${pre.doctor.lastName}`}</td>
                    <td>{pre.department}</td>
                    <td>
                      <div
                        className={
                          pre.status === "Pending"
                            ? "value-pending"
                            : pre.status === "Accepted"
                            ? "value-accepted"
                            : pre.status === "Done"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                      >
                        {pre.status}
                      </div>
                    </td>
                    <td>{pre.disease}</td>
                    <td>{pre.bp}</td>
                    <td>{pre.weight}</td>
                    <td>{pre.meds}</td>
                    <td>{pre.days}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    No Prescription Uploaded for this Appointment !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Pres;
