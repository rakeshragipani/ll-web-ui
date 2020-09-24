export interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  age: number;
  createTime: string;
  altEmail: string;
  retirementAge: number;
  email: string;
  refBroker: string;
  phoneNumber: number;
  cognitoUsername: String;
  tenant_id: String;
  state: string;
  active: boolean;
  uuid: string;
  login_time: string;
  accountid: string;
  userPreferences: {
    accountInfo: boolean;
    newsLetters: boolean;
    secureLogin: boolean;
    newFeatures: boolean;
    betaPrograms: boolean;
  };
  additionalInformation: object;
  address1: string;
  address2: string;
  city: string;
  stateName: string;
  zipCode: number;
  profileImage: string;
  paymentPlan: string;
}
