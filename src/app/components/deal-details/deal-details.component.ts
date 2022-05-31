import {Component,OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealDetails } from 'src/app/models/DealDetails';
import { CustomFields, DealCustomFieldMeta } from 'src/app/models/customFields';
import {ToolbarService,LinkService, ImageService, HtmlEditorService, QuickToolbarService, NodeSelection} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.css'],
  providers: [ToolbarService,LinkService,ImageService,HtmlEditorService,QuickToolbarService, ],  
  encapsulation: ViewEncapsulation.None,
})
export class DealDetailsComponent implements OnInit {

  dealId!: any; //done
  dealDetails: DealDetails[] = [];
  anotherDealDetails: any[] = [];

  persons: any[] = []; //done
  additionalData: any[] = []; //done
  anotherAdditionalData: any[] = [];

  currentFields: any[] = []; //done
  options: any[] = [];

  termName = '';
  termOrg = '';

  selectedLetter = '';

  selectedIndex!: number;
  letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; //done

  checkedPersonsIds: number[] = []; //done
  checkedMicroDeal:number [] =[];

  dealStages: any[] = []; //done
  dealGroups: any[] = []; //done

  groupId!: number; //done
  stages: any[] = []; //done
  deals: any[] = [];

  customFields: DealCustomFieldMeta[] = [];
  anotherCustomFields: DealCustomFieldMeta[] = [];

  selectId!: number;

  thePlayer: any = {};

  templateName: any;

  expect = [
    'GroundRent','GroundLeaseBasisAttachmentPoint', 'GroundLeaseBasisPerFoot','GroundLeaseBasisPerUnit','GroundLeaseCoverage',
    'LeaseholdNOIAfterGroundLeasePayment','LeaseholdDebtYield','Leasehold LTC','LeaseholdLTV','LeaseholdDSCR','LeaseholdPaymentIntervalRate',
    'GroundLeaseValuationEstimated','GroundLeaseLTVEstimated','LeaseholdTotalTerms','LeaseholdPMT',
    'LeaseholdFV','Leasehold PPMT','LeaseholdIPMV','EstimatedLeaseholdValue','LeaseholdAmortizingCashonCashReturn',
    'LeaseholdAmortizingCashFlow','FeeSimplePMT','FeeSimplePaymentIntervalRate','FeeSimpleTotalTerms','FeeSimpleLoanAmount',
    'FeeSimpleDSCR','BifurcationTotalProceeds', 'FeeSimpleCashFlow','ImprovementsCostsonUnimprovedLand', 'FeeSimpleTotalCostofEquity',
    'LeaseholdTotalCostofEquity','NetProceedsfromFeeSimpleSale', 'EstimatedCapGain', 'EstimatedNetafterCapGainTax',
    'ProfitafterBifurcation','CappedValueofRemainingCashFlowafterBifurcation','TotalLeaseholdProceeds', 'GroundLeasePayments',
    'GroundLeaseLoanDSCR', 'MinimumYear8GroundRent', 'GroundLeaseNoteEndingDebtYield','GroundLeaseCashFlow','ExcessEquityfromLandSale',
    'TotalDeveloperEquity','RecommendedSponsorEquity','RecommendedGroundLeaseProceeds','RecommendedLeaseholdProceeds','TotalFinalCapitalStack',
    'GroundLeasetoUnimprovedLandRatio','FeeSimpleCapRate', 'GroundLeasePercentofCost', 'SponsorEquityPercentage',
    'LHROC','LeaseholdIOCashonCashReturn','LeaseholdIOCashFlow',
  ];

  public showMyMessage: boolean = false;

  emails: any[] = [];
  uniEmails: any[] = [];
  mailIndex!: number;
  previewMailbody :any;
  expandedIndex!: number;

  tempName = ' ';

  template = '';
  value = ' ';

  templatesName: any[] = [];
  selectedTemp: any;
  contentDOC = '';
  

 
  reports: any[] = [];
  titles: any;
  cdate: any;
  stgNumber: any;
  headStage: any;

