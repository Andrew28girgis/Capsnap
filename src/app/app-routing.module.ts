import { LendersdetailsComponent } from './components/lendersdetails/lendersdetails.component';
import { LendersComponent } from './components/lenders/lenders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealsComponent } from './components/deals/deals.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { IntakevaluesComponent } from './components/intakevalues/intakevalues.component';
import { LandingDealComponent } from './components/landing-deal/landing-deal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoanComponent } from './components/loan/loan.component';
import { MailToMicrodealComponent } from './components/mail-to-microdeal/mail-to-microdeal.component';
import { MainDealComponent } from './components/main-deal/main-deal.component';
import { UploadGlobalDsComponent } from './components/upload-global-ds/upload-global-ds.component';
import { UserComponent } from './components/user/user.component';
import { NewloanprofileComponent } from './components/lenders-loanprofile/newloanprofile/newloanprofile.component';
import { LoanProfileDetailsComponent } from './components/lenders-loanprofile/loan-profile-details/loan-profile-details.component';

const routes: Routes = [
  {path:'',component:DealsComponent},
  {path:'deals' , component:DealsComponent} ,
  {path:'main/:id/:Scid/:GpId/:MicroId' , component:MainDealComponent} ,
  {path:'main/:id' , component:MainDealComponent} ,
  {path:'user/:dealid/:microdealId/:groupId' , component:UserComponent} ,
  {path:'page/:id' ,component:LandingDealComponent} ,
  {path:'mailToMicrodeal' , component:MailToMicrodealComponent} ,
  {path:'inbox' , component:InboxComponent},
  {path:'loan' , component:LoanComponent},
  {path:'landing' , component:LandingPageComponent} ,
  {path:'UploadGlobalDataSource' , component:UploadGlobalDsComponent} ,
  {path:'intake/:id' , component:IntakevaluesComponent},
  {path:'lenders' , component:LendersComponent} ,
  {path:'lenders/:organizationId' , component:LendersdetailsComponent} ,
  {path:'lenders/:organizationId/newLoanProfile' , component:NewloanprofileComponent},
  {path:'lenders/:organizationId/:loanProfileId/edit' , component:NewloanprofileComponent},
  {path:'lenders/:organizationId/:loanProfileId/details' , component:LoanProfileDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
