import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { General, OrganizationProjectType, ProjectType } from './../../models/lenders';
import { LendersService } from 'src/app/services/lenders.service';

@Component({
  selector: 'app-lendersdetails',
  templateUrl: './lendersdetails.component.html',
  styleUrls: ['./lendersdetails.component.css']
})
export class LendersdetailsComponent implements OnInit {
  OrganiztionId:number;
  hideModal:boolean = false;
  Isloaded:boolean = false;

  @ViewChild('closebutton') closebutton;

  constructor(public activatedRoute: ActivatedRoute, public General:General ,private LendersService: LendersService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.OrganiztionId =  params.organizationId;

      if(this.General.Organizations.length  !== 0){
        this.General.Organization = this.General.Organizations.find(x => x.id == this.OrganiztionId);
        this.Isloaded = true;
      }
      else{
        this.LendersService.GetOrganizationsById(this.OrganiztionId).subscribe((data:any) => {
          this.General.Organization = data;
          this.Isloaded = true;
        });
      }
    })
    this.GetProjectType();
  }


  GetProjectType(){
    this.LendersService.ProjectTypes().subscribe((data:any) => {
      this.General.ProjectTypes = data;
      this.General.ProjectTypes = this.General.ProjectTypes?.filter(x => !this.General.Organization?.organizationProjectTypes.find(y => y.typeId == x.id));
    });
  }

  DeleteProjectTypeConnection(id:number ,  Type:ProjectType){
    this.LendersService.DeleteProjectTypeConnection(id).subscribe((data:any) => {
      this.General.Organization.organizationProjectTypes.splice(this.General.Organization.organizationProjectTypes.findIndex(x => x.id == id),1);
      this.General.ProjectTypes = [...this.General.ProjectTypes , Type];
    });
  }

  addedTypesIds:OrganizationProjectType[] = [];
  check(event: any) {
    var checked = event.target.checked;
    var typeId = +event.target.value;
      if (checked) {
      this.addedTypesIds.push({'typeId':typeId,'organizationId':this.General.Organization.id});
    } else {
      var index = this.addedTypesIds.indexOf({'typeId':typeId,'organizationId':this.General.Organization.id});
      this.addedTypesIds.splice(index, 1);
    }
  }

  SendNewOrgProjectTypes(){
    this.LendersService.SendNewOrgProjectTypes(this.addedTypesIds).subscribe((data:any[]) => {
      this.General.Organization.organizationProjectTypes = this.General.Organization.organizationProjectTypes.concat(data);
      this.General.ProjectTypes = this.General.ProjectTypes.filter(x => !data.find(y => y.typeId == x.id));
      this.closebutton.nativeElement.click();
    });
  }


}
