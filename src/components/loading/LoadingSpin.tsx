// components/LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-fit">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.2);
          border-left-color: #4f46e5; /* Warna spinner */
          border-radius: 50%;
          width: 64px;
          height: 64px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
