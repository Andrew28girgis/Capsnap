import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { CaseGroupDataSource, caseScenarios, DataSources, Deal, General, Group, nodes, Sheet } from 'src/app/models/domain';
import { InTakeForm ,Screen  ,Item ,IntakeGroup} from 'src/app/models/intake';
@Component({
  selector: 'app-upload-global-ds',
  templateUrl: './upload-global-ds.component.html',
  styleUrls: ['./upload-global-ds.component.css']
})
export class UploadGlobalDsComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  
  constructor(public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer  ,private modalService: NgbModal ) { }

    Deal:Deal;
    General:General;
    inTakeForm:InTakeForm;
    StartIntake:any;
    clickedIndex:number;
    activeGroup:IntakeGroup;
    activeScreen:Screen;
    prevScreen:Screen[] = [];
    isDisabled: boolean = false;
    isGroup: boolean = false;

    name = 'Dynamic Add Fields';
    values = [];

  ngOnInit(): void {
    this.General = new General();
    this.inTakeForm = new InTakeForm();
    this.GetForm();
    this.GetCases();
  }

  removevalue(i){
    this.values.splice(i,1);
  }

  addvalue(){
    this.values.push({value: ""});
    console.log(`vvvv`);
    console.log(this.values);
    
  }


  public DroppedDataSources(files: NgxFileDropEntry[]) {
    this.spinner.show();
    this.files = files;
    for (const droppedFile of files) {
      if ( droppedFile.fileEntry.isFile ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {  
            const formData = new FormData();  
            formData.append('file', file);   
            formData.append('dealId', String(0));
            formData.append('CaseScenarioId', String(this.CaseScenarioId));
            let SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveDataSource";
            this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {         
              this.GetCaseScenarioDataSources(this.CaseScenarioId);
              this.spinner.hide();
            });
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

  DeleteDataSource(fileId:number){
    this.spinner.show();
    this.PipeLinesService.DeleteDataSource(fileId).subscribe(res=>{
      this.spinner.hide()
      this.GetCaseScenarioDataSources(this.CaseScenarioId);
    })
  }

  GetCaseScenarioDataSources(ScenarioId:number){
    
    this.PipeLinesService.GetCaseScenarioDataSources(ScenarioId).subscribe(res=>{
         this.General.DataSources = res;
         window.scrollTo(0,document.body.scrollHeight);

        //  if( this.General.DataSources.length>0 ){
        //      this.General.DataSources.forEach(dataSource =>{
        //      this.PipeLinesService.GetDatasourceFileID(this.Deal.macroDeal.pipedriveId ,dataSource.filename).subscribe(res=>{
        //       dataSource.view = res;
        //       this.spinner.hide();      
        //     })   
        //    })
        //  }
        //  else{
        //    this.spinner.hide();
        //  }
        
    })
  }

  Sync(){
    this.PipeLinesService.Sync().subscribe(res=>{
      console.log(res);
    })
  }

  DataSourceTitle:string;
  openDataSourceForm:boolean=false;
  GetDataSourceNameRange(dataSource:DataSources){
    this.DataSourceTitle = dataSource.filename;
    this.General.fileId= dataSource.id ;
    this.openDataSourceForm= true;
    if(this.openDataSourceForm==true){
    this.spinner.show();
    
    this.PipeLinesService.ReadNamedRanges(this.General.fileId).subscribe(res=>{
      this.General.NameRange = res;
      this.PipeLinesService.GetForm().subscribe((res:any)=>{
        window.scrollTo(0,document.body.scrollHeight);
        this.inTakeForm = res;        
        this.StartIntake = this.inTakeForm.groups.filter(group=> group.displayOrder == 1)[0].screens[0].containers[0].items[0].itemOptions;
      })
      this.spinner.hide();
    })
  }
  }


  screenIds:number[]=[];
  initIntake(e:any){
    this.screenIds =[];
    this.inTakeForm.groups.forEach(g=>g.screens.forEach(s=>s.containers.forEach(c=>c.items.forEach(i=>i.itemOptions.forEach(o=>{
      if (o.id == e.target.value){
        this.screenIds.push(o.actionScreenId);
        this.findNextScreen(this.GetScreen(o.actionScreenId));
        this.screenIds = this.screenIds.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })
      }
    })))))
  }

  findNextScreen(screen:Screen){
    if (screen.nextScreenId!=null){
      this.screenIds.push(screen.nextScreenId);
      this.findNextScreen(this.GetScreen(screen.nextScreenId))    
    }else{
      screen.containers.forEach(c=>c.items.forEach(i=>i.itemOptions.forEach(o => {
        this.screenIds.push(o.actionScreenId)
        this.findNextScreen(this.GetScreen(o.actionScreenId))    
      })))
    }
  }

  GetScreen(id:number):Screen{
    let screen:Screen;
    this.inTakeForm.groups.forEach(g=>g.screens.forEach(s=>{
      if (s.id==id){
        screen=s;
      }
    }))
    return screen;
  }

  screenname:string
  getScreenName(id:number){ 
    this.inTakeForm.groups.forEach(g=> g.screens.filter(s=> {
      if(s.id == id){
        this.screenname = s.title
      }
      })  
    ) 
   return  this.screenname;
  }
  
  items:Item[]=[];
  GetScreenItems(id:number){
    this.items= [];
    this.inTakeForm.groups.forEach(g=>g.screens.filter(s=>{
      if(s.id == id){
        s.containers.forEach(c=>c.items.forEach(i=>{
          this.items.push(i)
        }))
      }
    }))
      return this.items;
  }



  SumOrOR(Choose:number){
    this.SaveMapping(Choose);
    this.modalService.dismissAll();
  }
 
  check(event: any ,item:Item) {
    var checked = event.target.checked;
    var personId = +event.target.value;
    if (checked) {
      item.checked=true;
      this.General.listOfItems.push(personId); 
    }else{
      item.checked=false;
      var index = this.General.listOfItems.indexOf(personId);
       this.General.listOfItems.splice(index, 1);
    }
  } 

  @ViewChild('SumOrModal', { static: false }) private content;
  Tab:any='' ;
  Cell:string='';

  SaveMapping(Answer?:number){
    let DataSourceId = this.General.fileId;
    let itemIds:string=''; 
    this.spinner.show();
    if(this.General.listOfItems.length == 1 ){ 
      itemIds = this.General.listOfItems.toString();
      this.PipeLinesService.SaveMapping( DataSourceId ,this.Tab , this.Cell , itemIds).subscribe(res=>{
        // this.Tab='';
        // this.Cell='';

    
        this.inTakeForm.groups.forEach(g => {
          g.screens.forEach(s=>{s.containers.forEach(c=>{
            c.items.forEach(i=>{
              if(i.checked!=undefined){
                i.checked=false;
              }
            })
          })})
        });

        this.General.listOfItems = [];
        this.GetCaseScenarioDataSources(this.CaseScenarioId);
        this.spinner.hide();
      })
    }

    if(this.General.listOfItems.length > 1){
       this.open(this.content);
       this.spinner.hide();

    } 
    
    if(this.General.listOfItems.length > 1 && Answer == 1){
      itemIds = this.General.listOfItems.join("||");
      this.PipeLinesService.SaveMapping( DataSourceId ,this.Tab , this.Cell ,itemIds ).subscribe(res=>{
  
        // this.Tab='';
        // this.Cell='';
        this.inTakeForm.groups.forEach(g => {
          g.screens.forEach(s=>{s.containers.forEach(c=>{
            c.items.forEach(i=>{
              if(i.checked!=undefined){
                i.checked=false;
              }
            })
          })})
        });
        this.General.listOfItems = [];
        this.GetCaseScenarioDataSources(this.CaseScenarioId);
        this.spinner.hide();
      })
      
     }  

    if(this.General.listOfItems.length > 1 && Answer == 2){
      itemIds = this.General.listOfItems.join("**");
      this.PipeLinesService.SaveMapping( DataSourceId ,this.Tab , this.Cell ,itemIds ).subscribe(res=>{
        // this.Tab='';
        // this.Cell='';
        this.inTakeForm.groups.forEach(g => {
          g.screens.forEach(s=>{s.containers.forEach(c=>{
            c.items.forEach(i=>{
              if(i.checked!=undefined){
                i.checked=false;
              }
            })
          })})
        });
        this.General.listOfItems = [];
        this.GetCaseScenarioDataSources(this.CaseScenarioId);
        this.spinner.hide();
      })
     }  
  }

  isHere(item){
    this.General.listOfItems = [];
    if(this.General.listOfItems.filter(x => x == item.id)){
      return false;
    }
    else{
      return false;
    }
  }

  open(content , modalObject?:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}); 
    this.General.modalObject = modalObject;   
  }

  readItem:any[]=[];
  ItemNames:any[]=[]
  getItemName(itemNumber:string){
    this.ItemNames = [];
    this.readItem = itemNumber.split('||').join(',').split('**');
    for (let item of this.readItem) {
      this.inTakeForm.groups?.forEach(g=>g.screens?.forEach(s=>s.containers?.forEach(c=>c.items.filter(i=>{
        if(i.id == item){    
         this.ItemNames.push(i.displayName) ; 
        }
      }))))
    }
   return this.ItemNames;
  }

  ExictMappingTable:boolean =false;
  ShowMappingTable(){
    this.ExictMappingTable =! this.ExictMappingTable;
  }


  sortActiveScreenContainers() {
    return this.activeScreen?.containers?.sort((a, b) => a.displayOrder > b.displayOrder ? 1 : a.displayOrder === b.displayOrder ? 0 : -1);
  }
  MoveToScreen(screenId:number ,item?:Item ,iconId?:number){ 

      if ( screenId == 0 ){      
      // this.finishForm = false;
      // this.activeScreen = this.prevScreen[this.prevScreen.length-1];    
      // this.prevScreen.pop();
    } 
     else{
      if( item != undefined ){
        item.itemValue = 'selected';
      }

      if(item?.type =="Icons"){
        item.itemValue = iconId;
      }

    
      this.inTakeForm?.groups?.forEach(group => {
        if (group.screens!=null){
          group.screens.forEach(screen => {
            if (screen.id == screenId){
              screen.viewOrder = this.prevScreen.length+1;
              this.prevScreen.push(this.activeScreen);
              this.activeScreen = screen;
              if(screen.containers.length<6){
              screen.containers.forEach(c=>{
                if(c.title=="Sum"){c.displayOrder= 100; }
              })
              } 
            }
          });  
        }      
      });        
    }
 
  }

  Createcase(){
    this.spinner.show()
    this.PipeLinesService.Createcase(this.inTakeForm).subscribe(res=>{
      this.GetForm();
      this.GetCases();
      this.spinner.hide();
    })
  }

  GetForm(){
    this.spinner.show();
    this.PipeLinesService.GetForm().subscribe((res:any)=>{
      this.inTakeForm = res;  
      this.activeScreen = this.inTakeForm.groups.filter(group=> group.displayOrder == 1)[0].screens[0];
      this.StartIntake = this.inTakeForm.groups.filter(group=> group.displayOrder == 1)[0].screens[0].containers[0].items[0].itemOptions;
      this.spinner.hide();
    })
  }

  GetCases(){
    this.spinner.show();
    this.PipeLinesService.GetCases().subscribe(res=>{
      this.General.Cases=res;
      this.spinner.hide();
    })
  }

  showGroups(Scenario:caseScenarios){
    this.General.Cases.filter(caseX => {
      caseX.caseScenarios.filter(s=>{
        if(s==Scenario){
          s.showGroups=!s.showGroups;
        }
      })
    })
  }

  CreateScenario(){
    let caseId =this.General.modalObject.id;
    this.spinner.show();
    this.PipeLinesService.createScenario(caseId, this.General.SceTitle).subscribe(res=>{
      this.General.SceTitle='';
      this.GetCases();
      this.spinner.hide();
    })
  }

  createGroup(){
    let ScenarioId =this.General.modalObject.id;
    this.spinner.show();
    this.PipeLinesService.CreateGroup(ScenarioId, this.General.GrpTitle).subscribe(res=>{
      this.General.GrpTitle='';
      this.GetCases();
      this.spinner.hide();
    })
  }

  CaseGroupDataSource:boolean=false;
  CaseScenarioId:number;
  CaseScenarioTitle:string;
  CaseTitle:string;
  ShowCaseSenarioDataSource(scenario,casee){
    this.CaseGroupDataSource= true; 
    this.ViewReadFormula=false;
    this.CaseScenarioId = scenario.id;
    this.CaseScenarioTitle = scenario.title;
    this.CaseTitle= casee.title;
    this.GetCaseScenarioDataSources(this.CaseScenarioId);
  }

  ViewReadFormula:boolean =false;
  ClickedGroup:Group;
  ScenarioGroupTitle:string;
  SceTitle:string;
  showNameRanges(Scenario:any ,group:any ,Case:any){
    this.CaseGroupDataSource= false;  
    this.ViewReadFormula = true;
    this.ClickedGroup =group;  
    this.ScenarioGroupTitle=Scenario.title;  
    this.SceTitle=Case.title;
    this.GetCaseScenarioDataSources(Scenario.id);
    this.GetDataSourceTables(this.ClickedGroup); 
  }

  closeGroup(){
    this.ViewReadFormula = false;
  }

  DataSourceNameRange(e:any){
    this.spinner.show();
    this.General.fileId= +e.target.value ;
    this.General.Sheets =[];
  
    this.PipeLinesService.ReadNamedRanges(this.General.fileId).subscribe(res=>{
    this.General.NameRange = res;
      if(this.General.TextArea){
        this.General.nameRange = "";
      }
     let ranges = this.General.NameRange.every(name=> name.type=='Tab' || name.type=='Drawing');
     let calls = 0; 
     
     for (let Range of this.General.NameRange) {
       if(Range.type == 'NamedRange'){   
         calls++;
         this.PipeLinesService.readformula(this.General.fileId ,0 ,"" , Range.label).subscribe((res:any)=>{
           let UniSheet = new Sheet() ;
           var minX = Number.POSITIVE_INFINITY;
           var maxX = Number.NEGATIVE_INFINITY;
           minX = res.cells.sort((a,b) => a.x - b.x)[0].x ;
           maxX = res.cells.sort((a,b) => b.x - a.x)[0].x ;
           UniSheet.isAvailable =true;
           UniSheet.minX = minX ;
           UniSheet.maxX = maxX ;
           UniSheet.label = Range.label ;
           UniSheet.title = Range.label.split('_').join(' ');
           UniSheet.cells = res.cells;
           UniSheet.GroupDataSource = res.groupDataSource ; 
           this.General.Sheets.push(UniSheet);     
           calls--;
           if (calls==0)this.spinner.hide();
          })  
        } 
        else if(ranges==true){  
          this.spinner.hide();
        }
       }
    })
  }


