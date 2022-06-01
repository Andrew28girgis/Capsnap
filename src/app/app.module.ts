import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DealsComponent } from './components/deals/deals.component';
import { HttpClientModule } from '@angular/common/http';
import { DealDetailsComponent } from './components/deal-details/deal-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { AlphaPipe } from './pipes/alpha.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SendToLendersComponent } from './components/send-to-lenders/send-to-lenders.component';
import { MatTableModule} from '@angular/material/table';
import { SearchOrgPipe } from './pipes/search-org.pipe';
import { TypePipe } from './pipes/type.pipe';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { EmailBodyComponent } from './components/email-body/email-body.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MainDealComponent } from './components/main-deal/main-deal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './components/user/user.component';
import { MailToMicrodealComponent } from './components/mail-to-microdeal/mail-to-microdeal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LandingDealComponent } from './components/landing-deal/landing-deal.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AdvancedSearchPipe } from './pipes/advanced-search.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PipedriveIdPipe } from './pipes/pipedrive-id.pipe';
import { LoanComponent } from './components/loan/loan.component';
import { IntakevaluesComponent } from './components/intakevalues/intakevalues.component';
import { UploadGlobalDsComponent } from './components/upload-global-ds/upload-global-ds.component';
import { MatButtonModule } from '@angular/material/button';
import { TreeModule } from '@circlon/angular-tree-component';
import { LendersComponent } from './components/lenders/lenders.component';
import { LendersdetailsComponent } from './components/lendersdetails/lendersdetails.component';
import { SearchnamelenderPipe } from './pipes/searchnamelender.pipe';
import { LendersLoanprofileComponent } from './components/lenders-loanprofile/lenders-loanprofile.component';
import { NewloanprofileComponent } from './components/lenders-loanprofile/newloanprofile/newloanprofile.component';
import { LoanProfileDetailsComponent } from './components/lenders-loanprofile/loan-profile-details/loan-profile-details.component';
import { LenderContactsComponent } from './components/lendersdetails/lender-contacts/lender-contacts.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DealsComponent,
    DealDetailsComponent,
    SearchPipe,
    AlphaPipe,
    SendToLendersComponent,
    SearchOrgPipe,
    TypePipe,
    EmailBodyComponent,
    InboxComponent,
    MainDealComponent,
    UserComponent,
    MailToMicrodealComponent,
    LandingPageComponent,
    LandingDealComponent,
    AdvancedSearchPipe,
    PipedriveIdPipe,
    LoanComponent,
    IntakevaluesComponent,
    UploadGlobalDsComponent,
    LendersComponent,
    LendersdetailsComponent,
    SearchnamelenderPipe,
    LendersLoanprofileComponent,
    NewloanprofileComponent,
    LoanProfileDetailsComponent,
    LenderContactsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableModule,
    RichTextEditorModule,
    DialogModule,
    NgbModule,
    NgxFileDropModule ,
    MatButtonModule  ,
    TreeModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
