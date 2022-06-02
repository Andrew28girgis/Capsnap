import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { General, LoanProfile, Organizations } from 'src/app/models/lenders';
import { LendersService } from 'src/app/services/lenders.service';
@Component({
  selector: 'app-loan-profile-details',
  templateUrl: './loan-profile-details.component.html',
  styleUrls: ['./loan-profile-details.component.css']
})
export class LoanProfileDetailsComponent implements OnInit {

  loanProfile: LoanProfile = new LoanProfile();
  isLoading: Boolean = true;
  general:General;
  JSON:JSON;

  constructor(private activatedRoute: ActivatedRoute, private LendersService: LendersService,
    private router: Router) {
    this.JSON =JSON;
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.general =JSON.parse( params.General);
      this.loanProfile =  this.general.Organization.loanProfiles.find(lp => lp.id == params.loanProfileId);
      this.isLoading = false;
    })
  }

}
