import React from 'react';
import type { UserData } from '../types';

interface ProfileDisplayProps {
  userData: UserData;
  profilePicture?: string;
}

export default function ProfileDisplay({ userData, profilePicture }: ProfileDisplayProps) {
  return (
    <div className="w-[90%] max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center mb-6">
        {profilePicture && (
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="border-b border-white/20 pb-3">
          <label className="text-gray-300 text-sm">NAME</label>
          <p className="text-[18px] font-bold">{userData.name}</p>
        </div>

        <div className="border-b border-white/20 pb-3">
          <label className="text-gray-300 text-sm">MOBILE</label>
          <p className="text-[16px] font-bold">{userData.mobile}</p>
        </div>

        <div className="border-b border-white/20 pb-3">
          <label className="text-gray-300 text-sm">AGE</label>
          <p className="text-[16px] font-bold">{userData.age}</p>
        </div>

        <div className="pb-3">
          <label className="text-gray-300 text-sm">LANGUAGES</label>
          <p className="text-[16px] font-bold">
            {userData.languages.split(',').map(lang => lang.trim()).join(', ')}
          </p>
        </div>

        <div className="mt-6">
          <label className="text-gray-300 text-sm">COOKING SPECIALTIES</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {userData.cookingTypes.map((type) => (
              <span
                key={type}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
            {userData.otherCookingType && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {userData.otherCookingType}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}