import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

const Hairstyle = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [faceShape, setFaceShape] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setFaceShape("");
    setSuggestions([]);
    setLoading(true);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Prepare form data
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("https://perfectyou-backend.onrender.com/hairstyle", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        setFaceShape(data.face_shape);
        setSuggestions(data.hairstyle_suggestions);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 rounded-lg bg-white shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-brand-charcoal">
        Hairstyle Advisor
      </h2>
      <p className="text-base mb-6 text-brand-charcoal">
        Upload your photo to discover your perfect look.
      </p>

      <label
        htmlFor="hairstyle-upload"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer
                   font-semibold bg-brand-plum text-brand-cream shadow-md
                   transition-all duration-300 ease-in-out
                   hover:shadow-lg hover:shadow-brand-lavender/50 hover:-translate-y-px
                   focus:outline-none focus:ring-2 focus:ring-brand-lavender focus:ring-offset-2 focus:ring-offset-white"
      >
        <FiUpload className="w-5 h-5" />
        <span>Choose a Photo</span>
      </label>

      <input
        type="file"
        id="hairstyle-upload"
        className="hidden"
        onChange={handleUpload}
        accept="image/png, image/jpeg"
      />

      <p className="mt-4 text-sm text-brand-plum">{fileName}</p>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {loading && (
        <p className="mt-4 text-indigo-600 font-semibold">Processing...</p>
      )}

      {faceShape && (
        <h3 className="mt-4 text-xl font-bold text-brand-charcoal">
          Detected Face Shape: {faceShape}
        </h3>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="p-4 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-indigo-800">{s}</h4>
              <p className="text-sm text-indigo-700">
                Hairstyle suggestion for {faceShape} face.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hairstyle;
