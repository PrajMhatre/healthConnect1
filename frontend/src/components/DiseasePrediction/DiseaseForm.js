import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removed Link import
import "./DiseaseForm.css";

const symptoms = [
  { id: "itching", label: "Itching", placeholder: "Do you feel like itching?" },
  { id: "skin_rash", label: "Skin Rash", placeholder: "Do you have a skin rash?" },
  { id: "nodal_skin_eruptions", label: "Nodal Skin Eruptions", placeholder: "Do you have nodal skin eruptions?" },
  { id: "continuous_sneezing", label: "Continuous Sneezing", placeholder: "Are you experiencing continuous sneezing?" },
  { id: "shivering", label: "Shivering", placeholder: "Do you feel shivering?" },
  { id: "joint_pain", label: "Joint Pain", placeholder: "Do you have joint pain?" },
  { id: "stomach_pain", label: "Stomach Pain", placeholder: "Do you have stomach pain?" },
  { id: "acidity", label: "Acidity", placeholder: "Are you experiencing acidity?" },
  { id: "vomiting", label: "Vomiting", placeholder: "Have you experienced vomiting?" },
  { id: "fatigue", label: "Fatigue", placeholder: "Do you feel fatigue?" },
  { id: "weight_loss", label: "Weight Loss", placeholder: "Have you experienced weight loss?" },
  { id: "restlessness", label: "Restlessness", placeholder: "Do you feel restlessness?" },
  { id: "lethargy", label: "Lethargy", placeholder: "Do you feel lethargic?" },
  { id: "cough", label: "Cough", placeholder: "Do you have a cough?" },
  { id: "high_fever", label: "High Fever", placeholder: "Do you have a high fever?" },
  { id: "sunken_eyes", label: "Sunken Eyes", placeholder: "Are your eyes sunken?" },
  { id: "breathlessness", label: "Breathlessness", placeholder: "Do you feel breathless?" },
  { id: "sweating", label: "Sweating", placeholder: "Are you sweating excessively?" },
  { id: "dehydration", label: "Dehydration", placeholder: "Do you feel dehydrated?" },
  { id: "indigestion", label: "Indigestion", placeholder: "Do you have indigestion?" },
  { id: "headache", label: "Headache", placeholder: "Do you have a headache?" },
  { id: "yellowish_skin", label: "Yellowish Skin", placeholder: "Is your skin yellowish?" },
  { id: "abdominal_pain", label: "Abdominal Pain", placeholder: "Are you experiencing abdominal pain?" },
  { id: "phlegm", label: "Phlegm", placeholder: "Do you have phlegm?" },
  { id: "redness_of_eyes", label: "Redness of Eyes", placeholder: "Do you have redness in your eyes?" },
];

