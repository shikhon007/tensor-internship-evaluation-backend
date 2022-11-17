export interface ICreateUser {
  companyName: string;
  representativeName: string;
  representativeNid: string;
  address: string;
  email: string;
  mobile: string;
  name: string;
  contact: string;
  postalCode: string;
}

export interface IUpdateUser {
  companyName: string;
  representativeName: string;
  representativeNid: string;
  address: string;
  email: string;
  mobile: string;
  name: string;
  contact: string;
  postalCode: string;
}

export interface ICheckDuplicate {
  companyName?: string;
  email?: string;
  mobile?: string;
}
