import { General } from './../../models/lenders';
import { Organizations } from './../../models/lenders';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LendersService } from 'src/app/services/lenders.service';


@Component({
  selector: 'app-lenders',
  templateUrl: './lenders.component.html',
  styleUrls: ['./lenders.component.css']
})

export class LendersComponent implements OnInit {
  hideModal:boolean = false;
  editing:boolean = false;
  LenderName='';
  page = 1;
  pageSize =6;
  items = [];

  constructor(public activatedRoute: ActivatedRoute,public router: Router,private LendersService: LendersService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ,
    private modalService: NgbModal,private viewportScroller: ViewportScroller, public General:General) { }

  ngOnInit(): void {
    this.GetOrganizations();
  }
  @ViewChild('f') myForm;

  @ViewChild('closebutton') closebutton;

  OrgModel: any = {};
  onSubmit() {
    if(!this.editing ){
     if(this.OrgModel['id']){
        delete this.OrgModel['id'];
     }
    this.LendersService.SaveOrganization(this.OrgModel).subscribe((data:any) => {
      this.General.Organizations = [...this.General.Organizations ,data];
      this.hideModal =! this.hideModal;
      this.closebutton.nativeElement.click();
      this.myForm.resetForm();
     },
      error => {
        console.log(error);
      }
    );
  }else{
    this.LendersService.UpdateOrganization(this.OrgModel).subscribe((data:any) => {
      this.General.Organizations = this.General.Organizations.map(x => {
        if(x.id == data.id){
          x = data;
        }
        return x;
      });

      this.hideModal =! this.hideModal;
      this.closebutton.nativeElement.click();
      this.myForm.resetForm();
      },);
  }
  }

  GetOrganizations() {
    this.LendersService.GetOrganizations().subscribe(data => {
      this.General.Organizations = data;
     }
    );
  }

  DeleteOrganization(Organization:Organizations){
    this.LendersService.DeleteOrganization(Organization).subscribe(data => {
      this.General.Organizations = this.General.Organizations.filter(x => x.id != Organization.id);
     }
    );
  }

  EditOrganization(Organization:Organizations){
    this.editing = true;
    this.OrgModel = Organization;
  }

  closeModal(){
    this.editing = false;
    this.OrgModel={};
  }

}
