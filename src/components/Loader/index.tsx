import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
