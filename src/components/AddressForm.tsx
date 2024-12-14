import React from 'react';
import type { ResidentialAddress } from '../types';

interface AddressFormProps {
  address: ResidentialAddress;
  onChange: (address: ResidentialAddress) => void;
}

export default function AddressForm({ address, onChange }: AddressFormProps) {
  const handleChange = (field: keyof ResidentialAddress, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="House No. or Name / घर का नंबर या नाम"
        value={address.houseNo}
        onChange={(e) => handleChange('houseNo', e.target.value)}
        className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
      />
      <input
        type="text"
        placeholder="Street Name / सड़क का नाम"
        value={address.street}
        onChange={(e) => handleChange('street', e.target.value)}
        className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
      />
      <input
        type="text"
        placeholder="Locality / इलाका"
        value={address.locality}
        onChange={(e) => handleChange('locality', e.target.value)}
        className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
      />
      <input
        type="text"
        placeholder="City / शहर"
        value={address.city}
        onChange={(e) => handleChange('city', e.target.value)}
        className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
      />
      <input
        type="text"
        placeholder="Pin Code / पिन कोड"
        value={address.pinCode}
        onChange={(e) => handleChange('pinCode', e.target.value)}
        className="w-full p-3 rounded bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
        pattern="[0-9]*"
        inputMode="numeric"
        maxLength={6}
      />
    </div>
  );
}