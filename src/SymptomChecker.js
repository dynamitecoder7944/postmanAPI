import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SymptomChecker.css'; // Update your CSS accordingly

const SymptomChecker = () => {
    const [symptom, setSymptom] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [timer, setTimer] = useState(5); // Timer state
    const [showForm, setShowForm] = useState(false); // To toggle the form after the timer

    // Timer logic with useEffect
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(countdown); // Cleanup the interval
        } else {
            setShowForm(true); // Show form when the timer hits 0
        }
    }, [timer]);

    // Handle symptom input change
    const handleSymptomChange = (e) => {
        setSymptom(e.target.value);
        setSelectedDrug(null); // Clear selected drug when input changes
    };

    const handleSearch = async () => {
        if (!symptom) {
            setError('Please enter a symptom.');
            return;
        }
        setError('');
        try {
            const response = await axios.get(`https://api.fda.gov/drug/label.json?search=indications_and_usage:"${symptom}"&limit=10`);
            const data = response.data;

            if (data.results) {
                const formattedResults = data.results
                    .filter(drug => drug.openfda && drug.openfda.brand_name && drug.openfda.brand_name[0] !== 'Unknown Brand')
                    .map(drug => ({
                        brandName: drug.openfda.brand_name[0],
                        dosage: drug.dosage_and_administration || 'No dosage information available.',
                        description: drug.description || 'No description available.',
                    }));
                setResults(formattedResults);
            } else {
                setResults([]);
                setError('No results found.');
            }
        } catch (err) {
            setError('Error fetching data from the FDA API.');
            console.error(err);
        }
    };

    // Handle key press event
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Trigger search when Enter key is pressed
        }
    };

    const handleDrugClick = (drug) => {
        setSelectedDrug(drug);
    };

    return (
        <div className="unique-symptom-checker">
            {!showForm ? (
                <div className="unique-calm-message">
                    <h1>Take a moment to breathe and relax...</h1>
                    <p>Symptom checker will appear in {timer} seconds.</p>
                </div>
            ) : (
                <div className="unique-form-container">
                    <h1 className="black-heading">Symptom Checker</h1>
                    <input 
                        type="text" 
                        value={symptom} 
                        onChange={handleSymptomChange}
                        onKeyPress={handleKeyPress} // Add key press handler
                        placeholder="Enter a symptom (e.g., nausea)" 
                    />
                    <button className="unique-button" onClick={handleSearch}>Search</button>
                    {error && <p className="unique-error">{error}</p>}
                    <div className="unique-capsule-container">
                        {results.length > 0 && results.map((drug, index) => (
                            <div 
                                key={index} 
                                className="unique-capsule" 
                                onClick={() => handleDrugClick(drug)}
                            >
                                {drug.brandName}
                            </div>
                        ))}
                    </div>
                    {selectedDrug && (
                        <div className="unique-drug-info">
                            <h2 className="black-heading">{selectedDrug.brandName}</h2>
                            <p>{selectedDrug.description}</p>
                            <h3>Dosage:</h3>
                            <p>{selectedDrug.dosage}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;