SelectNameRange(e:any){
  this.spinner.show();
  this.General.Sheets =[];    
  this.General.nameRange = e.target.value;

   if(this.General.nameRange){
      this.General.TextArea = "";
    } 
    let calls = 0; 
    var ranges = this.General.NameRange.filter(r=>r.type=='NamedRange' && r.tab==e.target.value).length;
    if (ranges == 0){
      var tab = this.General.NameRange.filter(r=>r.type=='Tab' && r.tab==e.target.value)[0];
      this.PipeLinesService.readformula(this.General.fileId ,0 ,"" , tab.label).subscribe((res:any)=>{        
        let UniSheet = new Sheet() ;
        var minX = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        minX = res.cells.sort((a,b) => a.x - b.x)[0].x ;
        maxX = res.cells.sort((a,b) => b.x - a.x)[0].x ;
        UniSheet.isAvailable =true;
        UniSheet.minX = minX ;
        UniSheet.maxX = maxX ;
        UniSheet.label = tab.label ;
        UniSheet.title = tab.label.split('_').join(' ')
        UniSheet.cells = res.cells;
        UniSheet.GroupDataSource = res.groupDataSource ;
        this.ViewReadFormula = true;
        this.General.Sheets.push(UniSheet);     
        this.spinner.hide();  
       })
      } else{
        this.General.NameRange.forEach(Range=>{
          if(Range.label == this.General.nameRange ){
            this.General.NameRange.forEach(namerange => {
              if (Range.tab == namerange.tab && Range.tab != namerange.label) {
                calls++;
                this.PipeLinesService.readformula(this.General.fileId ,0 ,this.General.TextArea , namerange.label).subscribe((res:any)=>{
                  calls--;
                  let UniSheet = new Sheet() ;
                  var minX = Number.POSITIVE_INFINITY;
                  var maxX = Number.NEGATIVE_INFINITY;
                  minX = res.cells.sort((a,b) => a.x - b.x)[0].x ;
                  maxX = res.cells.sort((a,b) => b.x - a.x)[0].x ;
                  UniSheet.isAvailable =true;
                  UniSheet.minX = minX ;
                  UniSheet.maxX = maxX ;
                  UniSheet.label = namerange.label ;
                  UniSheet.title = Range.label.split('_').join(' ')
                  UniSheet.cells = res.cells;
                  UniSheet.GroupDataSource = res.groupDataSource ;
                  this.ViewReadFormula = true;
                  this.General.Sheets.push(UniSheet);     
                  if(calls==0)this.spinner.hide();  
               })
              }
            });
          }
        })  
      }
}

