import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="mb-8 flex items-center space-x-4">
        <h1 className="text-4xl font-bold text-white">Loading The App</h1>
      </div>
      <p className="mt-4 text-lg font-semibold text-white">Please wait...</p>
    </div>
  );
};

export default LoadingScreen;
