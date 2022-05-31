import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToolbarService,LinkService, ImageService, HtmlEditorService, QuickToolbarService, NodeSelection} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import {  SendDataSource, General, LandingPage, LandingPageReponse } from 'src/app/models/domain';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [ToolbarService,LinkService,ImageService,HtmlEditorService,QuickToolbarService, ],  
  encapsulation: ViewEncapsulation.None,

})
export class LandingPageComponent implements OnInit {
  General:General;
  dataIds:any[]=[]

  @ViewChild('templateRTE') public templateRTE: RichTextEditorComponent;
  @ViewChild('templateDialog') public templateDialog: Dialog;
  
  constructor(public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ,private modalService: NgbModal) { }

    ngOnInit(): void {
      this.General = new General();
      this.General.landingPage = new LandingPage();
      // this.GetDataSource();
      // this.LoadLandingPageDataSource();
      // this.GetLandingPages();
      this.PipeLinesService.GetAllActiveMacroDeals().subscribe(res=>{
        this.General.ActiveMacroDeals = res;
        this.spinner.hide();
      })
    }

    // GetDataSource(){
    //   this.PipeLinesService.LoadDataSources().subscribe(res=>{   
    //     this.General.DataSource = res;
    //   })
    // }


    SavePage(){
      this.spinner.show();
      this.PipeLinesService.SavePage(this.General.landingPage).subscribe(res=>{
        // this.GetLandingPages();
        this.General.landingPage.PageTitle ='' ;
        this.General.landingPage.PageContent ='' ;
        this.spinner.hide();
      })
    }

    // GetLandingPages(){
    //   this.PipeLinesService.GetLandingPages().subscribe(res=>{
    //     this.General.landingPageResponse = res ;
    //     this.General.landingPageResponse.forEach(element=>{
    //       element.DataSources = this.GetLandingPageDataSource(element.id);
    //     });
    //   })
    // }


    UpdatePage(Page :LandingPageReponse){
       this.General.landingPage.id =  Page.id;
       this.General.landingPage.PageTitle = Page.pageTitle ;
       this.General.landingPage.PageContent = Page.pageContent;
    }
    
    chooseDataSource(event: any){
      var checked = event.target.checked;
      var DataSoureId = + event.target.value;
      if (checked) {
        this.dataIds.push(DataSoureId); 
      } else {
        var index = this.dataIds.indexOf(DataSoureId);
        this.dataIds.splice(index, 1);
      }
    }

    AddDataSource(){
      let SendData:SendDataSource;
      let data:SendDataSource[]=[];
       for (let id of this.dataIds) {
        SendData = new SendDataSource();
           SendData.DatasourceId = id ;
           SendData.LandingPageId = this.General.modalObject.id ;
           data.push(SendData)
        }
      this.PipeLinesService.AddDataSource(data).subscribe(res=>{
        console.log(res);
        // this.GetDataSource();
        // this.LoadLandingPageDataSource();
        // this.GetLandingPages();
      })
    }

    // LoadLandingPageDataSource(){
    //   this.PipeLinesService.GetLandingPageDataSource().subscribe(res=>{
    //     this.General.LandingPageDataSource = res;
    //   })
    // }

    GetLandingPageDataSource(PageId){ 
      let DataSources:string = '';      
        this.General.LandingPageDataSource.filter(r=> r.landingPageId == PageId).forEach(element => {
          if (DataSources ==""){
            // DataSources = this.General.DataSource.filter(ds=> ds.id == element.datasourceId)[0].name ;
          }else{
            // DataSources +="," + this.General.DataSource.filter(ds=>ds.id == element.datasourceId)[0].name ;
          }          
        });      
        return DataSources ;
    }
    GetDataSourceId(e){
      this.General.DataSourceId = e.target.value;
    }

//---------------------------------------------------RichTextBox Functions--------------------------------------------------------------
open(content, modalObject:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  this.General.modalObject = modalObject;
  this.dataIds = [];
}

public selection: NodeSelection = new NodeSelection();
public ranges: Range;
public iframe: object = { enable: false };
public tools: object = {

  enableFloating: false,
  items: ['FontSize', 'Bold','Italic','Underline', '|', 'Formats','Alignments','OrderedList','UnorderedList', '|',
    'CreateLink','Image', '|', 'SourceCode',
    {
      tooltipText: 'Insert Symbol',
      undo: true,
      click: this.onClick.bind(this) ,
      template:
        '<button class="e-tbar-btn e-btn" tabindex="-1"  style="width:100%">' +
        '<div class="e-tbar-btn-text" style="font-weight: 500;">Personalize</div></button>',
    },
    '|',
    'Undo',
    'Redo',
  ],
};
public size = {
  width: '40px'
};
public dlgButtons: any = [
  { buttonModel: { content: 'Close' }, click: this.dialogOverlay.bind(this) },
];
public header: string = ' <h1>Email/Template Personalization </h1>';
//  public target: HTMLElement = document.getElementById('rteSection');
//  // public height: any = '350px';
// // public width:any = '490px';
//  public onCreate(): void {
//    // this.dialogObj.target = document.getElementById('rteSection');
//  }
public dialogCreate(): void {
  let dialogCtn: HTMLElement = document.getElementById('rteSpecial_char');
  dialogCtn.onclick = (e: Event) => {
    let target: HTMLElement = e.target as HTMLElement;
    let activeEle: Element = this.templateDialog.element.querySelector(
      '.char_block.e-active'
    );
    if (target.classList.contains('char_block')) {
      target.classList.add('e-active');
      if (activeEle) {
        activeEle.classList.remove('e-active');
      }
    }
  };
}

public onClick() {
  this.templateRTE.focusIn();
  this.ranges = this.selection.getRange(document);
  this.templateDialog.width = 800;
  this.templateDialog.dataBind();
  this.templateDialog.show();
  this.templateDialog.element.style.maxHeight = '400px';
  this.templateDialog.element.style.width = '491px';
}

public onInsert(): void {
  let activeEle: Element = this.templateDialog.element.querySelector(
    '.char_block.e-active'
  );
  if (activeEle) {
    this.ranges.insertNode(document.createTextNode(activeEle.textContent));
  }
  this.dialogOverlay();
}

public insertPersonalization(tag: any) {
  let element = document.createTextNode(tag);
  this.ranges.insertNode(element);
  range: Range;
  let range = document.createRange();
  range.setStart(element, tag.length); // to set the range
  selectioncursor: NodeSelection;
  let selectioncursor = new NodeSelection();
  selectioncursor.setRange(document, range);
}


public insertDataSource(tag: any) {

    let element = document.createElement("div");
  element.innerText = tag;
  element.style.width="300px";
  element.style.height="50px";
  //element.style.backgroundColor="#c5c5c5";
  //element.style.color="#ffffff";  
  element.classList.add('datasource');
  
  this.ranges.insertNode(element);
  range: Range;
  // let range = document.createRange();
  // range.setStart(element, tag.length); // to set the range
  // selectioncursor: NodeSelection;
  // let selectioncursor = new NodeSelection();
  // selectioncursor.setRange(document, range);
}


public dialogOverlay(): void {
  let activeEle: Element = this.templateDialog.element.querySelector(
    '.char_block.e-active'
  );
  if (activeEle) {
    activeEle.classList.remove('e-active');
  }
  this.templateDialog.hide();
}

}
