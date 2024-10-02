// src/utils/calculateHydration.js
export const calculateHydration = (weight) => {
    const hydration = weight * 0.033; // Calculate hydration in liters
    return parseFloat(hydration.toFixed(2)); // Return as a number
};
