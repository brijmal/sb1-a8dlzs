import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      await navigator.geolocation.getCurrentPosition(() => {
        navigate('/survey');
      });
    } catch (error) {
      console.error('Location access denied');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to <span className="text-yellow-300">CookJobs4U</span>
      </h1>
      <h2 className="text-xl mb-8">Get the job you want in your locality</h2>
      
      <p className="mb-8 text-lg">
        <span className="text-yellow-300">CookJobs4U</span> में आपका स्वागत है
        अपने क्षेत्र में अपनी पसंद की नौकरी पाएं
      </p>

      <button
        onClick={handleStart}
        className="flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
      >
        <MapPin size={20} />
        <span>Start / शुरू करें</span>
      </button>
    </div>
  );
}