import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LendersService } from 'src/app/services/lenders.service';
import { General, LoanProfile } from './../../../models/lenders';

@Component({
  selector: 'app-newloanprofile',
  templateUrl: './newloanprofile.component.html',
  styleUrls: ['./newloanprofile.component.css']
})
export class NewloanprofileComponent implements OnInit {
  organiztionId:number;
  organizationName:string;
  newLoanProfile: LoanProfile ;
  edit:boolean=false;

  constructor(public activatedRoute: ActivatedRoute, public General:General ,private LendersService: LendersService,
    public router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) =>{
      this.organiztionId =  params.organizationId;
      if(params.loanProfileId==null){
        this.newLoanProfile = new LoanProfile();
        this.newLoanProfile.organizationId = +this.organiztionId;
      }else{
        this.edit=true;
        this.General.Organization.loanProfiles.forEach(element => {
          if(element.id==params.loanProfileId){
            this.newLoanProfile = element;
          }
        }
        );
      }
    })
}

  onSubmit(){
    if(!this.edit){
    this.LendersService.SaveLoanProfile(this.newLoanProfile).subscribe((data:any)=>{
      this.General.Organizations.forEach(element => {
        if(element.id == this.organiztionId){
          element.loanProfiles.push(data);
          this.router.navigate(['/lenders', this.organiztionId]);
        }
      });
    })
  }
  else{
    this.LendersService.UpdateLoanProfile(this.newLoanProfile , this.newLoanProfile.id).subscribe((data:any)=>{

      this.General.Organization.loanProfiles.forEach(element => {
        if(element.id == this.newLoanProfile.id){
          element = data;
          this.router.navigate(['/lenders', this.organiztionId]);
          return;
        }
      }
      );
    } )

  }
  }

}