  scenarioTitle = '';

  scenarios: Array<scenario>;
  scenarioId: number;

  groupTitle:string = '';
  dealGrps: any[] = [];

  collapsed1: boolean = false;
  lendersRequest: LendersDto;
  modalData: mailView;
  groupDeal: any[] = [];

  microDealId: any;

  showFieldsGroup:boolean =false;
  showPreviewMailGroup:boolean = false ;
  showRichBoxGroup:boolean = true;
  HideWhenPreviewGroup:boolean = true;

  showFieldsMicro:boolean =false;
  showPreviewMicroDeals:boolean = false ;
  showRichBoxMicroDeals:boolean = true;
  hideWhenPreviewMicroDeal:boolean = true;

  missFields:boolean =true;
  overallFields: boolean = false;


  previewBody: any;
  missingTags:any[] =[];
  missingTagsMicro:any[] =[] ;
  newMissingTagsMicro:any[] =[];
  newMissingTags:any[] = [];

  sceIdForGroup: number;


  customGroup: number;

  myFiles:any [] = [];

  fileToUpload: File = null;

  public uploadForm: FormGroup;
  outbox:string;
  outboxMicro:string;
  outboxGroup:string ;
  loadedEmailOutBox:string;
  FileName:string[] = []; 

  intersection:any[] =[];
  intersectionMicro:any [] = [];
  replyIsHere:boolean = false ;
  oneSubjectTemp:string;
  oneSubjectTempMicro:string;

  uniqStages:any[]=[];
  groupOfMicro:any[] =[];
  templateSelect:any;
  dateTimes:any[]=[];
  replyMailbody:any;
  replayBody="";
  

