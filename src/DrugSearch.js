import React, { useState } from 'react';
import axios from 'axios';
import './DrugSearch.css'; // Updated CSS with uncommon class names

const DrugSearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [drugInfo, setDrugInfo] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch drug suggestions based on input
    const fetchSuggestions = async (input) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${input}*&limit=10`
            );
            const data = response.data;

            const validDrugs = data.results.filter(drug => drug.openfda && drug.openfda.brand_name);
            if (validDrugs.length > 0) {
                setSuggestions(validDrugs);
                setError('');
            } else {
                setSuggestions([]);
                setError('No valid drugs found.');
            }
        } catch (err) {
            setError('Error fetching suggestions.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDrugInfo = async (drugName) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.fda.gov/drug/label.json?search=openfda.brand_name.exact:"${drugName}"&limit=1`
            );
            const data = response.data;

            if (data.results && data.results.length > 0) {
                setDrugInfo(data.results[0]);
                setError('');
            } else {
                setDrugInfo(null);
                setError('No details found for this drug.');
            }
        } catch (err) {
            setError('Error fetching drug details.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);
        if (input.length === 0) {
            setSuggestions([]);
            setDrugInfo(null);
        } else {
            fetchSuggestions(input);
        }
    };

    const handleSuggestionClick = (drug) => {
        const drugName = drug.openfda.brand_name[0];
        setQuery(drugName);
        setSuggestions([]);
        fetchDrugInfo(drugName);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setDrugInfo(null);
        setError('');
    };

    return (
        <div className="drug-search-bg">
        <div className="drug-search-panel">
            <h1 className="drug-header">Drug Search</h1>
            <div className="search-form-wrap">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    className="drug-input-field"
                    placeholder="Start typing a drug name"
                />
                <button onClick={handleClear} className="drug-search-btn">Clear</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="warning-message">{error}</p>}

            {suggestions.length > 0 && (
                <ul className="suggestion-box">
                    {suggestions.map((drug, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(drug)} className="suggestion-item">
                            {drug.openfda.brand_name[0]}
                        </li>
                    ))}
                </ul>
            )}

            {drugInfo && (
                <div className="drug-details-panel">
                    <h2 className="drug-title">
                        {drugInfo.openfda?.brand_name ? drugInfo.openfda.brand_name[0] : 'Unknown Brand'}
                    </h2>
                    <p>{drugInfo.description || drugInfo.indications_and_usage || 'No description available.'}</p>
                    <h3 className="drug-side-effects-title">Side Effects:</h3>
                    <ul>
                        {drugInfo.warnings && drugInfo.warnings.length > 0 ? (
                            drugInfo.warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                            ))
                        ) : (
                            <li>No side effects information available.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
        </div>
    );
};

export default DrugSearch;
