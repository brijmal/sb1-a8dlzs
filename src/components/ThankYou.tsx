import React from 'react';

export default function ThankYou() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4">
            Thanks for filling your details. <span className="text-yellow-300">CookJobs4U</span> will get back to you in just a few days with jobs in your locality
          </h1>
          <p className="text-xl">
            विवरण भरने के लिए धन्यवाद। <span className="text-yellow-300">CookJobs4U</span> कुछ ही दिनों में आपके क्षेत्र में नौकरियों के साथ आपसे संपर्क करेगा
          </p>
        </div>
      </div>
    </div>
  );
}