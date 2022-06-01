import { LendersService } from 'src/app/services/lenders.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanProfile, Organizations } from 'src/app/models/lenders';

@Component({
  selector: 'app-lenders-loanprofile',
  templateUrl: './lenders-loanprofile.component.html',
  styleUrls: ['./lenders-loanprofile.component.css']
})
export class LendersLoanprofileComponent implements OnInit {
  JSON:JSON;
  constructor(public activatedRoute: ActivatedRoute,private LendersService: LendersService) { 
    this.JSON =JSON
  }

  @Input() General:any;
  @ViewChild('f') myForm;
  @ViewChild('closebutton') closebutton;

  Editing:boolean = false;
  LoanProfileModel: any = {};



  ngOnInit(): void {
    this.GetOrgLoanProfile(this.General.Organization.id);
  
  }

  GetOrgLoanProfile(OrganizationId:number){
    this.LendersService.OrgLoanProfile(OrganizationId).subscribe(data => {
      this.General.Organization.loanProfiles = data;
    });
  }

  DeleteLoanProfiles(loanProfile:LoanProfile ){
    this.LendersService.DeleteLoanProfiles(loanProfile).subscribe( () => {
      this.General.Organization.loanProfiles.splice(this.General.Organization.loanProfiles.findIndex(x => x == loanProfile),1);
    });
  }

  EditLoanProfile(LoanProfile:LoanProfile){
    this.Editing = true;
    this.LoanProfileModel = LoanProfile;
  }

  closeModal(){
    this.Editing = false;
    this.LoanProfileModel={};
  }

}
