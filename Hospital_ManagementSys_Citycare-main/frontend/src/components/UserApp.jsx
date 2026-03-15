import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export const UserApp = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/appointment/getuserApp`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        console.log(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="header">
            <h5>Appointments</h5>
          </div>
          <table border={1} style={{ borderCollapse: "collapse" }} rules="all">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Prescriptions</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <div
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : appointment.status === "Done"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                      >
                        {appointment.status}
                      </div>
                    </td>
                    <td>
                      {appointment.status === "Done" ? (
                        <Link
                          to={`/prescriptions/${appointment.appointment_date.substring(
                            0,
                            16
                          )}`}
                        >
                          Click here to see your prescriptions
                        </Link>
                      ) : (
                        <span className="disabled-link">
                          Prescriptions available after appointment is done
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Appointments Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};