  public loadContent: boolean = false;
  @ViewChild('customRTE') public rteObj: RichTextEditorComponent;
  @ViewChild('replyRTE') public replyRTE: RichTextEditorComponent;
  @ViewChild('Dialog')
  public dialogObj: Dialog;
  public selection: NodeSelection = new NodeSelection();
  public ranges: Range;
  public iframe: object = { enable: false };
  public tools: object = {
    enableFloating: false,
    items: [ 'Bold','Italic','Underline', '|', 'Formats','Alignments','OrderedList','UnorderedList', '|',
      'CreateLink','Image', '|', 'SourceCode',
      {
        tooltipText: 'Insert Symbol',
        undo: true,
        click: this.onClick.bind(this),
        template:
          '<button class="e-tbar-btn e-btn" tabindex="-1"  style="width:100%">' +
          '<div class="e-tbar-btn-text" style="font-weight: 500;">Personalize</div></button>',
      },
      '|',
      'Undo',
      'Redo',
    ],
  };
  public dlgButtons: any = [
    { buttonModel: { content: 'Close' }, click: this.dialogOverlay.bind(this) },
  ];
  public header: string = ' <h1>Email/Template Personalization </h1>';
  public target: HTMLElement = document.getElementById('rteSection');
  // public height: any = '350px';
  // public width:any = '490px';
  public onCreate(): void {
    // this.dialogObj.target = document.getElementById('rteSection');
  }
  public dialogCreate(): void {
    let dialogCtn: HTMLElement = document.getElementById('rteSpecial_char');
    dialogCtn.onclick = (e: Event) => {
      let target: HTMLElement = e.target as HTMLElement;
      let activeEle: Element = this.dialogObj.element.querySelector(
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
    this.rteObj.focusIn();
    this.ranges = this.selection.getRange(document);
    this.dialogObj.width = this.rteObj.element.offsetWidth * 0.8;
    this.dialogObj.dataBind();
    this.dialogObj.show();
    this.dialogObj.element.style.maxHeight = '400px';
    this.dialogObj.element.style.width = '491px';
  }

  public onInsert(): void {
    let activeEle: Element = this.dialogObj.element.querySelector(
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

  public dialogOverlay(): void {
    let activeEle: Element = this.dialogObj.element.querySelector(
      '.char_block.e-active'
    );
    if (activeEle) {
      activeEle.classList.remove('e-active');
    }
    this.dialogObj.hide();
  }

  
  public autoUpload = false;

  constructor(
    public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ) { }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.spinner.show();

    this.uploadForm = this.formBuilder.group({ profile: [''] });

    this.activatedRoute.params.subscribe((p) => {
      this.dealId = + p.id;
                      
      this.PipeLinesService.dealDetails(this.dealId).subscribe((res: any) => {
        this.dealDetails.push(res.data);
        
        this.spinner.hide();
      });

      // this.PipeLinesService.getActiveCampaignPipelinesForDeals(this.dealId).subscribe((res: any) => {

      //   this.activeCampaign = res;
      //   this.dealGroups = res.dealGroups;

      //   for(let dealGroup of this.dealGroups){
      //     let report = new Report() ;
      //     report.id =dealGroup.id;
      //     report.sequencesName = dealGroup.title;
      //     report.cDate= dealGroup.cdate;
      //     report.stages = new Array;

      //     this.PipeLinesService.GetActiveCampaignDealsForPipeline(dealGroup.id).subscribe((res:any) =>{

      //         report.numberOfContact = res.deals.length;

      //         var stages = this.dealStages.filter((r) => r.group === dealGroup.id);

      //         for(let stage of stages){
      //           let stagereport = new StageReport();

      //           stagereport.id = stage.id;
      //           stagereport.stagename = stage.title;
      //           stagereport.numberOfDeals = res.deals.filter((r:any) => r.stage == stage.id).length;

      //         stagereport.deals =
      //           res.deals.filter((r:any) => r.stage == stage.id) ;
      //           report.stages.push(stagereport);
      //         }

      //         this.reports.push(report)
      //       })

      //   }

      //   console.log(this.reports);
      // });
    });

    this.PipeLinesService.getTemplates().subscribe((res: any) => {
      this.templatesName = res;
      
    });

    this.PipeLinesService.getScenario(this.dealId).subscribe((res) => {
      // this.scenarios = res;
      
    });
    // this.PipeLinesService.GetCustomFields().subscribe((res: CustomFields) => {
    //   this.customFields = res.dealCustomFieldMeta;
    //   this.anotherCustomFields = this.customFields.filter(
    //     (data: DealCustomFieldMeta) => !this.expect.includes(data.fieldLabel)
    //   );
      
    // });

    // this.PipeLinesService.anotherDealDetails(this.dealId).subscribe(
    //   (dealDetails: any) => {
    //     this.anotherDealDetails.push(dealDetails);
    //     this.anotherDealDetails = this.anotherDealDetails[0];
    //     for (let dealDet of this.anotherDealDetails) {
    //       this.thePlayer[dealDet.id] = dealDet.fieldValue;
    //     }
    //   });

  } //End of NgOnInit

  
public toggle:boolean;
 enableDisableRule(button) {
    button.toggle = !button.toggle;
}

public toggleFields:boolean;
enableDisableRuleFields(button) {
  button.toggleFields = !button.toggleFields;
}

public toggleReply:boolean;
enableDisableRuleForReply(button) {
  button.toggleReply =!button.toggleReply;
}

  // onSubmitGroup(){
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('profile').value);
     
  //   formData.append('outbox', this.outbox);

  //   this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
  //     (res) => {console.log(res)  
 
  //       this.PipeLinesService.GetFiles(this.outbox).subscribe((res:any) =>{
  //         console.log(`group files`);
          
  //         console.log(res);
  //        this.FileName = res ; 
  //       })
  //     },
  //     (err) => console.log(err)
  //     );
  // }

  // onSubmitMicroDeal(){
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('profile').value);

  //   formData.append('outbox', this.outbox);

  //   this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
  //     (res) => {console.log(res)  
  //       this.PipeLinesService.GetFiles(this.outbox).subscribe((res:any) =>{
  //        this.FileName = res ; console.log(this.FileName);
  //       })
  //     },
  //     (err) => console.log(err)
      
  //     );
  // }

  getTemplateName(e: any) {
    this.templateName = e.value;
  }

  saveTemp() {
    let saveTemp = new Template(this.tempName, this.contentDOC);
    this.spinner.show();
    this.PipeLinesService.SaveTemplate(saveTemp).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
    });
    this.tempName ="";
    this.contentDOC="";
  }
  
  // start group
  checkMicroDeal(event:any){
    let checked = event.target.checked;
    var dealId = event.target.value;
    if (checked) {
      this.checkedMicroDeal.push(dealId); 
    } else {
      var index = this.checkedMicroDeal.indexOf(dealId);
      this.checkedMicroDeal.splice(index, 1);
    }
  }

  openModelGroup(id , group){
    this.contentDOC="";
    this.tempName="";
    this.outboxGroup="";
    this.FileName = [];
    this.templateSelect= 47;

    this.groupOfMicro = [];
    if(this.checkedMicroDeal.length == 0){
      for(let deal of group.deals)
      {
        for(let stage of group.stages) { 
          if(stage.id == id){
          if(stage.id == deal.stage){          
              this.groupOfMicro.push(deal.id)
          }
         }
        }
      }
    } else{
      this.groupOfMicro = this.checkedMicroDeal ;
      for(let oneCheck of this.checkedMicroDeal){
        let microDealCheck = document.getElementById(oneCheck.toString()) as HTMLInputElement;
        microDealCheck.checked = false;        
      }
      this.checkedMicroDeal =[];
    }
    this.PipeLinesService.GetGUID().subscribe((res:any) => {
      this.outboxGroup = res.outbox ;
    })
  }

  previewHandleForGroup(deaiId) {
    this.showPreviewMailGroup = !this.showPreviewMailGroup;
    this.showRichBoxGroup =! this.showRichBoxGroup ;
    this.HideWhenPreviewGroup =! this.HideWhenPreviewGroup ;
     
    let arr = [Number(deaiId)];
    let emptay = '';
    
    this.showFieldsGroup =false;
    let sendemail = new sendEmail(this.tempName, this.contentDOC, this.dealId, arr , emptay);
    if(this.showPreviewMailGroup == true) {
    this.spinner.show();
    this.PipeLinesService.DecodeTemplate(sendemail).subscribe((res: any) => {            
    this.missingTags = res.missingTags ;
    console.log(this.missingTags);
       
      if ( this.missingTags.length > 0) {
          this.showFieldsGroup = true ;
      }
      
  
      let customFeilds = this.anotherCustomFields.map( r=> r.fieldLabel) ;
      this.intersection = customFeilds.filter(element => this.missingTags.includes(element));
      console.log(this.intersection);
      
      this.previewBody = this.sanitizer.bypassSecurityTrustHtml(res.body);
      this.oneSubjectTemp = res.name;   
      this.spinner.hide();
    });
  } 
}


  onFileSelectGroup(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
  
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);   
      formData.append('outbox', this.outboxGroup);
  
      let   SERVER_URL = "http://40.76.123.27:8092/api/template/SaveFile";
      this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => { 
          console.log(res)  ;
  
          this.PipeLinesService.GetFiles(this.outboxGroup).subscribe((res:any) =>{
            console.log(`Files`);
            console.log(res);
            this.FileName = res ; 
          })
        });
   }
  }
  deleteFileGroup(fileName){
    this.PipeLinesService.DeleteFile(this.outboxGroup, fileName).subscribe((res:any) =>{
      console.log(res);
      this.PipeLinesService.GetFiles(this.outboxGroup).subscribe((res:any) =>{
        this.FileName = res ; console.log(this.FileName);
       })
    })
  }

  
  sendEmailForGroup() {
    this.spinner.show();     
    if(this.loadedEmailOutBox){
      let sendemail = new sendEmail(this.tempName,this.contentDOC,this.dealId, this.groupOfMicro , this.loadedEmailOutBox );
      this.PipeLinesService.SendTemplate(sendemail).subscribe((res: any) => {
          this.spinner.hide();
      });
    }else{
    let sendemail = new sendEmail(this.tempName,this.contentDOC,this.dealId, this.groupOfMicro , this.outboxGroup );
    this.PipeLinesService.SendTemplate(sendemail).subscribe((res: any) => {
        this.spinner.hide();
    }); 
  }
  
    this.tempName="";
    this.contentDOC="";
    this.loadedEmailOutBox ="";
  }

  // start microDeal 
  getMicroDealid(x: number) {
    this.contentDOC="";
    this.tempName="";
    this.outboxMicro="";
    this.FileName=[];
    this.templateSelect= 47;
    this.microDealId = x;

    console.log(this.microDealId);

    this.PipeLinesService.GetGUID().subscribe((res:any) => {
      this.outboxMicro = res.outbox ;
      console.log(this.outboxMicro);
    })
  }
  
  previewMicroDeal() {
    this.showPreviewMicroDeals = !this.showPreviewMicroDeals;
    this.showRichBoxMicroDeals =! this.showRichBoxMicroDeals ;
    this.hideWhenPreviewMicroDeal =! this.hideWhenPreviewMicroDeal;
     let arrMicroDealId = [Number(this.microDealId)];
    this.showFieldsMicro = false;
    
    let sendemail = new sendEmail(this.tempName, this.contentDOC, this.dealId, arrMicroDealId);
    if(this.showPreviewMicroDeals == true) {
        this.spinner.show();
    this.PipeLinesService.DecodeTemplate(sendemail).subscribe((res: any) => {
      this.missingTagsMicro = res.missingTags ;
      console.log(`start missing`);
      console.log(this.missingTagsMicro);
      
      if ( this.missingTagsMicro.length > 0) {
        this.showFieldsMicro = true ;
      }

      let customFeilds = this.anotherCustomFields.map( r=> r.fieldLabel) ;
  
      this.intersectionMicro = customFeilds.filter(element =>  this.missingTagsMicro.includes(element));     
      
      this.previewBody = this.sanitizer.bypassSecurityTrustHtml(res.body) ; 
        this.oneSubjectTempMicro = res.name; 
        this.spinner.hide();
      });
    }     
  }

  
  onFileSelectMicro(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
  
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);   
      formData.append('outbox', this.outboxMicro);
  
      let   SERVER_URL = "http://40.76.123.27:8092/api/template/SaveFile";
      this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => { 
  
          this.PipeLinesService.GetFiles(this.outboxMicro).subscribe((res:any) =>{
            console.log(`Files`);
            console.log(res);
            this.FileName = res ; 
          })
        });
   }
  }

  deleteFileMicro(fileName){
    this.PipeLinesService.DeleteFile(this.outboxMicro, fileName).subscribe((res:any) =>{
      console.log(res);
      this.PipeLinesService.GetFiles(this.outboxMicro).subscribe((res:any) =>{
        this.FileName = res ; console.log(this.FileName);
       })
    })
  }

  sendEmailForMicro() {
    this.spinner.show();
    let arr = [Number(this.microDealId)];
    if(this.loadedEmailOutBox) {
    let sendemail = new sendEmail(this.tempName,this.contentDOC,this.dealId, arr , this.loadedEmailOutBox );
    this.PipeLinesService.SendTemplate(sendemail).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
    });
  }
  else{
    let sendemail = new sendEmail(this.tempName,this.contentDOC,this.dealId, arr , this.outboxMicro );
    this.PipeLinesService.SendTemplate(sendemail).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
    });
  }
    this.tempName="";
    this.contentDOC="";
    this.loadedEmailOutBox ="";
  }

  selectTemp(e: any) {
    this.selectedTemp = e.value;
    this.PipeLinesService.getTemplateBody(this.selectedTemp).subscribe( (res: any) => {
      
        this.tempName = res.name;
        var templateBody = res.body;
        this.modalData = new mailView();
        this.modalData.template = templateBody;
        this.modalData.lastname = '1';
        this.contentDOC = templateBody;
      }
    );
  } 

  getLetter(x: any) {
    this.selectedLetter = x.value;
  } // filter with A,B,C letters

  check(event: any) {
    var checked = event.target.checked;
    var personId = +event.target.value;
    if (checked) {
      this.checkedPersonsIds.push(personId); // push personId to arr
    } else {
      var index = this.checkedPersonsIds.indexOf(personId);
      this.checkedPersonsIds.splice(index, 1);
    }
  }   //  checkbox on the person

  // SaveCustomFields() {
  //   let fields: SaveCustom[] = [];
  //   for (let key of Object.keys(this.thePlayer)) {
  //     let field: SaveCustom;

  //     field = new SaveCustom();
  //     field.id = key;
  //     field.fieldValue = this.thePlayer[key];
  //     fields.push(field);
  //   }

  //   this.PipeLinesService.SaveCustomFields(fields, this.dealId).subscribe((res: any) => {
  //       console.log(res);
  //     }
  //   );
  // } //save fields

  selectOption(id: any) {
    this.selectId = id.value;
  }

  expandRow(email: any) {
    if (email.togglebody==undefined){
      this.spinner.show();
      this.PipeLinesService.getMailBody(email.id).subscribe((res: any) => {
      email.body = res.body;
      email.previewMailbody = this.sanitizer.bypassSecurityTrustHtml(res.body);
      email.togglebody = true;
      this.spinner.hide();
      }); 
    }else{
      email.togglebody=!email.togglebody;
    }            
  }

  letsReply(email:any){
    if (email.replyIsHere==undefined) email.replyIsHere = false;
    email.replyIsHere =! email.replyIsHere ;
    var replybody = "<br/><br/><br/><br/>" +  email.fromAddress + " wrote on " + email.date + "<br/><br/>";
    email.subject ="RE:" + email.subject;
    replybody +="<div style='padding:50px;border:1px solid black;'>" ;
    replybody += email.body  + "</div>";    
    email.replyMailbody = this.sanitizer.bypassSecurityTrustHtml(replybody);      
    email.togglereply = true;
    console.log(email);
  }
  
  sendEmailForReplay(email:any) {
     this.spinner.show();
    var mailBody = this.replyRTE.getContent().innerHTML;       
    let arr = [Number(this.microDealId)];
    let sendemail = new sendEmail( email.subject , mailBody  , this.dealId, arr , email.outbox );
    this.PipeLinesService.SendTemplate(sendemail).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
    });
    this.tempName="";
    this.contentDOC="";
  }


  reloadTemplates() {
    this.tempName='';
    this.contentDOC='';
    this.templateSelect = 47;
    // this.getParam();
  }

  // getParam() {
  //   this.spinner.show();
  //   this.PipeLinesService.GetCustomFields().subscribe((res: CustomFields) => {
  //     this.customFields = res.dealCustomFieldMeta;
  //     this.anotherCustomFields = this.customFields.filter(
  //       (data: DealCustomFieldMeta) => !this.expect.includes(data.fieldLabel)
  //     );
  //     this.spinner.hide();
      
  //   });

  //   this.PipeLinesService.anotherDealDetails(this.dealId).subscribe(
  //     (dealDetails: any) => {
  //       this.anotherDealDetails.push(dealDetails);
  //       this.anotherDealDetails = this.anotherDealDetails[0];
  //       for (let dealDet of this.anotherDealDetails) {
  //         this.thePlayer[dealDet.id] = dealDet.fieldValue;
  //       }
  //     });
  // }

  getMails(dealId) {
    this.spinner.show();
    this.PipeLinesService.getMail(dealId).subscribe((res: any) => {
      this.uniEmails = res;      
      console.log(this.uniEmails);
      
      this.spinner.hide();
    });
  }

  saveScenario() {
    this.PipeLinesService.CreateScenario(this.dealId,this.scenarioTitle).subscribe((res) => {
      console.log(res);
      this.PipeLinesService.getScenario(this.dealId).subscribe((res) => {
        // this.scenarios = res;
      });
    });
    this.scenarioTitle = ' ';
  }

  getScenarioId(scenarioId) {
    this.sceIdForGroup = scenarioId;
    console.log(this.sceIdForGroup);
    
  }

  createGroup() {
    this.spinner.show();
    this.PipeLinesService.createGroup(this.sceIdForGroup,this.groupTitle).subscribe((res) => {
      console.log(res);
      this.getGroup(this.sceIdForGroup);
      this.spinner.hide();
    });
  }

  getGroup(scId) {
    this.scenarioId = scId;
    
    this.dealGrps = [];
    this.PipeLinesService.GetActiveCampaignPipelinesForScenario(scId).subscribe((res: any) => {
      this.dealStages = res.dealStages;
      this.scenarios.filter((r) => r.id == scId)[0].dealGroups = res.dealGroups;
    });
  }

  getStages(group) {
    this.spinner.show();
    this.PipeLinesService.LoadSentEmails(group.id).subscribe((res=> {
      group.loadedSentMails = res.filter((r) => r.outbox!=null);
      console.log(res);
    }))
    
    group.stages = this.dealStages.filter((r) => r.group === group.id);
    this.PipeLinesService.GetActiveCampaignDealsForPipeline(group.id).subscribe((res: any) => {
      console.log(res);
      group.deals = res.deals;
       
      for(let deal of group.deals)
      {
        this.PipeLinesService.GetActions(deal.id).subscribe((res:any)=>{
        deal.date =  res.map((r:any)=>r.dateTime);  
        deal.dealLength =res.length;
        if( deal.date.length >= 1  ) {  
          deal.latestDate =  deal.date.reduce((a:any, b:any) => (a.dateTime > b.dateTime ? a : b))
        }
        })
      }
        document.getElementById(String(group.id)).style.display = 'inline-block';
        this.spinner.hide();
      }
    );
  }
  selectSentMail(event ,group)
  {
    this.contentDOC='';
    this.tempName='';
    this.loadedEmailOutBox ='';
    let selectedEmail = group.loadedSentMails.find(r=> r.name == event.value);
    this.tempName = event.value;
    this.PipeLinesService.LoadSentEmailBody(selectedEmail).subscribe((res:any) =>{
      group.loadedEmailBody = this.sanitizer.bypassSecurityTrustHtml(res.body);
      this.loadedEmailOutBox = res.outbox ;
      console.log(this.loadedEmailOutBox);
      this.contentDOC = group.loadedEmailBody; 
      this.PipeLinesService.GetFiles(this.loadedEmailOutBox).subscribe((res:any) =>{
        this.FileName = res ; 
      })
    }) ;
  
  }
  
  getDates(deal){
    this.PipeLinesService.GetActions(deal.id).subscribe((res:any)=>{
      this.dateTimes = res; 
    })   
  }

  get sortDates() {
    return this.dateTimes.sort((a, b) => {
      return <any>new Date(b.dateTime) - <any>new Date(a.dateTime);
    });
  }
  
  // initMemberRequest(group, pipelineId, ScenarioId) {
  //   this.customGroup = group;
  //   console.log(`group`);
  //   console.log(this.customGroup);
    

  //   this.lendersRequest = new LendersDto([], ScenarioId, Number(pipelineId));
  //   // Get all persons
  //   console.log(this.persons);

  //   this.spinner.show();
  //   this.PipeLinesService.getPersons(group.id).subscribe((res: any) => {
  //     this.spinner.show();
  //     this.persons = res.data;

  //     this.additionalData = res.additional_data.personFields.data;
  //     let feild1 = this.additionalData.find((r) => r.key === 'name');
  //     let feild2 = this.additionalData.find((r) => r.key === 'cb088cdb4268b4b1fd522dea74b578855851a221');
  //     let feild3 = this.additionalData.find((r) => r.key === 'email');
  //     let feild4 = this.additionalData.find((r) => r.key === 'phone');
  //     let feild5 = this.additionalData.find((r) => r.key === 'org_id');
  //     let feild6 = this.additionalData.find((r) => r.key === 'closed_deals_count');
  //     let feild7 = this.additionalData.find( (r) => r.key === 'open_deals_count');
  //     let feild8 = this.additionalData.find((r) => r.key === 'notes');

  //     this.anotherAdditionalData.push( feild1, feild2,feild3, feild4,feild5,  feild6, feild7,feild8);
  //     this.currentFields = this.anotherAdditionalData;
  //     this.options = this.anotherAdditionalData[1].options;
  //     this.spinner.hide();
  //   });
  // }
  returnPersonType(person:any){
    let labels:string;
    labels="";
    if (person.cb088cdb4268b4b1fd522dea74b578855851a221==null){
      return labels;
    }else {
      var persontypes = person.cb088cdb4268b4b1fd522dea74b578855851a221.split(',');    
      for (var persontype of persontypes){
        var label = this.options.filter((o)=> o.id == persontype);
        if (label[0].label!=undefined){
          if (labels==""){
            labels+=label[0].label;
          }else{
            labels+=", " + label[0].label;
            }
        }
      }        
      return labels;
    }
  }
  send() {
    this.spinner.show();
    this.lendersRequest.Lenders = this.checkedPersonsIds;
    this.PipeLinesService.SendToLenders(this.lendersRequest).subscribe( (res: any) => {
        console.log(res);
        this.getStages(this.customGroup);
        this.persons = [];
        this.spinner.hide();
      }
    );
  } // send to checked persons

  getInfo(deal: any) {
    this.spinner.show();
    this.PipeLinesService.GetActiveCampaignContact(deal.contact).subscribe( (res: any) => {
       deal.contactInfo = res.contact;
        this.spinner.hide();
      }
    );
  }

  // sendEmailGroup(groupDeals) {
  //   this.spinner.show();
  //   for (let deal of groupDeals) {
  //     this.groupDeal.push(Number(deal.id));
  //   }

  //   let sendGroupEmail = new sendEmail( this.tempName,this.contentDOC, this.dealId, this.groupDeal , this.outbox );
  //   this.PipeLinesService.SendTemplate(sendGroupEmail).subscribe((res: any) => {
  //     console.log(res);
  //     this.spinner.hide();
  //     this.spinner.hide();
  //   });
  //   this.groupDeal = [];
  // }

  toggleCustomFeilds(){
      this.missFields =! this.missFields ;
      this.overallFields =! this.overallFields ;
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
  

} // end of class

