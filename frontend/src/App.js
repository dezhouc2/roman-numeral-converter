/* This code chunk demonstrates the overall user interface logics and interaction */


import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [isError, setIsError] = useState(false); // Add error state
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!inputValue) {
      alert('Please enter a number');
      return;
    }

    // Client-side validation first
    const num = parseInt(inputValue, 10);
    if (isNaN(num)) {
      setResult('Error: Please enter a valid number');
      setIsError(true);
      return;
    }
    if (num < 1 || num > 3999) {
      setResult('Error: Please enter a number between 1 and 3999');
      setIsError(true);
      return;
    }

    setLoading(true);
    setIsError(false); // Reset error state
    try {
      const response = await fetch(`http://localhost:8080/romannumeral?query=${inputValue}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      
      const data = await response.json();
      setResult(data.output);
      setIsError(false); // Success, not an error
    } catch (error) {
      setResult('Error: Unable to connect to server');
      setIsError(true);
      console.error('Fetch error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <h1>Roman Numeral Converter</h1>
        
        {/* Left-aligned label */}
        <h3 className="input-label">Enter a number</h3>
        
        <input 
          type="number" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number (1-3999)"
          className="number-input"
        />
        
        <button 
          onClick={handleConvert}
          disabled={loading}
          className="convert-button"
        >
          {loading ? 'Converting...' : 'Convert to Roman Numeral'}
        </button>
        
        {/* Display result or error appropriately */}
        {result && (
          <div className={`result-container ${isError ? 'error' : ''}`}>
            <div className={`result-text ${isError ? 'error-text' : 'roman-result'}`}>
              {isError ? result : `Roman numeral: ${result}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;