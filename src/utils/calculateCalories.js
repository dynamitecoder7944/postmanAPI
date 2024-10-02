// src/utils/calculateCalories.js
export const calculateCalories = (age, weight, height, activityLevel) => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Mifflin-St Jeor Equation for men
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        'very-active': 1.9,
    };
    return Math.round(bmr * activityMultipliers[activityLevel]);
};
