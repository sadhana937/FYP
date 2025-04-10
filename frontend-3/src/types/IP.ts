export interface OwnerDetails {
  name: string;
  email: string;
  physicalAddress: string;
}

export interface OptionalFields {
  workType?: string;
  classOfGoods?: string;
  inventors?: string[];
  domainName?: string;
  publicationDate?: string;
}

export interface IP {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  ipType: string;
  dateOfCreation: string;
  dateOfRegistration: string;
  license: string[];
  licenseIncentive: string;
  tags: string[];
  ownerDetails: OwnerDetails;
  optionalFields?: OptionalFields;
  ownerAddress?: string;
  owner?: OwnerDetails;
  creationDate?: string;
  registrationDate?: string;
}

export interface TransferOwnership {
  id: number;
  newOwnerAddress: string;
  newOwnerDetails: OwnerDetails;
}

export interface LicenseRequest {
  id: number;
  incentiveAmount: string;
}