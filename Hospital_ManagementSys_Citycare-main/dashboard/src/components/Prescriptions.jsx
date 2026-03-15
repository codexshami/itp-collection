import React, { useEffect, useState, useContext } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/pres/getPres`,
          { withCredentials: true }
        );
        setPrescriptions(data.data.pres);
        console.log(data.data.pres);
      } catch (error) {
        console.log("Error occured while fetching prescriptions", error);
      }
    };
    fetchPrescriptions();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page messages">
      <h1>Prescriptions</h1>
      <div className="banner">
        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((element) => (
            <div className="card" key={element._id}>
              <div className="details">
                <p>
                  First Name: <span>{element.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{element.lastName}</span>
                </p>
                <p>
                  Gender: <span>{element.gender}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  Department: <span>{element.department}</span>
                </p>
                <p>
                  Doctor:{" "}
                  <span>
                    {element.doctor.firstName} {element.doctor.lastName}
                  </span>
                </p>
                <p>
                  Disease: <span>{element.disease}</span>
                </p>
                <p>
                  Meds: <span>{element.meds}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Prescriptions!!</h1>
        )}
      </div>
    </section>
  );
};

export default Prescriptions;
