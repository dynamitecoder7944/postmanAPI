// src/components/HealthInsights.js
import React, { useState } from 'react';
import HealthForm from './components/HealthForm';
import { calculateBMI } from './utils/calculateBMI';
import { calculateCalories } from './utils/calculateCalories';
import { calculateHydration } from './utils/calculateHydration';
import { calculateHeartRate } from './utils/calculateHeartRate';
import { calculateSleep } from './utils/calculateSleep';
import styles from './HealthInsights.module.css'; // CSS module for styling

const HealthInsights = () => {
    const [insights, setInsights] = useState(null);
    const [selectedChallenges, setSelectedChallenges] = useState([]);

    const healthChallenges = [
        'Drink 2 liters of water daily',
        'Walk 10,000 steps each day',
        'Eat 5 servings of fruits and vegetables',
        'Exercise for 30 minutes 5 days a week',
        'Practice mindfulness for 10 minutes daily',
    ];

    const handleFormSubmit = (data) => {
        const { age, weight, height, activityLevel } = data;

        const bmi = calculateBMI(weight, height);
        const dailyCalories = calculateCalories(age, weight, height, activityLevel);
        const hydration = calculateHydration(weight);
        const heartRate = calculateHeartRate(age);
        const sleep = calculateSleep(age);

        setInsights({
            bmi,
            dailyCalories,
            hydration,
            heartRate,
            sleep,
        });
    };

    const toggleChallenge = (challenge) => {
        setSelectedChallenges((prev) =>
            prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge]
        );
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Health Insights</h2>
            <HealthForm onSubmit={handleFormSubmit} />

            <div className={styles.challengesContainer}>
                <h3 className={styles.challengesTitle}>Health Challenges</h3>
                <ul className={styles.challengesList}>
                    {healthChallenges.map((challenge) => (
                        <li key={challenge} className={styles.challengeItem}>
                            <input
                                type="checkbox"
                                checked={selectedChallenges.includes(challenge)}
                                onChange={() => toggleChallenge(challenge)}
                                className={styles.checkbox}
                            />
                            <label className={`${styles.challengeLabel} ${styles.whiteText}`}>{challenge}</label>
                        </li>
                    ))}
                </ul>
            </div>

            {insights && (
                <div className={styles.insightsContainer}>
                    {/* BMI */}
                    <div className={styles.insightBox}>
                        <h3 className={`${styles.insightTitle} ${styles.whiteText}`}>BMI Calculation</h3>
                        <p className={styles.whiteText}><strong>BMI:</strong> {insights.bmi.toFixed(2)}</p>
                    </div>

                    {/* Daily Caloric Intake */}
                    <div className={styles.insightBox}>
                        <h3 className={`${styles.insightTitle} ${styles.whiteText}`}>Daily Caloric Intake</h3>
                        <p className={styles.whiteText}><strong>Calories Needed:</strong> {insights.dailyCalories} kcal/day</p>
                    </div>

                    {/* Hydration Levels */}
                    <div className={styles.insightBox}>
                        <h3 className={`${styles.insightTitle} ${styles.whiteText}`}>Hydration</h3>
                        <p className={styles.whiteText}><strong>Recommended Water Intake:</strong> {insights.hydration.toFixed(1)} liters/day</p>
                    </div>

                    {/* Heart Rate Information */}
                    <div className={styles.insightBox}>
                        <h3 className={`${styles.insightTitle} ${styles.whiteText}`}>Healthy Heart Rate</h3>
                        <p className={styles.whiteText}><strong>Heart Rate Range:</strong> {insights.heartRate.min} - {insights.heartRate.max} bpm</p>
                    </div>

                    {/* Sleep Patterns */}
                    <div className={styles.insightBox}>
                        <h3 className={`${styles.insightTitle} ${styles.whiteText}`}>Sleep Patterns</h3>
                        <p className={styles.whiteText}><strong>Sleep:</strong>{insights.sleep}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealthInsights;
