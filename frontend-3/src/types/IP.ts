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
  // _id?: string;
  id: number;
  name: string;
  description: string;
  ipType: string;
  dateOfCreation: string;
  dateOfRegistration: string;
  license: string[];
  licenseIncentive: number;
  tags: string[];
  owner: OwnerDetails;
  optionalFields?: OptionalFields;
  ownerAddress?: string;
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