const DiseasePredictionForm = () => {
  const [formData, setFormData] = useState(
    symptoms.reduce((acc, symptom) => ({ ...acc, [symptom.id]: "" }), {})
  );

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "0" || value === "1" || value === "") {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: "Only 0 or 1 is allowed." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("Form data submitted:", formData);

    // Create an array of 0s and 1s based on the form data
    const symptomsArray = symptoms.map((symptom) => formData[symptom.id] === "1" ? 1 : 0);

    try {
      const response = await fetch("http://127.0.0.1:5000/single/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptomsArray }), // Send the symptoms array
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/disease-prediction/result", { state: { diseaseName: data.disease } });
      } else {
        console.error("Error: Unable to fetch prediction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Disease Prediction Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {console.log("Form is rendering")}
        </div>
        <div className="form-row"></div>
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="form-group">
            <label htmlFor={symptom.id}>{symptom.label}</label>
            <input
              type="text"
              id={symptom.id}
              name={symptom.id}
              placeholder={symptom.placeholder}
              value={formData[symptom.id]}
              onChange={handleInputChange}
            />
            {errors[symptom.id] && <span className="error-text">{errors[symptom.id]}</span>}
          </div>
        ))}
        <div/>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DiseasePredictionForm;



// import React, { useState } from "react";
// import { Link } from 'react-router-dom';  // Import Link for routing
// import "./DiseaseForm.css";

// const DiseasePredictionForm = () => {
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     if (value === "0" || value === "1" || value === "") {
//       setError("");
//     } else {
//       setError("Only 0 or 1 is allowed.");
//       e.target.value = "";
//     }
//   };
//   return (
//     <div className="form-container">
//       <h1 className="form-heading">Disease Prediction Form</h1>
//       <p className="form-description">
//         Please provide details about the symptoms you are experiencing. Fill in the required information below for accurate predictions.
//       </p>
//       <form className="symptoms-form">
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="itching">Itching</label>
//           <input
//             type="text"
//             id="itching"
//             name="itching"
//             placeholder="Do you feel like itching?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="skin_rash">Skin Rash</label>
//           <input
//             type="text"
//             id="skin_rash"
//             name="skin_rash"
//             placeholder="Do you have a skin rash?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="nodal_skin_eruptions">Nodal Skin Eruptions</label>
//           <input
//             type="text"
//             id="nodal_skin_eruptions"
//             name="nodal_skin_eruptions"
//             placeholder="Do you have nodal skin eruptions?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="continuous_sneezing">Continuous Sneezing</label>
//           <input
//             type="text"
//             id="continuous_sneezing"
//             name="continuous_sneezing"
//             placeholder="Are you experiencing continuous sneezing?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="shivering">Shivering</label>
//           <input
//             type="text"
//             id="shivering"
//             name="shivering"
//             placeholder="Do you feel shivering?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="joint_pain">Joint Pain</label>
//           <input
//             type="text"
//             id="joint_pain"
//             name="joint_pain"
//             placeholder="Do you have joint pain?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="stomach_pain">Stomach Pain</label>
//           <input
//             type="text"
//             id="stomach_pain"
//             name="stomach_pain"
//             placeholder="Do you have stomach pain?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="acidity">Acidity</label>
//           <input
//             type="text"
//             id="acidity"
//             name="acidity"
//             placeholder="Are you experiencing acidity?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="vomiting">Vomiting</label>
//           <input
//             type="text"
//             id="vomiting"
//             name="vomiting"
//             placeholder="Have you experienced vomiting?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="fatigue">Fatigue</label>
//           <input
//             type="text"
//             id="fatigue"
//             name="fatigue"
//             placeholder="Do you feel fatigue?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="weight_loss">Weight Loss</label>
//           <input
//             type="text"
//             id="weight_loss"
//             name="weight_loss"
//             placeholder="Have you experienced weight loss?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="restlessness">Restlessness</label>
//           <input
//             type="text"
//             id="restlessness"
//             name="restlessness"
//             placeholder="Do you feel restlessness?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="lethargy">Lethargy</label>
//           <input
//             type="text"
//             id="lethargy"
//             name="lethargy"
//             placeholder="Do you feel lethargic?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="cough">Cough</label>
//           <input
//             type="text"
//             id="cough"
//             name="cough"
//             placeholder="Do you have a cough?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="high_fever">High Fever</label>
//           <input
//             type="text"
//             id="high_fever"
//             name="high_fever"
//             placeholder="Do you have a high fever?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="sunken_eyes">Sunken Eyes</label>
//           <input
//             type="text"
//             id="sunken_eyes"
//             name="sunken_eyes"
//             placeholder="Are your eyes sunken?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="breathlessness">Breathlessness</label>
//           <input
//             type="text"
//             id="breathlessness"
//             name="breathlessness"
//             placeholder="Do you feel breathless?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="sweating">Sweating</label>
//           <input
//             type="text"
//             id="sweating"
//             name="sweating"
//             placeholder="Are you sweating excessively?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="dehydration">Dehydration</label>
//           <input
//             type="text"
//             id="dehydration"
//             name="dehydration"
//             placeholder="Do you feel dehydrated?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="indigestion">Indigestion</label>
//           <input
//             type="text"
//             id="indigestion"
//             name="indigestion"
//             placeholder="Do you have indigestion?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="headache">Headache</label>
//           <input
//             type="text"
//             id="headache"
//             name="headache"
//             placeholder="Do you have a headache?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="yellowish_skin">Yellowish Skin</label>
//           <input
//             type="text"
//             id="yellowish_skin"
//             name="yellowish_skin"
//             placeholder="Is your skin yellowish?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="abdominal_pain">Abdominal Pain</label>
//           <input
//             type="text"
//             id="abdominal_pain"
//             name="abdominal_pain"
//             placeholder="Are you experiencing abdominal pain?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="phlegm">Phlegm</label>
//           <input
//             type="text"
//             id="phlegm"
//             name="phlegm"
//             placeholder="Do you have phlegm?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="redness_of_eyes">Redness of Eyes</label>
//           <input
//             type="text"
//             id="redness_of_eyes"
//             name="redness_of_eyes"
//             placeholder="Do you have redness in your eyes?"
//             onChange={handleInputChange}
//           />
//           {error && <span className="error-text">{error}</span>}
//         </div>
//       </div>

//           {/* <div className="form-group">
//             <label htmlFor="column-4"></label>
//             <input
//               type="text"
//               id="column-4"
//               name="column-4"
//               placeholder="Enter data for column 4"
//               onChange={handleInputChange}
//             />
//           </div>
//         </div> */}
        
//         {/* Link component wrapping the button */}
//         <Link to="/disease-prediction/result">
//         <button type="submit" className="submit-button">
//           Submit
//         </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default DiseasePredictionForm;
