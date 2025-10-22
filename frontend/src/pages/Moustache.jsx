import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

const Moustache = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFile(null);
      setFileName('No file chosen');
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a photo first!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLoading(true);
      const response = await axios.post("https://perfectyou-backend.onrender.com/moustache", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching moustache advice:", error);
      alert("Something went wrong. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-brand-charcoal">
        Moustache Advisor
      </h2>
      <p className="text-base mb-6 text-brand-charcoal">
        Upload your photo to get moustache style suggestions.
      </p>

      <label
        htmlFor="moustache-advisor-upload"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer
                   font-semibold bg-brand-plum text-brand-cream shadow-md
                   transition-all duration-300 ease-in-out
                   hover:shadow-lg hover:shadow-brand-lavender/50 hover:-translate-y-px
                   focus:outline-none focus:ring-2 focus:ring-brand-lavender focus:ring-offset-2 focus:ring-offset-white"
      >
        <FiUpload className="w-5 h-5" />
        <span>Choose Photo</span>
      </label>

      <input
        type="file"
        id="moustache-advisor-upload"
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
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
          <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Recommended Moustache:</h3>
          <p className="text-brand-plum">{result.moustache_style}</p>
          <p className="mt-2 text-brand-plum"><strong>Tip:</strong> {result.tip}</p>
        </div>
      )}

      <p className="mt-4 text-sm text-brand-plum">{fileName}</p>
    </div>
  );
};

export default Moustache;
