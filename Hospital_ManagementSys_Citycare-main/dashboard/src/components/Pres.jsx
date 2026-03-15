import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const PresForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [ano, setAno] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctor_firstname, setDoctorFirstName] = useState("");
  const [doctor_lastname, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientid] = useState("");
  const [status, setStatus] = useState("");
  const [disease, setDisease] = useState("");
  const [bp, setBp] = useState("");
  const [weight, setWeight] = useState("");
  const [meds, setMeds] = useState("");
  const [days, setDays] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [pres, setPres] = useState([]);
  useEffect(() => {
    const getPres = async () => {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/pres/getPres`,
          { withCredentials: true }
        );
        setPres(data.data.pres);
        console.log(data.data.pres);
      } catch (error) {
        setPres([]);
        console.log("Error occured while retrieving the data", error);
      }
    };
    getPres();
  }, []);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/doctors`,
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handlePres = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/pres/postPres`,
        {
          firstName,
          lastName,
          phone,
          ano,
          dob,
          gender,
          appointment_date,
          department,
          doctor_firstname,
          doctor_lastname,
          doctorId,
          patientId,
          address,
          status,
          disease,
          bp,
          weight,
          meds,
          days,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <ToastContainer position="top-center" />
      <section className="page pres">
        <div>
          <div className="container form-component appointment-form">
            <h1 style={{ marginBottom: "20px", padding: "10px" }}>
              ADD PRESCRIPTIONS
            </h1>
            <form onSubmit={handlePres}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="ANO"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="date"
                  placeholder="Appointment Date"
                  value={appointment_date}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setDoctorFirstName("");
                    setDoctorLastName("");
                  }}
                >
                  {departmentsArray.map((depart, index) => {
                    return (
                      <option value={depart} key={index}>
                        {depart}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={`${doctor_firstname} ${doctor_lastname}`}
                  onChange={(e) => {
                    const [firstName, lastName] = e.target.value.split(" ");
                    setDoctorFirstName(firstName);
                    setDoctorLastName(lastName);
                  }}
                  disabled={!department}
                >
                  <option value="">Select Doctor</option>
                  {doctors
                    .filter((doctor) => doctor.doctorDepartment === department)
                    .map((doctor, index) => (
                      <option
                        value={`${doctor.firstName} ${doctor.lastName}`}
                        key={index}
                      >
                        {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Doctot ID"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Patient ID"
                  value={patientId}
                  onChange={(e) => setPatientid(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Disease"
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="BP"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Medicines"
                  value={meds}
                  onChange={(e) => setMeds(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
              <textarea
                rows="10"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />

              <button style={{ margin: "0 auto" }}>SUBMIT</button>
            </form>
          </div>
        </div>
        <Link to={"/allpres"}>Click here</Link>
      </section>
    </>
  );
};

export default PresForm;
