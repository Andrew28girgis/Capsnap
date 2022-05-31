import { Component,OnInit,ViewChild,ViewChildren,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToolbarService,LinkService, ImageService, HtmlEditorService, QuickToolbarService, NodeSelection} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { Deal, DealGroupParamsRequest, Field, General, Group,  LandingPage, LendersDto,
    MacroDealRequest, Mail, Member, MicroDeal, Persons,Person, Scenario, Stage, Template,
    UpdateDealParam , Sheet, groupDataSource, RootObjectPerson, account, filePrivileges, AdvancedFilters ,
     DataSources, ChartsSheet} from 'src/app/models/domain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { InTakeForm ,Screen  ,Item} from 'src/app/models/intake';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// import { GeneralX, InTakeForm, userIntake ,IntakeGroup ,Container ,Item ,Screen} from 'src/app/models/intake';

@Component({
  selector: 'app-main-deal',
  templateUrl: './main-deal.component.html',
  styleUrls: ['./main-deal.component.css'],
  providers: [ToolbarService,LinkService,ImageService,HtmlEditorService,QuickToolbarService, ],
  encapsulation: ViewEncapsulation.None,
})

export class MainDealComponent implements OnInit {
  Deal:Deal;
  General:General;
  inTakeForm:InTakeForm;
  personSearchName:string = '';
  termOrg = '';
  ApplyAdvancedFilters:boolean=false;
  AdvancedSearch : AdvancedFilters ;
  personTypeId: number;
  toggle:boolean;
  statusTemplate: boolean = false;
  statusFiles: boolean = false;
  statusData: boolean = false;
  statusGallery: boolean = false;
  statusSenario: boolean = true;
  statusIntake: boolean = false;
  PreviewMode:boolean = false;
  OpenTemplate:boolean =false;
  OpenIntake:boolean = false;
  OpenTable:boolean = true;
  ShowInbox:boolean =false;
  ToggleAddMemberInbox:boolean =false ;
  isFalg:boolean = false;
  OpenFiles:boolean = false ;
  OpenDataSources:boolean = false ;
  OpenGallery:boolean = false ;
  ShowLibraryFiles:boolean =true ;
  ShowPreviousFiles:boolean=false;
  personType: number;
  OrganizationId:number;
  toggleAssign:boolean =false;
  CheckGroup:boolean =false;
  ViewReadFormula:boolean =false;
  ExcelFile:boolean =false;
  selectedAll: boolean;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};
  filterMetadata = { count: 0 };
  havePipeDriveId :boolean ;
  AddMemberGroup:Group;
  public uploadForm: FormGroup;
  public uploadFormForReply: FormGroup;
  public uploadDataSource: FormGroup;
  public uploadFormMainImage: FormGroup;
  public SaveImage: FormGroup;
  UpdateFormula:boolean=false ;
  GroupFileIds:number[]=[];
  landingPageIdss:number;
  landId:number;
  public files: NgxFileDropEntry[] = [];
  active :number;
  GrpId:number;
  StartIntake:any;
  clickedIndex:number;

  @ViewChild('templateRTE') public templateRTE: RichTextEditorComponent;
  @ViewChild('replyRTE') public replyRTE: RichTextEditorComponent;
  @ViewChild('templateDialog') public templateDialog: Dialog;


  constructor(public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ,private modalService: NgbModal,private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.General = new General();
    this.General.didScroll= false;
    this.General.SelectedTemplate = new Template();
    this.General.CreateMember = new Member();
    this.General.landingPage = new LandingPage();
    //this.General.AdvancedFilters = new AdvancedFilters();
    this.dropdownList = [
      { item_id: 1, item_text: 'AL	Alabama' },
      { item_id: 2, item_text: 'AK	Alaska' },
      { item_id: 3, item_text: 'AZ	Arizona' },
      { item_id: 4, item_text: 'AR	Arkansas' },
      { item_id: 5, item_text: 'CA	California' },
      { item_id: 4, item_text: 'CO	Colorado' },
      { item_id: 4, item_text: 'CT	Connecticut' },
      { item_id: 4, item_text: 'DE	Delaware' },
      { item_id: 4, item_text: 'DC	District Of Columbia' },
      { item_id: 4, item_text: 'FL	Florida' },
      { item_id: 4, item_text: 'GA	Georgia' },
      { item_id: 4, item_text: 'HI	Hawaii' },
      { item_id: 4, item_text: 'ID	Idaho' },
      { item_id: 4, item_text: 'IL	Illinois' },
      { item_id: 4, item_text: 'IN	Indiana' },
      { item_id: 4, item_text: 'IA	Iowa' },
      { item_id: 4, item_text: 'KS	Kansas' },
      { item_id: 4, item_text: 'KY	Kentucky' },
      { item_id: 4, item_text: 'A	Louisiana' },
      { item_id: 4, item_text: 'ME	Maine' },
      { item_id: 4, item_text: 'MD	Maryland' },
      { item_id: 4, item_text: 'MA	Massachusetts' },
      { item_id: 4, item_text: 'MI	Michigan' },
      { item_id: 4, item_text: 'MN	Minnesota' },
      { item_id: 4, item_text: 'MS	Mississipi' },
      { item_id: 4, item_text: 'MO	Missouri' },
      { item_id: 4, item_text: 'MT	Montana' },
      { item_id: 4, item_text: 'NE	Nebraska' },
      { item_id: 4, item_text: 'NV	Nevada' },
      { item_id: 4, item_text: 'NH	New Hampshire' },
      { item_id: 4, item_text: 'NJ	New Jersey' },
      { item_id: 4, item_text: 'NM	New Mexico' },
      { item_id: 4, item_text: 'NY	New York' },
      { item_id: 4, item_text: 'NC	North Carolina' },
      { item_id: 4, item_text: 'ND	North Dakota' },
      { item_id: 4, item_text: 'OH	Ohio' },
      { item_id: 4, item_text: 'OK	Oklahoma' },
      { item_id: 4, item_text: 'OR	Oregon' },
      { item_id: 4, item_text: 'PA	Pennsylvania' },
      { item_id: 4, item_text: 'RI	Rhode Island' },
      { item_id: 4, item_text: 'SC	South Carolina' },
      { item_id: 4, item_text: 'SD	South Dakota' },
      { item_id: 4, item_text: 'TN	Tennessee' },
      { item_id: 4, item_text: 'TX	Texas' },
      { item_id: 4, item_text: 'UT	Utah' },
      { item_id: 4, item_text: 'VT	Vermont' },
      { item_id: 4, item_text: 'VA	Virginia' },
      { item_id: 4, item_text: 'WA	Washington' },
      { item_id: 4, item_text: 'WV	West Virginia' },
      { item_id: 4, item_text: 'WI	Wisconsin' },
      { item_id: 4, item_text: 'WY	Wyoming' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.General.expect = [
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

    this.uploadForm = this.formBuilder.group({ profile: [''] });
    this.uploadFormForReply = this.formBuilder.group({ profile: [''] });
    this.uploadDataSource = this.formBuilder.group({ profile: [''] });
    this.uploadFormMainImage = this.formBuilder.group({ profile: [''] });
    this.SaveImage = this.formBuilder.group({ profile: [''] });

this.spinner.show();
  this.activatedRoute.params.subscribe((params) =>{
    this.General.Params = params;
    this.PipeLinesService.dealDetails(params.id).subscribe((res: Deal) => {
      this.Deal = res;
      this.GetDealScenarios();
      this.getDealFiles();
      // this.LoadActiveCampaignAccounts();
      // this.GetFileCategory();
      // this.GetPersonFields();
      // this.ListPipeDriveOrganizations();
      // this.GetDataSource();
      this.GetScenarioFiles();
      this.loadLookups();
      this.LoadSync();
      this.PipeLinesService.GetForm().subscribe((res:any)=>{
        this.inTakeForm = res;
        this.StartIntake = this.inTakeForm.groups.filter(group=> group.displayOrder == 1)[0].screens[0].containers[0].items[0].itemOptions;
      })
  })
  })
  }
  // End of init

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

 onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


  loadLookups(){
    this.spinner.show();
    this.PipeLinesService.LoadLookups().subscribe((res:any)=>{
      this.General.Templates = res.templates ;
      this.General.accounts = res.accounts;

      this.General.accounts.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    this.General.categories = res.fileCategories;
    this.General.personTypes = res.personFields?.data[0].options ;
    this.General.Organiztion = res.pipeDriveOrganizations ;
    this.General.states = res.states ;
    this.spinner.hide();
    })
  }


  TriggerAdvancedFilters(){
    this.ApplyAdvancedFilters=!this.ApplyAdvancedFilters;
  }

  GetState(event){
    this.General.AdvancedFilters.StateValue = event.target.value ;
  }

  GetDealParametars() {
      this.spinner.show();
      this.PipeLinesService.GetDealDetails(this.Deal.macroDeal.pipedriveId).subscribe((Fields:Field[]) => {
        this.Deal.Fields = Fields;
        this.spinner.hide();
      });
  }

  ShowTemplate(){
      this.OpenTemplate =! this.OpenTemplate;
      this.statusTemplate = !this.statusTemplate;
      this.OpenDataSources = false ;
      this.OpenTable = false ;
      this.OpenFiles = false ;
      this.statusFiles =false ;
      this.statusGallery =false ;
      this.statusData = false ;
      this.statusSenario =false
      this.OpenIntake =false;
      this.statusIntake=false
      this.OpenGallery = false;
  }

    ShowFiles(){
      this.OpenFiles =!this.OpenFiles;
      this.statusFiles = !this.statusFiles;
      this.OpenDataSources = false ;
      this.OpenTable = false ;
      this.OpenTemplate = false ;
      this.OpenGallery = false;
      this.statusTemplate = false;
      this.statusData =false ;
      this.statusGallery =false ;
      this.statusSenario =false;
      this.OpenIntake =false;
      this.statusIntake=false;
      // this.GetFileCategory();
      this.getDealFiles();
    }

    ShowDataSources(){
      this.OpenDataSources =!this.OpenDataSources;
      this.OpenTemplate =false;
      this.OpenTable = false ;
      this.OpenFiles =false ;
      this.OpenGallery =false;
      this.statusData = !this.statusData;
      this.statusTemplate = false;
      this.statusFiles =false;
      this.statusGallery =false;
      this.statusIntake=false;
      this.statusSenario =false;
      this.OpenIntake =false;
      this.GetDealDataSources();
      // this.LoadDataSources();
    }

    ShowGallery(){
      this.OpenGallery =!this.OpenGallery;
      this.OpenTemplate =false;
      this.OpenTable = false ;
      this.OpenFiles =false ;
      this.OpenDataSources =false;
      this.statusGallery = !this.statusGallery;
      this.statusTemplate = false;
      this.statusIntake=false;
      this.statusFiles =false ;
      this.statusData =false ;
      this.statusSenario =false;
      this.OpenIntake =false;
      this.GetDealImages();
    }



    ShowScenarios(){
      this.OpenTable = true ;
      this.OpenTemplate = false;
      this.OpenDataSources = false ;
      this.OpenFiles = false ;
      this.OpenGallery = false;
      this.statusSenario = true;
      this.statusTemplate = false;
      this.statusFiles = false ;
      this.statusData = false ;
      this.statusGallery = false;
      this.OpenIntake =false;
      this.statusIntake=false;
    }

    ShowIntake(){
      this.OpenIntake =true;
      this.statusIntake=true;
      this.OpenTable = false ;
      this.OpenTemplate = false;
      this.OpenDataSources = false ;
      this.OpenFiles = false ;
      this.OpenGallery = false;
      this.statusSenario = false;
      this.statusTemplate = false;
      this.statusFiles = false ;
      this.statusData = false ;
      this.statusGallery = false;
      // this.GetIntake(this.Deal.macroDeal.accountId);
    }

  // End Box Control Methods

 // Start Template Methods
  GetTemplateBody(){
    this.General.SelectedTemplate.id = undefined;
    this.General.SelectedTemplate.subject = this.GetTemplateSubject(null);
    this.PipeLinesService.getTemplateBody(this.General.SelectedTemplate.name).subscribe( (res: Template) => {
        this.General.SelectedTemplate.body = res.body;
      });
  }

  SaveTemplate() {
    this.spinner.show();
    this.PipeLinesService.SaveTemplate(this.General.SelectedTemplate).subscribe((res: any) => {
     this.spinner.hide();
     this.OpenTemplate =! this.OpenTemplate;
     this.OpenTable =! this.OpenTable;
    });
  }

  CloseTemplate(){
    this.OpenTemplate =! this.OpenTemplate;
    this.OpenTable =! this.OpenTable;
  }

  // End Template Methods

  // Start Files Methods
  public droppedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if ( droppedFile.fileEntry.isFile ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
            let  SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveFile";
            this.spinner.show();
            this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
              this.getDealFiles();
            });
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    this.spinner.hide();
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

  getCategory(catid:number){
    return this.General.categories.filter(r=> r.id == catid)[0].name ;
  }

  getDealFiles(){
    this.spinner.show();
    this.PipeLinesService.GetDealFiles(this.Deal.macroDeal.pipedriveId).subscribe((res:any)=>{
    this.General.AllFiles =res;
    this.General.AllFiles.files.forEach(file=> {
      file.privilege = this.General.AllFiles.filePrivileges.filter(Privileges=> Privileges.fileId == file.id);
    })
    this.spinner.hide();
    })
  }

  getPrivilege(file){
    if( file.privilege?.length == 0 ) {
      return "Private"
    }
    if( file.privilege?.length > 0 ){
      for ( const privilege of file.privilege ) {
       if( privilege.privilegeLevel =="Deal" ){
         return "Deal";
        }
        else{
          return "Scenario/Group"
        }
      }
    }
  }

  IsCheckedDeal(file){
    let checked:boolean =false;
    if( file.privilege != null ) {
     for (let privilege of file.privilege) {
       if( privilege.privilegeLevel =="Deal" ){
        checked =true;
       }
     }
    }
    if(checked){
       return true;
     }
   }

   IsCheckGroup( file, group? ){
    let checked:boolean = false;
    if( file.privilege != null ) {
      for (let privilege of file.privilege) {
        if( privilege.privilegeLevel == "Group" && privilege.objectId == group?.id ){
          checked =true;
        }
      }
    }
    if( checked ){
      return true;
    }
   }


  checkDeal( event, file ,group? ){
      let PrivilegeName = event.target.value;
      let UniquePrivilege:filePrivileges;
      if( PrivilegeName == "Deal" ){
          var checked = event.target.checked;
          if ( checked ){
            file.CheckGroup = true ;
            UniquePrivilege = new filePrivileges( file.id ,PrivilegeName ,null , this.Deal.macroDeal.pipedriveId );
            file.privilege = file.privilege.filter((item:filePrivileges) => !(item.privilegeLevel == "Group"));
            file.privilege.push( UniquePrivilege ) ;
         } else {
          file.CheckGroup = false ;
          file.privilege = file.privilege.filter((item:filePrivileges) => !(item.privilegeLevel == "Deal"));
        }
    } else {
      var checked = event.target.checked;
      var GroupsIds = +event.target.value;
        if ( checked ) {
        this.General.GroupIds.push(GroupsIds);
        UniquePrivilege = new filePrivileges(file.id , "Group" , null , +event.target.value );
        file.privilege = file.privilege.filter((item:filePrivileges)=> !(item.privilegeLevel == "Deal"));
        file.privilege.push(UniquePrivilege)
      } else {
        file.privilege = file.privilege.filter((item:filePrivileges)=> !(item.objectId == group.id));
      }
      if( file.privilege.length == 0 )
      { file.CheckDeal = false; }
      else {  file.CheckDeal = true; }
    }
  }

  deleteFileDeals(file){
    this.spinner.show();
    this.PipeLinesService.DeleteFileDeal(file.id).subscribe((res:any) =>{
      this.getDealFiles();
      this.spinner.hide();
    })
  }


  getGroupLevelFiles(){
    let filesArr = [];
      if(this.General.AllFiles.files){
        this.General.AllFiles.files.forEach(file =>{
          if(file.privilege){
            var files = file.privilege.filter( p=> p.privilegeLevel=="Group" && p.objectId == this.General.modalObject.id) ;
            if(files.length > 0){
              filesArr.push(file)
            }
          }
        })
      return filesArr;
   }
   else {
      return [];
    }
  }

  UpdateFiles(){
      this.spinner.show();
      this.PipeLinesService.UpdateFiles( this.General.AllFiles.files ).subscribe(res=>{
          console.log(res);
          this.spinner.hide();
       })
  }

  // End Files Methods


 // Start Data Source

 @ViewChild('content', { static: false }) private content;
 Sheet:any='' ;
 Cell:string='';
 openDataSourceForm:boolean=false;

  public DroppedDataSources(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if ( droppedFile.fileEntry.isFile ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
            let SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveDataSource";
            this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
              this.GetDealDataSources();
            });
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  DeleteDataSource(fileId:number){
    this.PipeLinesService.DeleteDataSource(fileId).subscribe(res=>{
      console.log(res);
      this.GetDealDataSources();
    })
  }

  ExictMappingTable:boolean =false;
  ShowMappingTable(){
    this.ExictMappingTable =! this.ExictMappingTable;
  }

  CloseTable(){
    this.ExictMappingTable = false;
  }

  DataSourceTitle:string;
  GetDataSourceNameRanges(dataSource:DataSources){
    this.DataSourceTitle = dataSource.filename;
    this.General.fileId= dataSource.id ;
    this.spinner.show();
    this.PipeLinesService.ReadNamedRanges(this.General.fileId ).subscribe(res=>{
      this.openDataSourceForm= true;
      this.General.NameRange = res;
      this.PipeLinesService.GetForm().subscribe((res:any)=>{
        this.inTakeForm = res;
        // this.StartIntake = this.inTakeForm.groups.filter(group=> group.displayOrder == 1)[0].screens[0].containers[0].items[0].itemOptions;
      })
      this.spinner.hide();
    })
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

  itemss:Item[]=[];
  GetScreenItems(id:number){
    this.itemss= [];
    this.inTakeForm.groups.forEach(g=>g.screens.filter(s=>{
      if(s.id == id){
        s.containers.forEach(c=>c.items.forEach(i=>{
          this.itemss.push(i)
        }))
      }
    }))
      return this.itemss;
  }
  checkdatasource(event: any) {
    var checked = event.target.checked;
    var personId = +event.target.value;
    if (checked) {
      this.General.listOfItems.push(personId);
      console.log(this.General.listOfItems);
    }else{
      var index = this.General.listOfItems.indexOf(personId);
       this.General.listOfItems.splice(index, 1);
       console.log(this.General.listOfItems);
    }
  }

  SumOrOR(Choose:number){
    this.SaveMapping(Choose);
    this.modalService.dismissAll();
  }

  SaveMapping(Answer?:number){
    let DataSourceId = this.General.fileId;
    let itemIds:string;

    if(this.General.listOfItems.length == 1 ){
      itemIds = this.General.listOfItems.toString();
      this.PipeLinesService.SaveMapping( DataSourceId ,this.Sheet , this.Cell , itemIds).subscribe(res=>{

        this.General.listOfItems = [];
        this.Sheet='';
        this.Cell='';
        this.openDataSourceForm= false;
        this.GetDealDataSources();
      })
    }

    if(this.General.listOfItems.length > 1){
       this.open(this.content);
    }

    if(this.General.listOfItems.length > 1 && Answer == 1){
      itemIds = this.General.listOfItems.join("||");
      this.PipeLinesService.SaveMapping( DataSourceId ,this.Sheet , this.Cell ,itemIds ).subscribe(res=>{
        this.General.listOfItems = [];
        this.Sheet='';
        this.Cell='';
        this.openDataSourceForm= false;
        this.GetDealDataSources();
      })
     }

    if(this.General.listOfItems.length > 1 && Answer == 2){
      itemIds = this.General.listOfItems.join("**");
      this.PipeLinesService.SaveMapping( DataSourceId ,this.Sheet , this.Cell ,itemIds ).subscribe(res=>{
        this.General.listOfItems = [];
        this.Sheet='';
        this.Cell='';
        this.openDataSourceForm= false;
        this.GetDealDataSources();
      })
     }
  }
  // UploadDataSources(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.uploadDataSource.get('profile').setValue(file);
  //     const formData = new FormData();
  //     formData.append('file', this.uploadDataSource.get('profile').value);
  //     formData.append('datasourceId', String(this.General.DataSourceId));
  //     formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
  //     let   SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveDataSource";
  //     this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
  //       this.GetDealDataSources();
  //       });
  //  }
  // }

  // GetSource(dataSourceId:number){
  //   return this.General.DataSource?.filter(ds=>ds.id ==dataSourceId)[0].name ;
  // }

 // End Data Source

 //  Start Gallery Methods
  UploadMainImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadFormMainImage.get('profile').setValue(file);
      const formData = new FormData();
      formData.append('file', this.uploadFormMainImage.get('profile').value);
      formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
      let  SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveMainImage";
      this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
        this.GetDealImages();
        });
   }
  }

  public UploadImages( files: NgxFileDropEntry[] ) {
    this.files = files;
    for (const droppedImages of files) {
      // Is it a file?
      if (droppedImages.fileEntry.isFile) {
        const fileEntry = droppedImages.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedImages.relativePath, file);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
            let   SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveImage";
            this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
              this.GetDealImages();
              });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedImages.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedImages.relativePath, fileEntry);
      }
    }
  }

  DeleteImage(fileName){
    this.PipeLinesService.DeleteImage(fileName ,this.Deal.macroDeal.pipedriveId).subscribe(res=>{
      this.GetDealImages();
    })
  }
  //  End Gallery Methods

