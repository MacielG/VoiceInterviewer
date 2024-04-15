import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResponsesViewer() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios.get('/api/responses')
      .then(response => setResponses(response.data))
      .catch(error => console.error('Error loading responses:', error));
  }, []);

  return (
    <div>
      <h1>View Candidate Responses</h1>
      {responses.map((response, index) => (
        <div key={index}>
          <h2>Response from {response.phoneNumber}</h2>
          <ul>
            {response.responses.map((answer, idx) => <li key={idx}>{answer}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ResponsesViewer;
