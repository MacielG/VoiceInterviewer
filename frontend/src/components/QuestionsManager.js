import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionsManager() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    axios.get('/api/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error loading questions:', error));
  }, []);

  const addQuestion = () => {
    axios.post('/api/questions', { question: newQuestion })
      .then(response => {
        setQuestions([...questions, newQuestion]);
        setNewQuestion('');
      })
      .catch(error => console.error('Error adding question:', error));
  };

  return (
    <div>
      <h1>Manage Interview Questions</h1>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Add a new question"
      />
      <button onClick={addQuestion}>Add Question</button>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionsManager;
