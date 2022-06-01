import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class General{
  Organizations:Organizations[]=[];
  Organization:Organizations;
  ProjectTypes:ProjectType[]=[];

}

export class Organizations {
  address: string;
  contactsHistories: any[];
  description: string;
  id: number;
  isActive: boolean;
  lenderType: string;
  linkedIn: string;
  name: string;
  phoneNumber: string;
  states: string;
  url: string;
  organizationProjectTypes: OrganizationProjectType[];
  loanProfiles: LoanProfile[];
  contacts:Contact[];
}

export class OrganizationProjectType{
  id?:number;
  organizationId:number;
  type?:ProjectType;
  typeId:number;
}

export class ProjectType {
  id: number;
  type : string;
}

export class LoanProfile{
  id:number;
  organizationId:number;
  programName :string;
  notes:string;
  targetStates:string;
  targetCountries:  string;
  investor:string;
  ownerOccupier:string;
  tenancy:string;
  sponsorStates: string;
  international: boolean;
  recourse:string ;
  contacts:any[] ;
  leasedFee :number;
  minimumLoanSize :number;
  maximumLoanSize :number;
  maxLtv :number;
  maxLtc :number;
  asStabilizedLtv :number;
  mindscr :number;
  loanProgramType :string;
  lenderPays :number;
  lenderFee :number;
  disableAutoMatch  :boolean;
  contractStatus  :string;
  requiredFiles :string;
  rateIndex :string;
  minimumSpread :number;
  maximumSpread :number;
  typicalAmortization : string;
  prepaymentPenalty :string;
  lastUpdated :Date;
  lastUpdatedBy :string;
  targetCounties :string;
}


export class Contact{
  id:number;
  firstName:string;
  lastName:string;
  cellPhone:string;
  email:string;
  linkedIn:string;
}
