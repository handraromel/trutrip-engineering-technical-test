import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToAssessment = () => {
    navigate('/users');
  };

  return (
    <div className="p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">Welcome to TruTrip Technical Assessment Page</h1>
      <p>
        This web app is intended to demonstrate the result of Front-End technical assessment using
        React and Typescript.
      </p>
      <button
        className="mt-6 cursor-pointer rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-700"
        onClick={handleGoToAssessment}
      >
        Go to Users Management
      </button>
    </div>
  );
};

export default HomePage;
