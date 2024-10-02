// src/utils/calculateBMI.js
export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // Convert cm to meters
    const bmi = weight / (heightInMeters * heightInMeters); // Calculate BMI
    return parseFloat(bmi.toFixed(2)); // Return as a number
};
