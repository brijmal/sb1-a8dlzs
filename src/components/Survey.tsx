import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import Compressor from 'compressorjs';
import { getCurrentLocation } from '../utils/location';
import { saveUserData } from '../services/userService';
import type { UserData, ResidentialAddress } from '../types';
import CookingTypes from './CookingTypes';
import AddressForm from './AddressForm';

export default function Survey() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    mobile: '',
    age: '',
    languages: '',
    currentAddress: '',
    isSameAddress: true,
    residentialAddress: {
      houseNo: '',
      street: '',
      locality: '',
      city: '',
      pinCode: '',
    },
    cookingTypes: [],
    otherCookingType: '',
  });
  const [profilePic, setProfilePic] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCurrentLocation()
      .then((address) => {
        setUserData((prev) => ({ ...prev, currentAddress: address }));
      })
      .catch((error) => {
        console.error('Location error:', error);
        setErrors(prev => ({
          ...prev,
          location: 'Unable to get location. Please try again. / स्थान प्राप्त करने में असमर्थ। कृपया पुनः प्रयास करें।'
        }));
      });
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePic: 'Image size should be less than 5MB / छवि का आकार 5MB से कम होना चाहिए'
        }));
        return;
      }

      new Compressor(file, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePic(reader.result as string);
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.profilePic;
              return newErrors;
            });
          };
          reader.onerror = () => {
            setErrors(prev => ({
              ...prev,
              profilePic: 'Error processing image / छवि प्रसंस्करण में त्रुटि'
            }));
          };
          reader.readAsDataURL(compressedFile);
        },
        error: () => {
          setErrors(prev => ({
            ...prev,
            profilePic: 'Error compressing image / छवि संपीड़न में त्रुटि'
          }));
        },
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.name.trim()) {
      newErrors.name = 'Name is required / नाम आवश्यक है';
    }

    if (!userData.mobile.match(/^\d{10}$/)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number / 10 अंकों का मोबाइल नंबर दर्ज करें';
    }

    if (!userData.age.match(/^\d{2}$/)) {
      newErrors.age = 'Enter valid 2-digit age / सही उम्र दर्ज करें';
    }

    if (!userData.languages.trim()) {
      newErrors.languages = 'Languages are required / भाषाएं आवश्यक हैं';
    }

    if (!userData.isSameAddress) {
      const address = userData.residentialAddress;
      if (!address.houseNo || !address.street || !address.locality || !address.city || !address.pinCode) {
        newErrors.residentialAddress = 'All residential address fields are required / सभी आवासीय पते के फ़ील्ड आवश्यक हैं';
      }
      if (address.pinCode && !address.pinCode.match(/^\d{6}$/)) {
        newErrors.pinCode = 'Enter valid 6-digit pin code / 6 अंकों का पिन कोड दर्ज करें';
      }
    }

    if (userData.cookingTypes.length === 0) {
      newErrors.cookingTypes = 'Select at least one cooking type / कम से कम एक पाक विधि चुनें';
    }

    if (!profilePic) {
      newErrors.profilePic = 'Profile picture is required / प्रोफ़ाइल चित्र आवश्यक है';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await saveUserData(userData, profilePic);
        navigate('/thank-you', { 
          state: { 
            userData,
            profilePicture: profilePic
          }
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Unable to save data. Please try again later. / डेटा सहेजने में असमर्थ। कृपया बाद में पुनः प्रयास करें।'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white overflow-hidden mb-2">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <label className="bg-purple-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-purple-600">
            Click to upload your pic / अपनी तस्वीर अपलोड करें
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden"
              capture="user"
            />
          </label>
          {errors.profilePic && <p className="text-red-300 text-sm mt-1">{errors.profilePic}</p>}
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name / नाम"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
            />
            {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Mobile Number / मोबाइल नंबर"
              value={userData.mobile}
              onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
              className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {errors.mobile && <p className="text-red-300 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Age / उम्र"
              value={userData.age}
              onChange={(e) => setUserData({ ...userData, age: e.target.value })}
              className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={2}
            />
            {errors.age && <p className="text-red-300 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Languages Known / जानी जाने वाली भाषाएं"
              value={userData.languages}
              onChange={(e) => setUserData({ ...userData, languages: e.target.value })}
              className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
            />
            {errors.languages && <p className="text-red-300 text-sm mt-1">{errors.languages}</p>}
          </div>

          <div>
            <label className="block text-white mb-2">Current Address / वर्तमान पता</label>
            <input
              type="text"
              value={userData.currentAddress}
              readOnly
              className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white"
            />
            {errors.location && <p className="text-red-300 text-sm mt-1">{errors.location}</p>}
          </div>

          <div className="space-y-3">
            <p className="text-white">Is this your residential address? / क्या यह आपका आवासीय पता है?</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={userData.isSameAddress}
                  onChange={() => setUserData({ ...userData, isSameAddress: true })}
                  className="w-4 h-4"
                />
                <span className="text-white">Yes / हाँ</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!userData.isSameAddress}
                  onChange={() => setUserData({ ...userData, isSameAddress: false })}
                  className="w-4 h-4"
                />
                <span className="text-white">No / नहीं</span>
              </label>
            </div>
          </div>

          {!userData.isSameAddress && (
            <div className="space-y-3">
              <p className="text-white">Residential Address / आवासीय पता</p>
              <AddressForm
                address={userData.residentialAddress}
                onChange={(address) => setUserData({ ...userData, residentialAddress: address })}
              />
              {errors.residentialAddress && (
                <p className="text-red-300 text-sm">{errors.residentialAddress}</p>
              )}
              {errors.pinCode && <p className="text-red-300 text-sm">{errors.pinCode}</p>}
            </div>
          )}

          <div>
            <CookingTypes
              selectedTypes={userData.cookingTypes}
              otherType={userData.otherCookingType || ''}
              onTypeChange={(types) => setUserData({ ...userData, cookingTypes: types })}
              onOtherTypeChange={(value) => setUserData({ ...userData, otherCookingType: value })}
            />
            {errors.cookingTypes && <p className="text-red-300 text-sm mt-1">{errors.cookingTypes}</p>}
          </div>
        </div>

        {errors.submit && (
          <p className="text-red-300 text-sm text-center">{errors.submit}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting... / जमा हो रहा है...' : 'Submit / जमा करें'}
        </button>
      </form>
    </div>
  );
}