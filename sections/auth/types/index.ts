export interface IUser {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

export interface IAccountHolderInfo {
  accountHolderUid: string;
  accountHolderType: 'NDIVIDUAL' | 'BUSINESS' | 'SOLE_TRADER' | 'JOINT' | 'BANKING_AS_A_SERVICE';
}

export interface IAccountHolderName {
  accountHolderName: string;
}