CheckExcel(event:any , item:Sheet){
  var checked = event.target.checked;
  if (checked) {
    item.isAvailable =true;
  } else {
    item.isAvailable =false;
  }
}

GetRowsx(Sheet:Sheet){
  if (Sheet!=null){
    var RowsArray = [];
    for (let index = Sheet.minX; index <= Sheet.maxX; index++) {
      RowsArray.push(index);     
    }
    return RowsArray ; 
  }  
  else{
    return [];
  }  
}
    
GetRowCellsx(row:any ,sheet:Sheet){
  return sheet?.cells.filter(c=>c.x==row).sort((a,b) => a.y - b.y);
}

SaveAllNamedRanges(){
  for (let sheet of this.General.Sheets) {
    if(sheet?.isAvailable ==true){     
    let caseGroupDataSource= new CaseGroupDataSource();
    caseGroupDataSource.fileId = +this.General.fileId ;
    caseGroupDataSource.CaseGroupId = +this.ClickedGroup.id ;
    caseGroupDataSource.formula ="";
    caseGroupDataSource.columns = sheet?.GroupDataSource.columns;
    caseGroupDataSource.headers= sheet?.GroupDataSource.headers;
    caseGroupDataSource.intro = sheet?.GroupDataSource.intro ;
    caseGroupDataSource.namedRange = sheet?.label;
    caseGroupDataSource.title = sheet?.title;
    
    this.PipeLinesService.SaveDataTable(caseGroupDataSource).subscribe(res=>{
      this.ViewReadFormula = false;
      this.General.TextArea ="";
      this.General.nameRange ="";
      this.General.Sheets=[];
      this.GetDataSourceTables(this.ClickedGroup); 
    })
  }
  }
}
  
