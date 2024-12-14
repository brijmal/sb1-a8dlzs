import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../lib/firebase';
import type { UserData } from '../types';

// Initialize Firestore with custom settings
const db = getFirestore(app);

export const saveUserData = async (userData: UserData, profilePicture: string) => {
  try {
    // Add timestamp and clean up the data
    const cleanUserData = {
      name: userData.name.trim(),
      mobile: userData.mobile.trim(),
      age: userData.age.trim(),
      languages: userData.languages.trim(),
      currentAddress: userData.currentAddress.trim(),
      isSameAddress: userData.isSameAddress,
      // Include residential address only if it's not the same as current address
      ...((!userData.isSameAddress && userData.residentialAddress) ? {
        residentialAddress: {
          houseNo: userData.residentialAddress.houseNo.trim(),
          street: userData.residentialAddress.street.trim(),
          locality: userData.residentialAddress.locality.trim(),
          city: userData.residentialAddress.city.trim(),
          pinCode: userData.residentialAddress.pinCode.trim(),
        }
      } : {}),
      cookingTypes: userData.cookingTypes,
      otherCookingType: userData.otherCookingType?.trim() || '',
      profilePicture,
      createdAt: new Date().toISOString(),
      status: 'pending',
      lastUpdated: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(cleanUserData).forEach(key => {
      if (cleanUserData[key] === undefined) {
        delete cleanUserData[key];
      }
    });

    const docRef = await addDoc(collection(db, 'users'), cleanUserData);
    
    if (!docRef.id) {
      throw new Error('Failed to save user data');
    }

    return docRef.id;
  } catch (error) {
    console.error('Error saving user data:', error);
    // Provide more specific error message to the user
    if (error.code === 'permission-denied') {
      throw new Error('Unable to save data. Please try again later.');
    }
    throw error;
  }
};