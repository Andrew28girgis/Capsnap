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
  loanProfiles: LoanProfile[];
  name: string;
  organizationProjectTypes: OrganizationProjectType[];
  phoneNumber: string;
  states: string;
  url: string;
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
  investor:string;
  tenancy:string;
  ownerOccupier:string;
  targetCountries:  string;
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
