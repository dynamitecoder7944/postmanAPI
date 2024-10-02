// src/utils/calculateSleep.js
export const calculateSleep = (age) => {
    if (age < 1) return "14-17 hours of sleep";
    if (age < 3) return "12-14 hours of sleep";
    if (age < 5) return "10-13 hours of sleep";
    if (age < 13) return "9-11 hours of sleep";
    if (age < 18) return "8-10 hours of sleep";
    return "7-9 hours of sleep"; // Adults
};
