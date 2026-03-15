import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DiseasesData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        console.log()
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/disease/diseases`
        );
        setData(response.data.diseases);
      } catch (error) {
        console.error("Error fetching diseases:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    };
    fetchDiseases();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const slicedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <div className="grid">
        {slicedData.map((element) => {
          const { _id, name, def, symptoms, url, info } = element;
          return (
            <div className="cards" key={_id}>
              <h2>{name}</h2>
              <p>{def}</p>
              <img src={`/images/${url}`} alt={name} />
              <div>
                <h3>Symptoms</h3>
                <ul>
                  {symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
                <h3>
                  Want to know more <br></br>
                  <Link to={info} target="_blank" rel="noopener noreferrer">
                    Click here
                  </Link>
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DiseasesData;
