import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Deal, General, Scenario  ,Group} from 'src/app/models/domain';
import { Pipeline, RootObjectPipelines } from 'src/app/models/mainPipeLines';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';

@Component({
  selector: 'app-mail-to-microdeal',
  templateUrl: './mail-to-microdeal.component.html',
  styleUrls: ['./mail-to-microdeal.component.css']
})
export class MailToMicrodealComponent implements OnInit {
  General:General;
  Deal:Deal;
  pipeLines: Pipeline[] = [];
  currentDeals:any[] =[];
  MicroDealId:number;
  togglebody:boolean =false;


  constructor(public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ,private modalService: NgbModal) { }


  ngOnInit(): void {
    this.General = new General();
    this.GetPipeLine();
  }

  GetMessageId(){
    this.spinner.show();
    this.PipeLinesService.GetMailByMessageId(this.General.messageid).subscribe((res:any)=>{
      this.General.Mail = res;
      this.spinner.hide();
    })
  }

  GetPipeLine(){
    this.PipeLinesService.getPipeLine().subscribe((res:RootObjectPipelines) =>{      
      this.pipeLines = res.data;
      for (let pipeLine of this.pipeLines) {
        for (let stage of pipeLine.stages.data) {
          this.PipeLinesService.getDeals(stage.id).subscribe(res=>{
            this.currentDeals.push(... res);
            this.currentDeals.sort(function(a, b){
              if (a.title < b.title) { return -1; }
              if (a.title > b.title) { return 1; }
              return 0;
          })    
          })
        }
      }
    })
  }

  GetDealScenarios(e){
    this.PipeLinesService.getScenario(e.target.value).subscribe((res:Scenario[]) => {
        this.General.Scenarios = res;
    });
   }

   GetScenarioGroups(e){
    this.PipeLinesService.GetActiveCampaignPipelinesForScenario(e.target.value).subscribe((res: any) =>{
      this.General.groups =res.dealGroups;
    })
   }

   GetGroupMicroDeals(e){ 
    this.PipeLinesService.GetActiveCampaignDealsForPipeline(e.target.value).subscribe((res:any)=>{
      this.General.microdeals = res.deals;
    })
   }

   GetMicroDealId(e){
      this.MicroDealId = e.target.value;
   }

   AssignMailToMicroDeal(){
     this.spinner.show();
    this.PipeLinesService.AssignMailToMicroDeal(this.General.Mail.id , this.MicroDealId).subscribe(res =>{
      console.log(res);
      this.spinner.hide();
    })
  }

}