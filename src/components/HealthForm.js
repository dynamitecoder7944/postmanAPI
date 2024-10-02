// src/components/HealthForm.js
import React, { useState } from 'react';

const HealthForm = ({ onSubmit }) => {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ age, weight, height, activityLevel });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Age:
                <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Weight (kg):
                <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Height (cm):
                <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Activity Level:
                <select 
                    value={activityLevel} 
                    onChange={(e) => setActivityLevel(e.target.value)}
                >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very Active</option>
                </select>
            </label>
            <button type="submit">Calculate Insights</button>
        </form>
    );
};

export default HealthForm;
