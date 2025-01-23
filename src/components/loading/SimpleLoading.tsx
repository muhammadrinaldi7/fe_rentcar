// components/SimpleLoading.js
import React from "react";

const SimpleLoading = () => {
  return (
    <div className="flex items-center justify-center h-fit">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default SimpleLoading;
