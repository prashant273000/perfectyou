import React from "react";

const UploadSection = ({ label }) => {
  return (
    <div className="my-4">
      <label className="block mb-2 font-medium">{label}</label>
      <input 
        type="file" 
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
    </div>
  );
};

export default UploadSection;
