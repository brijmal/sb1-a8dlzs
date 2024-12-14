export interface ResidentialAddress {
  houseNo: string;
  street: string;
  locality: string;
  city: string;
  pinCode: string;
}

export interface UserData {
  name: string;
  mobile: string;
  age: string;
  languages: string;
  currentAddress: string;
  isSameAddress: boolean;
  residentialAddress: ResidentialAddress;
  cookingTypes: string[];
  otherCookingType?: string;
  profilePicture?: File;
}