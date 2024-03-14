import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [solutions, setSolutions] = useState([]);

  const handleImageUpload = async (e) => {
    console.log('Uploading image...');
    const file = e.target.files[0];
    console.log('Selected file:', file);
    const formData = new FormData();
    formData.append('file', file);

    console.log("hello")
    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
      console.log(result.solution)
      const solutionArray = JSON.parse(response.data.solution);
      const solutions = Object.values(solutionArray);
      console.log('///////////////')
      console.log(solutions);
      setSolutions(solutions);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error here
    }
  };

  return (
    <div>
      <h1>Plant Disease Detector</h1>
      <input type="file" onChange={handleImageUpload} />
      {result && (
        <div>
          <h2>Result:</h2>
          <p>Disease: {result.class}</p>
          <h2>Control Measures:</h2>
          <ul>
            {solutions.map((solution, index) => (
              <li key={index}>{solution}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
