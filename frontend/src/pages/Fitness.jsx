import React, { useState } from 'react';
import axios from 'axios';

const Fitness = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://perfectyou-backend.onrender.com/fitness", {
        height: height,
        weight: weight
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching fitness plan:", error);
      alert("Something went wrong. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-brand-charcoal">
        Fitness & BMI Coach
      </h2>
      <p className="text-base mb-6 text-brand-charcoal">
        Enter your height and weight to get exercise suggestions.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height in cm"
          className="p-2 border border-brand-rose rounded-md
                     focus:ring-2 focus:ring-brand-lavender focus:border-brand-plum"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight in kg"
          className="p-2 border border-brand-rose rounded-md
                     focus:ring-2 focus:ring-brand-lavender focus:border-brand-plum"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="inline-flex items-center gap-3 px-6 py-2 mt-4 rounded-lg cursor-pointer
                   font-semibold bg-brand-plum text-brand-cream shadow-md
                   transition-all duration-300 ease-in-out
                   hover:shadow-lg hover:shadow-brand-lavender/50 hover:-translate-y-px
                   focus:outline-none focus:ring-2 focus:ring-brand-lavender focus:ring-offset-2 focus:ring-offset-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Submit"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-brand-cream border border-brand-lavender rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Workout Plan:</h3>
          <ul className="list-disc list-inside text-brand-plum">
            {result.workout_plan.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
          <p className="mt-2 text-brand-plum"><strong>Goal:</strong> {result.goal}</p>
          <p className="mt-1 text-brand-plum"><strong>Advice:</strong> {result.advice}</p>
        </div>
      )}
    </div>
  );
};

export default Fitness;
