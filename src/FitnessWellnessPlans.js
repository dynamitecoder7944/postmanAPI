import React, { useState } from 'react';
import axios from 'axios';
import styles from './FitnessWellnessPlans.module.css';
import fitnessImage from './fit.jpg'; // Import your image here

function FitnessWellnessPlans() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    allergies: '',
    gender: '',
    activityLevel: '',
    dietaryPreference: '',
    fitnessGoal: '',
    medicalConditions: '',
  });

  const [dietPlan, setDietPlan] = useState(null);
  const [exercisePlan, setExercisePlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Build dynamic query string for diet
  const buildDietQuery = () => {
    const { allergies, dietaryPreference, fitnessGoal } = formData;
    let query = '';

    // Dynamic meal suggestion logic based on dietary preferences and fitness goals
    if (dietaryPreference === 'vegan') {
      query += 'tofu, spinach, lentils, quinoa';
    } else if (dietaryPreference === 'vegetarian') {
      query += 'eggs, dairy, broccoli, nuts';
    } else {
      query += 'chicken breast, salmon, turkey, lean beef';
    }

    if (fitnessGoal === 'weight loss') {
      query += ', avocado, cucumber, apples';
    } else if (fitnessGoal === 'muscle gain') {
      query += ', brown rice, sweet potato, protein shake';
    }

    // Add allergies (exclude any ingredients based on allergy)
    if (allergies) {
      query += `, without ${allergies}`;
    }

    return query;
  };

  // Build dynamic exercise suggestion
  const buildExercisePlan = () => {
    const { activityLevel, fitnessGoal } = formData;
    let exercises = '';

    // Exercise logic based on activity level and fitness goals
    if (fitnessGoal === 'weight loss') {
      if (activityLevel === 'sedentary') {
        exercises = 'brisk walking, yoga, bodyweight exercises';
      } else if (activityLevel === 'lightly active') {
        exercises = 'jogging, cycling, swimming, HIIT';
      } else {
        exercises = 'running, strength training, advanced HIIT';
      }
    } else if (fitnessGoal === 'muscle gain') {
      exercises = 'strength training, weight lifting, resistance training';
    } else {
      exercises = 'moderate cardio, pilates, mixed strength exercises';
    }

    return exercises;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dynamicDietQuery = buildDietQuery();
    const dynamicExercisePlan = buildExercisePlan();

    setLoading(true);
    setError(null);

    try {
      // Fetch diet plan from Nutritionix API
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        {
          query: dynamicDietQuery,
          timezone: 'US/Eastern',
        },
        {
          headers: {
            'x-app-id': '24e3c421', // Your Nutritionix Application ID
            'x-app-key': 'e09096be723bfb181c4ea07461b5a09b', // Your Nutritionix API Key
            'Content-Type': 'application/json',
          },
        }
      );

      setDietPlan(response.data); // Update diet plan
      setExercisePlan(dynamicExercisePlan); // Set exercise plan
    } catch (error) {
      setError('Error fetching the fitness plan. Please try again.');
      console.error('Error fetching the fitness plan:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Personalize Your Fitness & Wellness Plan</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Age:
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </label>
          <label>
            Weight (kg):
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
          </label>
          <label>
            Height (cm):
            <input type="number" name="height" value={formData.height} onChange={handleChange} required />
          </label>
          <label>
            Allergies (if any):
            <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="e.g. nuts, dairy" />
          </label>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Activity Level:
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly active">Lightly Active</option>
              <option value="moderately active">Moderately Active</option>
              <option value="very active">Very Active</option>
            </select>
          </label>
          <label>
            Dietary Preference:
            <select name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </label>
          <label>
            Fitness Goal:
            <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="weight loss">Weight Loss</option>
              <option value="muscle gain">Muscle Gain</option>
              <option value="maintain weight">Maintain Weight</option>
            </select>
          </label>
          <label>
            Medical Conditions (if any):
            <input type="text" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} placeholder="e.g. diabetes, hypertension" />
          </label>
          <button type="submit">Get Plan</button>
        </form>

        {loading && <p>Loading your personalized plan...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {dietPlan && (
          <div className={styles.resultsContainer}>
            <div className={styles.dietPlan}>
              <h3>Your Diet Plan</h3>
              <ul>
                {dietPlan.foods.map((food, index) => (
                  <li key={index}>
                    <strong>{food.food_name}</strong> - {food.serving_qty} {food.serving_unit}, {food.nf_calories} calories
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {exercisePlan && (
          <div className={styles.resultsContainer}>
            <div className={styles.exercisePlan}>
              <h3>Your Exercise Plan</h3>
              <p>{exercisePlan}</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.imageContainer}>
        <img src={fitnessImage} alt="Fitness" />
      </div>
    </div>
  );
}

export default FitnessWellnessPlans;
