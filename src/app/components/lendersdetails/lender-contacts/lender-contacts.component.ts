import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, ContactsLoanProfile, General, LoanProfile } from 'src/app/models/lenders';
import { LendersService } from 'src/app/services/lenders.service';

@Component({
  selector: 'app-lender-contacts',
  templateUrl: './lender-contacts.component.html',
  styleUrls: ['./lender-contacts.component.css']
})
export class LenderContactsComponent implements OnInit {
  @Input() General: General;
  constructor(public activatedRoute: ActivatedRoute, private LendersService: LendersService) { }

  ContactModel: Contact;
  contactsLoanProfile: ContactsLoanProfile = new ContactsLoanProfile();
  contactsLoanProfiles: ContactsLoanProfile[] = [];
  values: string = "";

  editing: boolean = false;
  ngOnInit(): void {

    this.ContactModel = new Contact();
    this.getContacts(this.General.Organization.id);

  }

  getContacts(OrgId: any) {
    this.LendersService.OrgContacts(OrgId).subscribe(data => {
      this.General.Organization.contacts = data;
      console.log(this.General.Organization.loanProfiles);
    });
  }

  onSubmit() {
    this.LendersService.SaveContacts(this.ContactModel).subscribe(newContact => {
      if(newContact != null)
      {
        this.contactsLoanProfiles.forEach(clp=>{
          clp.contactId = newContact.id;
        });
        this.LendersService.SaveContactConnection(this.contactsLoanProfiles).subscribe(lpConnections => {
          newContact.contactsLoanProfile = lpConnections;
          this.General.Organization.contacts.concat(newContact);
          this.General.Organization.loanProfiles.forEach(element => {
              lpConnections.forEach(
                lpConnection=>
                {
                  if(lpConnection.loanProfileId == element.id)
                  {
                    element.contacts.concat(newContact);     
                  }
                }
              )
          });
        });
      }
    });
  }

  closeModal() {
    this.editing = false;
    this.ContactModel = new Contact();
  }

  onItemSelected(checked: boolean, loanProfile: LoanProfile) {
    if (checked) {
      this.values = this.values.concat(loanProfile.programName);
      this.contactsLoanProfile =new ContactsLoanProfile();
      this.contactsLoanProfile.loanProfileId = loanProfile.id;
      this.contactsLoanProfiles= this.contactsLoanProfiles.concat(this.contactsLoanProfile);
    } else {
      var s = this.contactsLoanProfiles.find(clp => clp.loanProfileId == loanProfile.id);
      this.contactsLoanProfiles.forEach((clp, index) => {
        if (clp.loanProfileId == loanProfile.id) {
          delete this.contactsLoanProfiles[index];
          return;
        }
      });
    }
  }
}