GetDataSourceTables(Group:Group){
  this.PipeLinesService.GetDataSourceTables(Group.id).subscribe((res:any)=>{
    this.General.GroupDataSource = res;
    // Ascending
    this.General.GroupDataSource.sort((a, b) => (a.displayOrder < b.displayOrder ? -1 : 1));  
    // Descending
    // this.General.GroupDataSource.sort((a, b) => (a.displayOrder > b.displayOrder ? -1 : 1));
    this.spinner.hide();
  })
}

fileNamex:string
getDatasourceFileName(id:number){   
  this.General.DataSources?.forEach(d=> {
    if(d.id == id && d.macroDealId == null){
      this.fileNamex = d.filename + '[ Global ]' ;
    }
    if (d.id == id && d.macroDealId !== null) {
     this.fileNamex = d.filename  + '[ Local ]'  ;
    }
  }) 
 return  this.fileNamex;
}

openLg(content, modalObject?:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' });    
  this.General.modalObject = modalObject;
  this.GetForm();
}
  
openPerviousMapping(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' });    
}



GetInputVariables(e:any){
  this.spinner.show();
  this.Tab = e.target.value;
  this.PipeLinesService.GetInputVariables(this.General.fileId,this.Tab).subscribe(res=>{
    this.General.variables= res;
    this.spinner.hide();
  })
}

SyncDataSource(dataSource:DataSources){
  this.PipeLinesService.CacheBoxFile(dataSource.id,0).subscribe(el => {
    console.log('Value Received ' + el)
    },
    err => {
      console.log("Error caught at Subscriber " + err)
    },
    () => console.log("Processing Complete."))
}

} 