// Start Landing Page

OpenLandingPages(Group:Group, Scenario:Scenario){
  if(Group.closeLandingPage == undefined || Group.closeLandingPage == false){
    Group.closeLandingPage = true ;
    this.spinner.show();
    this.LoadDataSources(this.Deal.macroDeal.pipedriveId ,Scenario.id);
    this.GetDataSources(Group);
  }else{
    Group.closeLandingPage =! Group.closeLandingPage;
  }
}

LoadDataSources(DealId:number ,ScenarioId:number){
  this.PipeLinesService.LoadDataSources(DealId,ScenarioId).subscribe(res=>{
    this.General.DataSource = res;
  })
}

Viewcharts:boolean=false;
GetDataSourceNameRange(e:any ,group:Group){
  this.General.fileId= +e.target.value ;
  this.General.Sheets =[];
  this.General.ChartsSheet=[];
  this.spinner.show();
  this.PipeLinesService.exportcharts(this.General.fileId,this.Deal.macroDeal.pipedriveId).subscribe(res=>{
  this.PipeLinesService.loadcharts(this.General.fileId,this.Deal.macroDeal.pipedriveId).subscribe(res=>{
    this.Viewcharts=true;
    for (let c of res) {
      let Chart = new ChartsSheet() ;
      Chart.label=c;
      Chart.title="";
      Chart.intro="";
      this.General.ChartsSheet.push(Chart);
    }
    this.spinner.hide();
  })
})


  this.PipeLinesService.ReadNamedRanges(this.General.fileId ).subscribe(res=>{
    this.spinner.show();
    this.General.NameRange = res;

    if(this.General.TextArea){
      this.General.nameRange = "";
    }
   let ranges = this.General.NameRange.every(name=>name.type=='Tab');
   let calls = 0;

   for (let Range of this.General.NameRange) {
     if(Range.type == 'NamedRange'){
       calls++;
       this.PipeLinesService.readformula(this.General.fileId ,group.id ,"" , Range.label).subscribe((res:any)=>{
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
         UniSheet.GroupDataSource = res.groupDataSource;
         this.ViewReadFormula = true;
         this.General.Sheets.push(UniSheet);
         calls--;
         if (calls==0)this.spinner.hide();
        })
      }
      else if(ranges==true){
        console.log(`hello`);
        this.spinner.hide();
      }
     }
  })
}
SelectNameRange(e ,group:Group ){
  this.spinner.show();
  this.Viewcharts = false;
  this.General.Sheets =[];
  this.General.nameRange = e.target.value;
    if(this.General.nameRange){
       this.General.TextArea = "";
    }
    let calls = 0;
    var ranges = this.General.NameRange.filter(r=>r.type=='NamedRange' && r.tab==e.target.value).length;
    if (ranges == 0){
      var tab = this.General.NameRange.filter(r=>r.type=='Tab' && r.tab==e.target.value)[0];
      this.PipeLinesService.readformula(this.General.fileId ,group.id ,"" , tab.label).subscribe((res:any)=>{
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



    }else{
      this.General.NameRange.forEach(Range=>{
        if(Range.label == this.General.nameRange ){
          this.General.NameRange.forEach(namerange => {
            if (Range.tab == namerange.tab && Range.tab != namerange.label) {
              calls++;
              this.PipeLinesService.readformula(this.General.fileId ,group.id ,this.General.TextArea , namerange.label).subscribe((res:any)=>{
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

  ViewAllcharts(){
    this.Viewcharts =! this.Viewcharts;
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

SaveAllNamedRanges(group:Group ){


  for (let sheet of this.General.Sheets) {
    if(sheet?.isAvailable ==true){
    let GroupDataSource= new groupDataSource();
    GroupDataSource.fileId = +this.General.fileId ;
    GroupDataSource.groupId= +group.id ;
    GroupDataSource.formula ="";
    GroupDataSource.columns = sheet?.GroupDataSource.columns;
    GroupDataSource.headers= sheet?.GroupDataSource.headers;
    GroupDataSource.intro = sheet?.GroupDataSource.intro ;
    GroupDataSource.namedRange = sheet?.label;
    GroupDataSource.title = sheet?.title;

    this.PipeLinesService.SaveDataSource(GroupDataSource).subscribe(res=>{
      this.ViewReadFormula = false;
      this.General.TextArea ="";
      this.General.nameRange ="";
      this.GetDataSources(group);
    })
  }
  }


}


SaveChart(group:Group ){
  for (let chart of this.General.ChartsSheet) {
    if(chart?.isAvailableChart ==true){
    let GroupDataSource= new groupDataSource();
    GroupDataSource.fileId = +this.General.fileId ;
    GroupDataSource.groupId= +group.id ;
    GroupDataSource.title = chart?.title;
    GroupDataSource.intro = chart.intro ;
    GroupDataSource.formula ="chart";
    GroupDataSource.columns = 0;
    GroupDataSource.headers= "";
    GroupDataSource.namedRange = chart?.label;
    this.PipeLinesService.SaveDataSource(GroupDataSource).subscribe(res=>{
      this.Viewcharts = false;
      this.General.TextArea ="";
      this.General.ChartsSheet =[]
      this.General.nameRange ="";
      this.GetDataSources(group);
    })
  }
  }
}

SaveLandingPage( group:Group ){
  if(this.General.Sheet.GroupDataSource.title == null || this.General.Sheet.GroupDataSource.title.length == 0){
    alert('Please Enter The Title') ;
  }
  else{
    this.General.Sheet.GroupDataSource.groupId= +group.id ;
    this.General.Sheet.GroupDataSource.fileId = +this.General.fileId ;
    this.General.Sheet.GroupDataSource.formula = this.General.TextArea ;
    this.General.Sheet.GroupDataSource.namedRange =this.General.nameRange ;
    this.PipeLinesService.SaveDataSource(this.General.Sheet.GroupDataSource).subscribe(res=>{
      this.ViewReadFormula = false;
      this.General.TextArea ="";
      this.General.nameRange ="";
      this.customFormala =false;
      this.GetDataSources(group);
    })
  }
}


  customFormala:boolean=false;
  ViewFormula( Group:Group ){
    this.spinner.show();
    this.General.Sheets = [];
    this.customFormala=true;
    if(this.General.TextArea){
      this.General.nameRange = "";
    }

    this.PipeLinesService.readformula(this.General.fileId ,Group.id ,this.General.TextArea , this.General.nameRange).subscribe((res:any)=>{
      if( res.cells.length > 0){
      var minX = Number.POSITIVE_INFINITY;
      var maxX = Number.NEGATIVE_INFINITY;
      minX = res.cells.sort((a,b) => a.x - b.x)[0].x ;
      maxX = res.cells.sort((a,b) => b.x - a.x)[0].x ;
      this.General.Sheet = new Sheet();
      this.General.Sheet.label = this.General.TextArea;
      this.General.Sheet.cells = res.cells;
      this.General.Sheet.isAvailable = true;
      this.General.Sheet.minX = minX;
      this.General.Sheet.maxX = maxX;
      this.General.Sheet.GroupDataSource = res.groupDataSource;
      this.ViewReadFormula = true;
      this.spinner.hide();
    } else{
      alert('Warning no cells') ;
    }
   })
  }



GetRows(){
  if (this.General.Sheet!=null){
    var RowsArray = [];
    for (let index = this.General.Sheet.minX; index <= this.General.Sheet.maxX; index++) {
      RowsArray.push(index);
    }
    return RowsArray ;
  }
  else{
    return [];
  }
}

GetRowCells(row:any ){
  return this.General.Sheet?.cells.filter(c=>c.x==row).sort((a,b) => a.y - b.y);
}

CopyDataSources(group:Group ,Scenario:Scenario){
  this.spinner.show();
  this.PipeLinesService.CopyDataSource(this.General.fileId ,this.Deal.macroDeal.pipedriveId ,group.id).subscribe(res=>{
    this.LoadDataSources(this.Deal.macroDeal.pipedriveId, Scenario.id);
    this.spinner.hide()
  })
}

deleteGroupDataSource(DaraSourceId:any ,group){
  this.spinner.show();
  this.PipeLinesService.DeleteGroupDataSource(DaraSourceId).subscribe(res=>{
   console.log(res);
   this.GetDataSources(group)
   this.spinner.hide()
 })
}

EditLandingPage(groupDataSource:groupDataSource){
  if( groupDataSource.namedRange ) {
  this.PipeLinesService.ReadNamedRanges(groupDataSource.fileId).subscribe(res=>{
    this.General.NameRange = res;
  })
}
  this.General.EditDataSource = groupDataSource ;
  this.UpdateFormula =true;
}

ToggleLandingPage(Group:Group , Scenario:Scenario){
  this.spinner.show() ;
   this.PipeLinesService.toggleLandingPage(Group.id).subscribe(res=>{
     this.GetScenarioGroups(Scenario) ;
     this.spinner.hide();
   })
}

UpdateLandingPage(groupDataSource:groupDataSource){
  this.spinner.show();
  this.PipeLinesService.SaveDataSource(groupDataSource).subscribe(res=>{
    this.UpdateFormula = false ;
    this.spinner.hide() ;
  })
}

// End Landing Page

// Start MacroDeal Parametars modal Methods
SaveParam( form: NgForm ){
  let macroDeal = new MacroDealRequest();
  macroDeal.PipedriveId = this.Deal.macroDeal.pipedriveId ;
  macroDeal.Title = form.value.title ;
  macroDeal.Description = form.value.description;
  macroDeal.City = form.value.city ;
  macroDeal.State = form.value.state ;
  macroDeal.Address = form.value.address ;
  macroDeal.SquareFootage = form.value.squareFootage;
  macroDeal.NumberofUnits  = Number(form.value.numberofUnits) ;
  this.PipeLinesService.UpdateDealFields(macroDeal).subscribe(res =>{
  })
}

SaveParamTextArea( form: NgForm ){
  let updateDealParam = new UpdateDealParam();
  updateDealParam.MacroDealId =  this.Deal.macroDeal.pipedriveId ;
  updateDealParam.Params = form.value.macroDealParam ;
  this.PipeLinesService.UpdateDealParams(updateDealParam).subscribe(res =>{
  })
}
// End MacroDeal Parametars modal Methods

// Start Parametes for group modal Methods
openGroupParam(content, modalObject:Group ){
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  this.General.modalObject = modalObject;
  this.PipeLinesService.GetGroupParameters(this.General.modalObject.id).subscribe(res => {
    modalObject.groupParameters = res;
    })
}

SaveParamForGroup(form: NgForm){
  this.spinner.show();
    let dealGroupParamsRequest = new DealGroupParamsRequest();
    dealGroupParamsRequest.MacroDealId = this.Deal.macroDeal.pipedriveId ;
    dealGroupParamsRequest.Params = form.value.groupParam;
    dealGroupParamsRequest.GroupId = +this.General.modalObject.id ;
      this.PipeLinesService.UpdateDealGroupParams(dealGroupParamsRequest).subscribe(res => {
        this.spinner.hide();
    })
}
// End Parametes for group modal Methods

// Start Create scenario modal Methods
SaveScenario() {
  this.PipeLinesService.CreateScenario(this.Deal.macroDeal.pipedriveId,this.General.NewScenarioTitle).subscribe((res) => {
    this.General.NewScenarioTitle="";
    this.GetDealScenarios();
  });
}
// End Create scenario modal Methods


// Start Move Stage Methods
MoveToStage(stageId){
  this.PipeLinesService.MoveStage(this.General.microDealId , stageId).subscribe(res =>{
        this.GetGroupMicroDeals(this.General.modalObject);
  })
}
// End Move Stage Methods


// Start  Add Organizations
LoadMembers(Group:Group) {
  this.General.checkedPersonsIds = [];
  this.spinner.show();
  this.GrpId =Group.id;
  this.AddMemberGroup = Group ;
  this.PipeLinesService.getOrganizations(Group.id).subscribe((res: any) => {
    this.General.Organizations = res.organizations;
    this.General.PersonField = res.personData ;

    this.General.Organizations.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })

  this.spinner.hide();
  });
}

GetJobTitle(person:Persons){
  var jobtitle = person.personFieldValues.filter(v=>v.fieldId==6);
  if (jobtitle.length>0){
    person.JobTitle = person.personFieldValues.filter(v=>v.fieldId==6)[0].fieldValue;
  }else{
    person.JobTitle = "";
  }
  return true;
}

GetLinkedIn(person:Persons){
  var linkedin = person.personFieldValues.filter(v=>v.fieldId==7)
  if ( linkedin !=null && linkedin.length > 0 ){
    person.Linkedin= linkedin[0].fieldValue;
  }else{
    person.Linkedin="";
  }
    return true;
  }

  GetPersonType(person:Persons){
    let labels:string;
    labels="";
    var persontypes = person.personFieldValues.filter(v=>v.fieldId==1);
    if (persontypes!=null && persontypes.length>0){
      var types = persontypes[0].fieldValue.split(',');
      for (var type of types){
        if (type !="" )      {
          var label = this.General.PersonField.filter(p=>p.id==1)[0].options.filter(o=>o.id.toString()==type);
          if (label!=undefined && label.length>0){
            if (labels==""){
              labels+=label[0].label;
            }else{
              labels+=", " + label[0].label;
              }
          }
        }
      }
     return labels;
    }
  }

  selectOption(id: any) {
    this.personTypeId = id.value;
  }

  InitAdvancedFilters(){
    if (this.General.AdvancedFilters==null){
      this.General.AdvancedFilters= new  AdvancedFilters();
    }
  }

 checkAllOrgnizations(event){
    var checked = event.target.checked;
      if(checked){
        this.havePipeDriveId = true;
      }else{
        this.havePipeDriveId = false;
      }
  }

  Send() {
    this.spinner.show();

    // let GroupNumber = + Group.id;
    // console.log(GroupNumber);
    // this.GrpId
    let lendersRequest = new LendersDto(this.General.checkedPersonsIds, this.Deal.macroDeal.pipedriveId, this.GrpId);
    this.PipeLinesService.SendToLenders(lendersRequest).subscribe( (res: any) => {
      this.GetGroupMicroDeals(this.AddMemberGroup);
        this.spinner.hide();
      }
    );
  }

// End Add Organizations


  DeleteScenario(ScenarioId:number){
    this.spinner.show();
    let item = 'scenario' ;
    this.PipeLinesService.deleteItem(item , ScenarioId).subscribe(res=>{
      this.GetDealScenarios();
      this.spinner.hide();
    })
  }

  DeleteGroup(GroupId:number , Scenario:Scenario){
    this.spinner.show();
    let item = 'group';
    this.PipeLinesService.deleteItem(item , GroupId).subscribe(res=>{
      this.GetScenarioGroups(Scenario) ;
      this.spinner.hide();
    })
  }

  DeleteMicroDeal( MicroDealId:number , Group:Group ){
    this.spinner.show();
    let item = 'microdeal' ;
    this.PipeLinesService.deleteItem(item , MicroDealId).subscribe(res=>{
      this.GetGroupMicroDeals(Group);
      this.spinner.hide();
    })
  }

  GetCategory(e){
    this.General.CategoryId = e.target.value;
  }

  SetCategory(File){
  this.PipeLinesService.AssignToCategory(File.id , this.General.CategoryId).subscribe(res=>{
    console.log(res);
    })
  }


// GetCustomFields(){
//   this.PipeLinesService.GetCustomFields().subscribe((res: CustomFields) => {
//     this.Deal.customFields = res;
//     this.Deal.customFields.dealCustomFieldMeta.filter((data) => !this.General.expect.includes(data.fieldLabel)
//     );
//   });
// }

  GetFieldLabel(id:string){
    var label = this.Deal.customFields.dealCustomFieldMeta.filter((data) => data.id==id)[0].fieldLabel;
    return label;
  }

  SaveCustomFields() {
    this.spinner.show();
    this.PipeLinesService.SaveCustomFields(this.Deal).subscribe((res: any) => {
        this.spinner.hide();
      } );
  }



 GetDealScenarios(){
  this.PipeLinesService.getScenario(this.Deal.macroDeal.pipedriveId).subscribe((res:Scenario[]) => {
    this.Deal.Scenarios = res;
    if (this.General.Params!=null && this.General.Params.Scid!=null){
      this.GetScenarioGroups(this.Deal.Scenarios.filter(s=>s.id==this.General.Params.Scid)[0]);
    }
  });
 }

 GetScenarioGroups(scenario:Scenario) {
  this.PipeLinesService.GetActiveCampaignPipelinesForScenario(scenario.id).subscribe((res: any) => {
    scenario.groups = res.dealGroups;
    this.Deal.Scenarios.forEach(s => {
        if (s == scenario && s.openScenario ==false) {
          s.openScenario = true;
        } else{
          s.openScenario = false;
        }
    });


    scenario.groups.forEach(group => {
      group.stages = [];
      res.dealStages.forEach(Stage => {
          Stage.microdeals=[];
          group.stages.push(Stage);
          group.stages = group.stages.sort((a,b) => a.order - b.order);
      });
      if (this.General.Params!=null && this.General.Params.GpId!=null && this.General.Params.GpId==group.id){
        this.GetGroupMicroDeals(scenario.groups.filter(g=>g.id==this.General.Params.GpId)[0]);
      }
    });
  });
}

SaveGroup() {
  if (this.General.modalObject.NewGroupTitle!=undefined && this.General.modalObject.NewGroupTitle!=""){
    this.spinner.show();
    this.PipeLinesService.createGroup(this.General.modalObject.id,this.General.modalObject.NewGroupTitle).subscribe((res) => {
      this.GetScenarioGroups(this.Deal.Scenarios.filter((scenario) => scenario.id== this.General.modalObject.id)[0]);
      this.spinner.hide();
    });
  }
}

// LoadActiveCampaignAccounts(){
//   this.PipeLinesService.LoadActiveCampaignAccounts().subscribe((res:any)=>{
//     this.General.accounts = res.accounts;
//     this.General.accounts.sort(function(a, b){
//       if(a.name < b.name) { return -1; }
//       if(a.name > b.name) { return 1; }
//       return 0;
//   })
//     this.spinner.hide();
//   })
// }

GetGroupMicroDeals(Group:Group){
  this.spinner.show();

  this.Deal.Scenarios.forEach(scenario => {
    scenario.groups.forEach(group => {
        if(group.closeGroup){
          group.closeGroup = false;
        }
    });
  });

  Group.stages.forEach(Stage => { Stage.microdeals = [] ; });
    this.PipeLinesService.GetActiveCampaignDealsForPipeline(Group.id).subscribe((res: any) => {
    let MicroDeals:MicroDeal[] = res.deals;
    Group.closeGroup = true;
    MicroDeals.forEach(MicroDeal => {
        Group.stages.filter((stage)=> stage.id == MicroDeal.stage)[0].microdeals.push(MicroDeal);
      });

    MicroDeals.forEach(MicroDeal => {
      this.PipeLinesService.GetActions( MicroDeal.id ).subscribe( (res:any)=>{
          MicroDeal.newMail = res.newMail ;
          MicroDeal.inboxNumber = res.inbox ;
          MicroDeal.sent = res.sent ;
          MicroDeal.actions =  res.actions ;
          MicroDeal.LandingPageLoad = MicroDeal.actions.filter(r => r.actionName == 'Landing Page Load');
          MicroDeal.PreviewFile = MicroDeal.actions.filter(r => r.actionName == 'Preview File');
          MicroDeal.DownlaodFile = MicroDeal.actions.filter(r => r.actionName == 'Downlaod File');
          MicroDeal.MailRead = MicroDeal.actions.filter(r => r.actionName == 'MailRead');

        // if( MicroDeal.activity.length >= 1  ) {
        //   MicroDeal.latestActivity =  MicroDeal.activity.reduce( (a:any, b:any) => (a.dateTime > b.dateTime ? a : b) )
        // }
    });
  });
  document.getElementById(String(Group.id)).style.display = 'inline-block';
  this.spinner.hide();
  });
}


 scrolltome(id:any){
  if (!this.General.didScroll){
    if (this.General.Params!=null && this.General.Params.MicroId!=null && this.General.Params.MicroId == id){
      var element = document.getElementById(id);
      var headerOffset = 200;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
  });
  this.General.didScroll= true;
}}
}

// scrolltome(id:any){
//   if (!this.General.didScroll){
//     if (this.General.Params!=null && this.General.Params.MicroId!=null && this.General.Params.MicroId==id){
//       console.log(this.General.Params.MicroId+"-"+id)
//       var elmnt = document.getElementById(id);
//       elmnt.scrollIntoView();
//       console.log(window.scrollY)
//       this.General.didScroll=true;
//     }
//   }
// }
CloseGroup(Group:Group){
  if(Group.closeGroup == undefined || Group.closeGroup == false){
     Group.closeGroup = true ;
  }else{
     Group.closeGroup =! Group.closeGroup
  }
}


OrganizationExist(organization:account,group:Group){
  var found:boolean;
  found=false;
    group.stages.forEach(stage=>{
      if (!found){
        if (stage.microdeals!=null && stage.microdeals.length>0){
          if (stage.microdeals.filter(s=>s.organization==organization.id).length>0){
            found=true;
          }
        }
      }
    })
  return found;
}

GetOrgPersons(organization) {
  organization.persons = this.General.persons.data.filter(p=> p.organizationId == organization.id);
}

GetMicroDealInbox(MicroDeal:MicroDeal) {
  this.PipeLinesService.GetAllPersonsByOrg(MicroDeal.organization).subscribe((res:any)=>{
    this.General.persons = res;
  })

this.Deal.Scenarios.forEach(scenario => {
  scenario.groups.forEach(group => {
    group.stages.forEach(stage => {
    stage.microdeals.forEach(microDeal => {
      if (microDeal.id != MicroDeal.id){
      if (microDeal.toggleInbox){
        microDeal.toggleInbox=false;
      }
      }
     });
    });
  });
});

  if(MicroDeal.toggleInbox == undefined){
    this.spinner.show();
    this.PipeLinesService.getMail(MicroDeal.id).subscribe((res: Mail[]) => {
    MicroDeal.inbox = res;
    MicroDeal.toggleInbox = true;
    this.spinner.hide();
  });

 } else{
    MicroDeal.toggleInbox =! MicroDeal.toggleInbox ;
 }

}
 getMailsForContact(PersonId:number , MicroDeal:MicroDeal){
   return MicroDeal.inbox.filter(r=> r.contactId == PersonId ) ;
 }

getOrganizationName(orgid:number){
  console.log(orgid)
  if (orgid==null){
    return "";
  }
  else{
    var org = this.General.accounts.filter(r=>r.id==orgid)
    if (org.length>0){
      return org[0].name;
    }else{
        return "";
    }
  }
}

GetOrganization(OrganizationId:number){
  if( this.General.Stage.microdeals.filter(r=> r.organization == OrganizationId).length >0)
  {
    return true;
  } else{
    false
  };
}

GetOrgName(orgID:any){
    return this.General.accounts.filter(r=>r.id ==orgID)[0];
}

GetContactForOrganization(OrganizationId:number){
    return this.General.persons.data.filter(r=>r.organizationId == OrganizationId);
}

OpenMail(microDeal:MicroDeal,email: Mail) {
if (microDeal!=null){
  microDeal.inbox.forEach(mail => {
    if(mail.id!=email.id){
      if (mail.togglebody) {mail.togglebody = false;}
    }
  });
}
   if (email.togglebody==undefined){
    this.spinner.show();
    this.PipeLinesService.getMailBody(email.id).subscribe((res: any) => {
    email.body = res.body;
    email.previewMailbody = this.sanitizer.bypassSecurityTrustHtml(res.body);
    email.togglebody = true;
    this.GetAttachementsForReply(email);
    this.spinner.hide();
    });
  }else{
    email.togglebody=!email.togglebody;
  }
}

ReplyMail(email:Mail){
  if (email.toggleReply==undefined) {
    email.toggleReply = true;
    var replybody = "<br/><br/><br/><br/>" +  email.fromAddress + " wrote on " + email.date + "<br/><br/>";
    email.replySubject ="RE:" + email.subject;
    replybody +="<div style='padding:50px;border:1px solid black;'>" ;
    replybody += email.body  + "</div>";
    email.replyBody = this.sanitizer.bypassSecurityTrustHtml(replybody);
    email.files = [];
  }else{
    email.toggleReply =! email.toggleReply ;
  }
}

UploadFileForReply(event ,email:Mail) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadFormForReply.get('profile').setValue(file);
    const formData = new FormData();
    formData.append('file', this.uploadFormForReply.get('profile').value);
    formData.append('outbox', email.outbox);
    let  SERVER_URL = "http://40.76.123.27:8096/api/template/SaveFile";
    this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
      this.GetAttachementsForReply(email);
    });
 }
}

GetAttachementsForReply(email:Mail){
  this.PipeLinesService.GetFiles(email.outbox).subscribe((res:any) =>{
      email.attachements = res;
   })
}

deleteFileReply(email:Mail , fileName){
  this.PipeLinesService.DeleteFile(email.outbox, fileName).subscribe((res:any) =>{
    this.GetAttachementsForReply(email);
  })
}

checkIibraryFilesForReply(event , email:Mail){
  var checked = event.target.checked;
  var files = +event.target.value;
  if (checked) {
    email.files.push(files);
  } else {
    var index = email.files.indexOf(files);
    email.files.splice(index, 1);
  }
}

SendReplyEmail(email:Mail, Stage:Stage) {
  var microdeal = Stage.microdeals.filter(microdeal=>microdeal.id==email.microDealId)[0]
  microdeal.contacts = new RootObjectPerson();
  microdeal.contacts.data = [];
  var contact = new Person()
  contact.isSelected=true;
  contact.id = email.contactId;
  microdeal.contacts.data.push(contact);
   this.spinner.show();
  var mailBody = this.replyRTE.getContent().innerHTML;
  let MailMessage = new Template();
  MailMessage.name = email.replySubject
  MailMessage.body =  mailBody;
  MailMessage.dealId = this.Deal.macroDeal.pipedriveId;
  MailMessage.subject = email.subject;
  MailMessage.outbox = email.outbox;
  MailMessage.Stage= Stage;
  MailMessage.files = email.files ;
  this.PipeLinesService.SendTemplate(MailMessage).subscribe((res: any) => {
    email.toggleReply=false;
    email.togglebody=false;
    this.spinner.hide();
  });
}

GetMicroDealInfo(MicroDeal:MicroDeal) {
  this.spinner.show();
  this.PipeLinesService.GetActiveCampaignContact(MicroDeal.contact).subscribe( (res: any) => {
    MicroDeal.Contact = res.contact;
        this.spinner.hide();
    }
  );
}

getClassName(classname:string){
  return classname.split(' ').join('-');
}

getClassBorderName(classname:string){
  return classname.split(' ').join('-')+"b"
}

check(event: any) {
  var checked = event.target.checked;
  var personId = +event.target.value;
  if (checked) {
    this.General.checkedPersonsIds.push(personId);
  } else {
    var index = this.General.checkedPersonsIds.indexOf(personId);
    this.General.checkedPersonsIds.splice(index, 1);
  }
}

GetGuid(Group:Group, Stage:Stage, followUp:boolean){
  Stage.toggleSendGroupFollow = followUp;
  if(Stage.toggleSendGroup == undefined || Stage.toggleSendGroup==false)
     {
      this.General.SelectedTemplate = new  Template();
      this.General.Stage = Stage;
      this.General.SelectedTemplate.dealId = this.Deal.macroDeal.pipedriveId;
      this.General.SelectedTemplate.files = [];
      this.PipeLinesService.GetGUID().subscribe((res:any) => {
        Stage.toggleSendGroup = true ;
        this.General.SelectedTemplate.outbox = res.outbox ;
      })
      this.LoadSentEmails(Group);
      this.LoadContacts(Stage);
     } else {
      Stage.toggleSendGroup =! Stage.toggleSendGroup ;
     }
}

LoadContacts(Stage){
  Stage.microdeals.forEach(microdeal => {
    this.GetPersonsByOrgId(microdeal);
  });
}

GetPersonsByOrgId(microdeal:MicroDeal) {
  this.PipeLinesService.GetAllPersonsByOrg(microdeal.organization).subscribe((res:any)=>{
    microdeal.contacts = res;
  })
}

UploadFile(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadForm.get('profile').setValue(file);
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('outbox', this.General.SelectedTemplate.outbox);
    let   SERVER_URL = "http://40.76.123.27:8096/api/template/SaveFile";
    this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
      this.GetAttachements();
      });
 }
}

deleteFileGroup(fileName){
  this.PipeLinesService.DeleteFile(this.General.SelectedTemplate.outbox, fileName).subscribe((res:any) =>{
    this.GetAttachements();
  })
}

GetAttachements(){
  this.PipeLinesService.GetFiles(this.General.SelectedTemplate.outbox).subscribe((res:any) =>{
    this.General.SelectedTemplate.attachements = res;
   })
}

checkIibraryFiles(event){
  var checked = event.target.checked;
  var files = +event.target.value;
  if (checked) {
    this.General.SelectedTemplate.files.push(files);
  } else {
    var index = this.General.SelectedTemplate.files.indexOf(files);
    this.General.SelectedTemplate.files.splice(index, 1);
  }
}

checklandingPage(event){
  var checked = event.target.checked;
  if (checked) {
    this.General.SelectedTemplate.landingPage = true;
  } else {
    this.General.SelectedTemplate.landingPage = false;
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

CheckChart(event:any , item:ChartsSheet){
  var checked = event.target.checked;
  if (checked) {
    item.isAvailableChart =true;
  } else {
    item.isAvailableChart =false;
  }
}

CheckCustiomFormula(event:any){
  var checked = event.target.checked;
  if (checked) {
    this.General.Sheet.isAvailable=true;
  } else {
    this.General.Sheet.isAvailable=false;
  }
}

SendEmailForGroup(group ,Stage) {
  this.spinner.show();
  this.General.SelectedTemplate.Stage = Stage;
  this.General.SelectedTemplate.followUp = Stage.toggleSendGroupFollow;
  console.log(this.General.SelectedTemplate);

  this.PipeLinesService.SendTemplate(this.General.SelectedTemplate).subscribe((res: any) => {
    this.spinner.hide();
    Stage.toggleSendGroup = false ;
    this.GetGroupMicroDeals(group);
  });
}

CloseSendGroup(Stage:Stage){
  Stage.toggleSendGroup = false ;
}

LoadSentEmails(Group:Group){
  this.PipeLinesService.LoadSentEmails(Group.id).subscribe((res=> {
    Group.SentEmails = res.filter((r) => r.outbox!=null);
  }))
}

selectSentMail(group:Group)
{
  this.General.SelectedTemplate.name = null;
  this.General.sentEmails = [];
  let selectedEmail = group.SentEmails.find( r=> r.id == this.General.SelectedTemplate.id);
    this.PipeLinesService.LoadSentEmailBody(selectedEmail).subscribe((res:any) =>{
    this.General.SelectedTemplate.body = res.body;
      this.General.sentEmails = res.microDealIds ;
      selectedEmail = null;
      this.PipeLinesService.GetFiles(this.General.SelectedTemplate.outbox).subscribe((res:any) =>{
      this.General.SelectedTemplate.attachements = res ;
    })
  }) ;
  this.General.SelectedTemplate.subject = this.GetTemplateSubject(group);
}

GetSelectedEmailDeals(Group:Group){
  var filtered = [];
  if (this.General.SelectedTemplate.id != undefined){
    let sentmicrodealIds = Group.SentEmails.find(r=> r.id == this.General.SelectedTemplate.id).microDealIds;
    for(var microdeal of this.General.Stage.microdeals){
      var found = false;
      for(var microdealid of sentmicrodealIds){
        if(microdealid == microdeal.id){
          found=true;
        }
      }
      if(found){
        filtered.push(microdeal);
        console.log(filtered);
      }
    }
  }
  return filtered;
}

GetSelectedEmailOtherDeals(Group:Group){
  var filtered = [];
  if (this.General.SelectedTemplate.id!=undefined){
    let sentmicrodealIds = Group.SentEmails.find(r => r.id == this.General.SelectedTemplate.id).microDealIds;
    for(var microdeal of this.General.Stage.microdeals){
      var found = false;
      for(var microdealid of sentmicrodealIds){
          if(microdealid == microdeal.id){
            found=true;
        }
      }
      if (!found){
        filtered.push(microdeal);
      }
    }
  }
  return filtered;
}

GetTemplateSubject(Group:Group):string{
  var templatename="";
  if (this.General.SelectedTemplate!=null){
    if (this.General.SelectedTemplate.id!=null){
      templatename= Group.SentEmails.find(r=> r.id == this.General.SelectedTemplate.id).name;
    }else if (this.General.SelectedTemplate.name!=null){
      templatename=  this.General.SelectedTemplate.name;
    }
  }
  return templatename;
}


checkIfAllSelected() {
  this.selectedAll = this.General.Stage.microdeals.every(function(item:any) {
      return item.selected == true;
    })
}

checkOrganization(event, microdeal:MicroDeal){
  var checked = event.target.checked;
  microdeal.contacts?.data?.forEach(contact=>{
      contact.isSelected = checked;
  });
}

checkOrganizationFollow(event, microdeal:MicroDeal){
  var checked = event.target.checked;
  microdeal.followUpContacts?.data?.forEach(contact=>{
      contact.isSelected = checked;
  });
}

CheckContact (event,person:Person){
  var checked = event.target.checked;
  person.isSelected = checked;
}

SelectAll(event,Stage:Stage){
  var checked = event.target.checked;
  Stage.microdeals.forEach(microdeal => {
    microdeal.contacts?.data?.forEach(contact => {
      contact.isSelected = checked;
    });
  });
}

SelectAllFollow(event,Stage:Stage){
  var checked = event.target.checked;
  Stage.microdeals.forEach(microdeal => {
    microdeal.followUpContacts?.data?.forEach(contact => {
      contact.isSelected = checked;
    });
  });
}

// previewHandleForGroup(microdealId){
//   this.spinner.show();
//   this.General.SelectedTemplate.microDealIds = [+microdealId];
//   this.PreviewMode = true;
//   //this.HideWhenPreview =! this.HideWhenPreview;
//   this.PipeLinesService.DecodeTemplate(this.General.SelectedTemplate).subscribe((res:any) =>{
//     this.General.PreviewTemplate = res;
//     this.spinner.hide();
//     // this.General.SelectedTemplate.microDealIds =[];
//   })
//   // this.showPreviewMailGroup = !this.showPreviewMailGroup;
//   // this.showRichBoxGroup =! this.showRichBoxGroup ;
//   // this.HideWhenPreviewGroup =! this.HideWhenPreviewGroup ;
//   // this.showFieldsGroup =false;

//   // let arr = [Number(deaiId)];
// //   let emptay = '';

// //   if(this.showPreviewMailGroup == true) {
// //   this.spinner.show();
// //   this.PipeLinesService.DecodeTemplate(this.General.SelectedTemplate).subscribe((res: any) => {
// //   this.missingTags = res.missingTags ;
// //   console.log(this.missingTags);

// //     if ( this.missingTags.length > 0) {
// //         this.showFieldsGroup = true ;
// //     }


// //     let customFeilds = this.anotherCustomFields.map( r=> r.fieldLabel) ;
// //     this.intersection = customFeilds.filter(element => this.missingTags.includes(element));
// //     console.log(this.intersection);

// //     this.previewBody = this.sanitizer.bypassSecurityTrustHtml(res.body);
// //     this.oneSubjectTemp = res.name;
// //     this.spinner.hide();
// //   });
// // }
// }

ClosePreview(){
  this.PreviewMode =false;
}

selectOptionType(id: any) {
  this.personType = id.value ;
}
selectOrg(id: any) {

  this.OrganizationId = id.value ;
}
CreateOneMember(group){
  this.spinner.show();
    this.PipeLinesService.
  CreateMember(
    this.General.CreateMember.firstname,
    this.General.CreateMember.lastname,
    this.General.CreateMember.email,
    this.General.CreateMember.phone ,
    this.Deal.macroDeal.pipedriveId  ,
    this.General.modalObject.id ,
    this.personType ,
    this.OrganizationId ).subscribe(res =>{
      this.GetGroupMicroDeals(group);
      this.spinner.hide();
     })
}



OpenMemberInbox(person:Person ,personEmail){
  if(person.ToggleAddMemberInbox == undefined){
    this.spinner.show();
      for(let email of personEmail){
        var Email = email.value;
      }
      this.PipeLinesService.LoadPersonEmails(Email).subscribe((res: Mail[]) =>{
        person.ToggleAddMemberInbox = true ;
        person.inboxPerson = res;
        this.spinner.hide();
      })
  }else{
    person.ToggleAddMemberInbox =! person.ToggleAddMemberInbox;
  }
}

GetMainInbox(MicroDeal:MicroDeal){
  this.PipeLinesService.GetAllPersonsByOrg(MicroDeal.organization).subscribe((res:any)=>{
    this.General.persons = res;
  })

  this.Deal.Scenarios.forEach(scenario => {
    scenario.groups.forEach(group => {
      group.stages.forEach(stage => {
      stage.microdeals.forEach(microDeal => {
        if (microDeal.id!=MicroDeal.id){
        if (microDeal.toggleMainInbox)  microDeal.toggleMainInbox=false;
        }
       });
      });
    });
  });
  if( MicroDeal.toggleMainInbox == undefined){
    this.spinner.show();
    this.PipeLinesService.GetActiveCampaignContact(MicroDeal.contact).subscribe((res: any) => {
      var Email = res.contact.email;
        this.PipeLinesService.LoadPersonEmails(Email).subscribe((res: Mail[]) =>{
           MicroDeal.mainInbox = res ;
           MicroDeal.toggleMainInbox = true;
           this.spinner.hide();
          })
     });
    }else{
      MicroDeal.toggleMainInbox =! MicroDeal.toggleMainInbox  ;
    }
}

getAllMailsForContact(PersonId:number , MicroDeal:MicroDeal){
  return MicroDeal.mainInbox.filter(r=> r.contactId == PersonId ) ;
}

Flaged(){
  this.isFalg=!this.isFalg;
}

GetDealDataSources(){
  this.spinner.show();
  this.PipeLinesService.GetDealDataSources(this.Deal.macroDeal.pipedriveId).subscribe(res=>{
       this.General.DataSources = res;
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
      this.spinner.hide();
  })
}


GetDealImages(){
  this.spinner.show();
  this.PipeLinesService.GetDealImages(this.Deal.macroDeal.pipedriveId).subscribe(res=>{
    this.Deal.images = res.filter(r=> r!= 'main.jpg');
    this.Deal.MainImage =  res.filter(r=> r=='main.jpg') ;
    this.spinner.hide() ;
  })
}



checkGroups(event){
  var checked = event.target.checked;
  var GroupsIds = +event.target.value;
  if (checked) {
    this.General.GroupIds.push(GroupsIds);
  } else {
    var index = this.General.GroupIds.indexOf(GroupsIds);
    this.General.GroupIds.splice(index, 1);
  }
}


GetScenarioFiles(){
  this.PipeLinesService.getScenario(this.Deal.macroDeal.pipedriveId).subscribe((res:any) => {
    this.General.Scenarios = res ;
    this.General.Scenarios.forEach(element => {
      this.GetScenarioGroups(element);
    });
    });
}



GetMessageId(){
  this.spinner.show();
  this.PipeLinesService.GetMailByMessageId(this.General.messageid).subscribe((res:any)=>{
    this.General.Mail = res;
    this.spinner.hide();
  })
}

AssignMailToMicroDeal(){
 this.spinner.show();
 this.PipeLinesService.AssignMailToMicroDeal(this.General.Mail.id , this.General.modalObject).subscribe(res =>{
   console.log(res);
   this.spinner.hide();
 })
}

GetDataSources(Group:Group){
    this.PipeLinesService.GetDataSources(Group.id).subscribe((res:any)=>{
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
    this.General.DataSource?.forEach(d=> {
      if(d.id == id && d.macroDealId == null){
        this.fileNamex = d.filename + '[ Global ]' ;
      }
      if (d.id == id && d.macroDealId !== null) {
       this.fileNamex = d.filename  + '[ Local ]'  ;
      }
    })
   return  this.fileNamex;
  }

  MoveUp( datasourceId:number ,Group:Group){
  this.spinner.show();
  let direction = -1 ;
  this.PipeLinesService.MoveDatasource(direction ,datasourceId).subscribe(res=>{
    console.log(res);
    this.GetDataSources(Group);
    this.spinner.hide();
  })
  }

  MoveDown(datasourceId:number ,Group:Group){
    this.spinner.show();
    let direction = 1 ;
    this.PipeLinesService.MoveDatasource(direction ,datasourceId).subscribe(res=>{
      this.GetDataSources(Group);
      console.log(res);
      this.spinner.hide();
    })
  }

  checkItem( event:any, item:any ){
    var checked = event.target.checked;
    if ( checked ){
        item.required = 1 ;
       } else {
        item.required =  0;
      }
  }

checkType( event:any, category:any ){
  var required:any;
  var checked = event.target.checked;
  if ( checked ){
      category.showMessage =  true;
      required = 1 ;
      const formData = new FormData();
      formData.append('file',  null);
      formData.append('categoryId', category.id);
      formData.append('required', required);
      formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
      formData.append('message', null);
      let  SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveFile";
      this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
      });
     } else {
       required =  0;
       category.showMessage =  false;
       const formData = new FormData();
       formData.append('file',  null);
       formData.append('categoryId', category.id);
       formData.append('required', required);
       formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
       formData.append('message', null);
       let  SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveFile";
       this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
       });
    }
}

SendType(category:any){
  var required:any =1;
  const formData = new FormData();
  formData.append('file',  null);
  formData.append('categoryId', category.id);
  formData.append('required', required);
  formData.append('dealId', String(this.Deal.macroDeal.pipedriveId));
  formData.append('message', category.message);
  let  SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveFile";
  this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {
  });
}





SyncDataSource(dataSource:DataSources){
  // this.spinner.show();
  this.PipeLinesService.CacheBoxFile(dataSource.id,this.Deal.macroDeal.pipedriveId).subscribe(el => {
      console.log('Value Received ' + el)
      },
      err => {
        console.log("Error caught at Subscriber " + err)
      },
      () => console.log("Processing Complete.")
    )
  }





  // GetDataSource(){
  //   this.PipeLinesService.LoadDataSources().subscribe(res=>{
  //     this.General.DataSource = res;
  //   })
  // }

  // getAllPersonsByOrg(OrgId:number){
  //   this.PipeLinesService.GetAllPersonsByOrg(OrgId).subscribe((res:any)=>{
  //     console.log(res);
  //   })
  // }

  // SelectLandingPage(event){
  //   this.General.landingPage.id = event.target.value;
  //   this.General.landingPagesGroup = this.General.landingPageResponse.filter(res=> res.id == this.General.landingPage.id )[0];
  //   console.log(this.General.landingPagesGroup);
  //   this.landId = 0
  //   this.landingPageIdss = this.General.landingPage.id  ;
  //   let GroupLandingPageData:GroupLandingPageDataSources;
  //   this.General.LandingPageDataSource.forEach(element => {
  //     if(element.landingPageId ==  this.General.landingPage.id){
  //       GroupLandingPageData = new GroupLandingPageDataSources();
  //       GroupLandingPageData.Id = 0;
  //       GroupLandingPageData.DatasourceId = element.datasourceId ;
  //       GroupLandingPageData.LandingPageId = element.landingPageId ;
  //        this.General.GroupLandingPageDataSources.push(GroupLandingPageData) ;
  //     }
  //   });
  // }

  // checkIibraryFilesLandingPage(event){
  //   var checked = event.target.checked;
  //   var filesIds = +event.target.value;
  //   if (checked) {
  //     this.GroupFileIds.push(filesIds);
  //   } else {
  //     var index =  this.GroupFileIds.indexOf(filesIds);
  //      this.GroupFileIds.splice(index, 1);
  //   }
  //  }


  //  GetGroupLandingPageDataSource(Group){
  //    this.PipeLinesService.GetGroupLandingPageDataSource(Group.id).subscribe(res=>{
  //      this.General.GroupLandingPage = res ;
  //      console.log(`here`);

  //      console.log(res);

  //    })
  //  }

  //  SelectGroupLandingPage(event){
  //   this.General.GroupFiles = [];
  //   this.General.landingPage.id = event.target.value;
  //   this.General.landingPagesGroup = this.General.GroupLandingPage.filter(res=> res.id == this.General.landingPage.id )[0] ;

  //   this.landingPageIdss =this.General.landingPagesGroup.landingPageId ;
  //   this.landId = this.General.landingPagesGroup.id ;

  //   let GroupLandingPageData:GroupLandingPageDataSources;
  //   this.General.LandingPageDataSource.forEach(element => {
  //     if(element.landingPageId ==  this.General.landingPage.id){
  //       GroupLandingPageData = new GroupLandingPageDataSources();
  //       GroupLandingPageData.Id = 0;
  //       GroupLandingPageData.DatasourceId = element.datasourceId ;
  //       GroupLandingPageData.LandingPageId = element.landingPageId ;
  //        this.General.GroupLandingPageDataSources.push(GroupLandingPageData) ;
  //     }
  //   });
  //   this.GetGroupLandingPageFiles(this.General.landingPage.id);
  // }

  // SaveLandingPage(group){
  //   this.spinner.show() ;
  //  let GroupLandingPageFile:GroupLandingPageFiles;
  //  for (const fileId of this.GroupFileIds) {
  //    GroupLandingPageFile = new GroupLandingPageFiles();
  //    GroupLandingPageFile.Id = 0;
  //    GroupLandingPageFile.FileId = fileId ;
  //    GroupLandingPageFile.GroupLandingPageId = this.General.landingPagesGroup.landingPageId ;
  //    this.General.GroupLandingPageFiles.push(GroupLandingPageFile);
  //  }

  //  let SendGroupLandingPage =  new GroupLandingPage();

  //  SendGroupLandingPage.Id  = this.landId ;
  //  SendGroupLandingPage.GroupId = +group.id ;
  //  SendGroupLandingPage.LandingPageId =  +this.landingPageIdss;
  //  SendGroupLandingPage.PageContent = this.General.landingPagesGroup.pageContent ;
  //  SendGroupLandingPage.PageTitle = this.General.landingPagesGroup.pageTitle ;
  //  SendGroupLandingPage.GroupLandingPageDataSources = this.General.GroupLandingPageDataSources ;
  //  SendGroupLandingPage.GroupLandingPageFiles = this.General.GroupLandingPageFiles ;
  //  this.PipeLinesService.SaveGroupPage(SendGroupLandingPage).subscribe(res=>{
  //    this.General.landingPagesGroup.pageTitle = '';
  //    this.General.landingPagesGroup.pageContent ='';
  //    this.General.GroupFiles = [];
  //   //  this.GetGroupLandingPageDataSource(group);
  //    this.spinner.hide() ;
  //  })
  // }

  // GetGroupLandingPageFiles(LandingPageId:number){
  //     let files:GroupFiles ;
  //     this.General.GroupFiles = [] ;
  //     this.PipeLinesService.GetGroupLandingPageFiles(LandingPageId).subscribe(res=>{
  //       res.forEach(element => {
  //        files = new GroupFiles();
  //        files.fileName =  this.General.files.filter(r=> r.id == element.fileId)[0].name ;
  //        files.fileId =  this.General.files.filter(r=> r.id == element.fileId)[0].id ;
  //        if(element.fileId == files.fileId ){
  //          files.id = element.id ;
  //        }
  //        this.General.GroupFiles.push(files);
  //     });

  //     })
  // }

  // DeleteLandingPageFile(file){
  //   this.PipeLinesService.DeleteGroupLandingPageFile(file.id).subscribe(res=>{
  //     this.GetGroupLandingPageFiles(this.General.landingPage.id)
  //   })
  // }

  //new







//---------------------------------------------------RichTextBox Functions--------------------------------------------------------------

  open(content, modalObject?:any ,microDealId?:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.General.modalObject = modalObject;
    this.General.microDealId = microDealId ;
    this.General.CreateMember = new Member();
  }

  openDeleteGroupModal(content, Group , Scenario?:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.General.modalObject = Group;
    this.General.modalObject2 = Scenario ;
  }


  openLgAssign(content, modalObject:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.General.modalObject = modalObject;
    this.General.messageid = '' ;
  }

  openLg(content, modalObject?:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.General.modalObject = modalObject;
  }

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
        click: this.onClick.bind(this) ,
        template:
          '<button class="e-tbar-btn e-btn" tabindex="-1"  style="width:100%">' +
          '<div class="e-tbar-btn-text" style="font-weight: 500;">Personalize</div></button>'
      },

      {
        tooltipText: 'Insert Symbol',
        undo: true,
        click: this.onAddLink.bind(this) ,
        template:
          '<button class="e-tbar-btn e-btn" tabindex="-1"  style="width:100%">' +
          '<div class="e-tbar-btn-text" style="font-weight: 500;">Add Link</div></button>'

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

  public onAddLink() {
    this.templateRTE.focusIn();
    this.ranges = this.selection.getRange(document);
      var link = document.createElement("a");
      link.setAttribute("href","https://lender.capsnap.ai/page?key=#key#");
      link.text = "Click here for more deal information";
      this.ranges.insertNode(link);
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
