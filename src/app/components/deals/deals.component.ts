import { Component, ViewChild,ElementRef,  OnInit, ViewEncapsulation, ViewChildren, QueryList,} from '@angular/core';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Pipeline } from 'src/app/models/mainPipeLines';
import { General, UniqueStage } from 'src/app/models/domain';

@Component({
  selector:'app-deals',
  templateUrl:'./deals.component.html',
  styleUrls: ['./deals.component.css'] ,
  encapsulation: ViewEncapsulation.None,
})

export class DealsComponent implements OnInit {
  General:General;
  public isActive:boolean = false;
  public pipeLines: Pipeline[] = [];
  public activePipeIndex!: number;
  public activeStagesData:any[]=[];
  public allDeals:any[]=[];
  currentDeals :any[] =[];
  selectedIndex!:number;

  constructor(private PipeLinesService:PipeLinesService ,private spinner: NgxSpinnerService) { }

  @ViewChild('widgetsContent')  widgetsContent: ElementRef;

  ngOnInit(): void {
    this.General = new General();
    this.spinner.show();
    this.PipeLinesService.GetAllMacroDeals().subscribe((res:any) =>{

      this.General.MacroDeal = res ;
      let pipeline = [];
      res.forEach(element => { pipeline.push(element.pipeline) });
      this.General.pipeline = pipeline.filter(function(elem, index, self) {
       return index === self.indexOf(elem) })
    })

    this.PipeLinesService.GetAllActiveMicroDeals().subscribe(res=>{
      this.General.ActiveMicroDeals = res;
    })
    this.GetActiveMacroDeals();
    this.loadActiveAccouts();
    this.GetMacroDealStats();
    this.GetMicroDealStats();
    this.activePipeIndex=-1;
    this.loadTimeLine();
    this.LoadSync();

  }
   
 // End Of Init  

 Sync(){
  this.PipeLinesService.Sync().subscribe(res=>{
    console.log(res);
  })
}

LoadSync(){
  this.PipeLinesService.LoadSync().subscribe((res:any)=>{
     this.General.LoadSync = res ;       
  })
}
  GotoTheEnd() {
   this.widgetsContent.nativeElement.scrollLeft = this.widgetsContent.nativeElement.scrollWidth;   
  }

  GotoTheStart(){
    this.widgetsContent.nativeElement.scrollLeft -= this.widgetsContent.nativeElement.scrollWidth;   
  }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 200;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 200;
  }
  

 getActionss(Timeline){
   if(Timeline.actions.length > 0){
     return Timeline.actions;
   }
 }
 
 loadActiveAccouts(){
    this.PipeLinesService.LoadActiveCampaignAccounts().subscribe((res:any)=>{
      this.General.accounts = res;
    })
  }

  getOrganizationName(orgid:any){
    if (orgid==null){
      return "";
    }
    else{
       return this.General.accounts?.filter(r=> r.id == orgid)[0]?.name;
    }
  }
  
  GetMacroDealStats(){
     this.PipeLinesService.GetMAcroDealStats().subscribe((res:any)=>{
          this.General.MacroDealStats = res ;
     })
  }
  
 GetMicroDealStats(){
    this.PipeLinesService.GetMicroDealStats().subscribe((res:any)=>{
         this.General.GetMicroDealStats = res ;
    })
 }

 loadTimeLine(){
  this.spinner.show();
  this.PipeLinesService.Gettimeline().subscribe(res=>{
    this.General.TimeLine = res;
    this.spinner.hide();
  })
}

//  getTime(){
//   var fromdate = new Date();
//   var todate = new Date();

//   todate.setHours( todate.getHours() -36);
//   console.log(todate);
//   console.log(todate.toUTCString());
//   console.log(todate.toISOString());
  
  
//   var timeline = [];

//   while (fromdate>todate){      
//       var res = fromdate;
//       res.setMinutes( fromdate.getMinutes() -15);
//       timeline.push(res.toLocaleString());
//       fromdate=res;
//   }

//   this.General.Timeline = timeline;
  
// }


// getActions(fromdate:string){
//   if (this.General.Actions!=null){
//     var fromDate = new Date(fromdate);  
//     var toDate = new Date(fromDate);
//     toDate.setMinutes(toDate.getMinutes() + 15); 
//     return this.General.Actions.filter(a=>a.actionDate>fromDate && a.actionDate<toDate) ;
//   }  
// }


  GetOrganization(OrgId:number){
     return this.General.accounts?.filter(r=>r.id == OrgId)[0]?.name ;
  }

  GetActiveMacroDeals(){
    this.PipeLinesService.GetAllActiveMacroDeals().subscribe(res=>{
      this.General.ActiveMacroDeals = res;
      this.spinner.hide();
    })
  }

  GetPipeLineStages(Pipeline:string,i:number){
    this.selectedIndex = i;
    this.activePipeIndex= i;
     this.General.stages = [];
     let SelectedPipeLine = this.General.MacroDeal.filter(r=> r.pipeline == Pipeline); 
     SelectedPipeLine.forEach(element => {
      let Stage = new UniqueStage(); 
      Stage.StageTitle = element.stage;
      Stage.pipeline = element.pipeline;
      if(this.General.stages.filter(r => r.StageTitle == Stage.StageTitle).length == 0 ){
        this.General.stages.push(Stage);
      }
     });
  }

  GetDealOfStage(stage:UniqueStage){
    return this.General.MacroDeal.filter(r=> r.stage == stage.StageTitle && r.pipeline == stage.pipeline ) ;
  }
  
  GetMacro(Id:number){    
     return this.General.MacroDeal?.filter(r=> r.pipedriveId == Id)[0].title; 
  }

  HideActiveMacroDeal(Id:number){
    this.spinner.show();
    this.PipeLinesService.HideDeal(Id).subscribe(res=>{
     this.GetActiveMacroDeals();
     this.spinner.hide();
    })
  }
  
}