class LendersDto {
  Lenders: Array<number>;
  scenarioId: number;
  pipelineId: number;

  constructor(lenders: Array<number>, scenarioid: number, pipelineid: number) {
    this.Lenders = lenders;
    this.scenarioId = scenarioid;
    this.pipelineId = pipelineid;
  }
}

class SaveCustom {
  id: any;
  fieldValue: any;
}

class Template {
  Name: any;
  Body: any;

  constructor(templateName: any, templateContent: any) {
    this.Name = templateName;
    this.Body = templateContent;
  }
}

class sendEmail {
  name: any;
  body: any;
  dealId: number;
  microDealIds: number[];
  outbox:string;
  MissingTags:Array<any>

  constructor(templateName: any,templateContent: any,dealid: number,contact: any ,outbox?:string , missingtags?:Array<any>) 
    
    {
    this.name = templateName;
    this.body = templateContent;
    this.dealId = dealid;
    this.microDealIds = contact;
    this.outbox = outbox ;
    this.MissingTags = missingtags;
  }

}

class scenario {
  id: number;
  title: string;
  creationDate: any;
  dealId: number;
  dealGroups: Array<dealgroup>;
}

class dealgroup {
  id: number;
  title: string;
  stages: Array<any>;
  deals: Array<any>;
  loadedSentMails:Array<any>;
}

class mailView {
  template: string;
  lastname: string;
}



