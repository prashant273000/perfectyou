import React, { useState } from 'react';
import axios from 'axios';

const Disease = () => {
  const [disease, setDisease] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!disease) {
      alert("Please enter your disease or health concern!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/disease", {
        disease: disease
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching disease advice:", error);
      alert("Something went wrong. Make sure your backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-brand-charcoal">
        Disease & Wellness Advisor
      </h2>
      <p className="text-base mb-6 text-brand-charcoal">
        Enter your disease to get lifestyle suggestions.
      </p>

      <input
        type="text"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        placeholder="e.g., diabetes, hair fall"
        className="w-full max-w-xs p-2 border border-brand-rose rounded-md
                   focus:ring-2 focus:ring-brand-lavender focus:border-brand-plum"
      />

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
          <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Advice:</h3>
          <p className="text-brand-plum">{result.advice}</p>
          <p className="mt-2 text-brand-plum"><strong>Possible Risk:</strong> {result.possible_risk}</p>
        </div>
      )}
    </div>
  );
};

export default Disease;
