// src/utils/calculateHeartRate.js
export const calculateHeartRate = (age) => {
    const maxHeartRate = 220 - age;
    return {
        min: Math.round(maxHeartRate * 0.5),
        max: Math.round(maxHeartRate * 0.85),
    };
};
