import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/lenders';
import { LendersService } from 'src/app/services/lenders.service';

@Component({
  selector: 'app-lender-contacts',
  templateUrl: './lender-contacts.component.html',
  styleUrls: ['./lender-contacts.component.css']
})
export class LenderContactsComponent implements OnInit {
  @Input() General:any;
  constructor(public activatedRoute: ActivatedRoute,private LendersService: LendersService) { }

  ContactModel: Contact ;
  editing:boolean = false;
  ngOnInit(): void {
    this.ContactModel = new Contact();
    this.getContacts(this.General.Organization.id);

  }

  getContacts(OrgId:any){
    this.LendersService.OrgContacts(OrgId).subscribe(data => {
      this.General.Organization.contacts = data;
    });
  }

  onSubmit() {
    this.LendersService.SaveContacts(this.ContactModel).subscribe(data => {

    });
  }

  closeModal(){
    this.editing = false;
    this.ContactModel=  new Contact();
  }


}
