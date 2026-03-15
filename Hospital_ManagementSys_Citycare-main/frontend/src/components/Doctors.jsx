import React, {useEffect, useState } from "react";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/doctors`,
          {
            withCredentials: true,
          }
        );
        setDoctors(data.doctors);
        console.log(data.doctors);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element) => {
              return (
                <div className="Card" key={element._id}>
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt="Doctor Avatar"
                  />
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{element.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Department: <span>{element.doctorDepartment}</span>
                    </p>
                    <p>
                      ANO: <span>{element.ano}</span>
                    </p>
                    <p>
                      Gender: <span>{element.gender}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctors Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
