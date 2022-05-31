import { Component,OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToolbarService,LinkService, ImageService, HtmlEditorService, QuickToolbarService, NodeSelection} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { CustomFields, Deal, Field, General, Group, LendersDto, Mail, Member, MicroDeal, Person,  RootObjectPerson, Scenario, Stage, Template } from 'src/app/models/domain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Deal:Deal;
  General:General;
  constructor(public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.General = new General();
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
    this.activatedRoute.params.subscribe((params) =>{
      console.log(params);
      
      this.PipeLinesService.dealDetails(params.dealid).subscribe((res: Deal) => {    
        this.Deal = res;
        this.GetDealImages();
        this.GetDealParametars();
        // this.GetCustomFields();
        // this.GetClientFiles(params.microdealId ,params.groupId);

      })
    }) 
  }

  GetDealImages(){
    this.spinner.show();
    this.PipeLinesService.GetDealImages(this.Deal.macroDeal.pipedriveId).subscribe(res=>{
      this.Deal.images = res;
      this.Deal.MainImage =  res.filter(r=> r=='main.jpg') ;      
      this.spinner.hide() ;
    })
  }
  GetDealParametars() {
    this.spinner.show();
    this.PipeLinesService.GetDealDetails(this.Deal.macroDeal.pipedriveId).subscribe((Fields:Field[]) => {
      this.Deal.Fields = Fields;
      if (Fields.filter(F=>F.id=="296").length>0){
        this.Deal.macroDeal.description = Fields.filter(F=>F.id=="296")[0].fieldValue;
      }else{
        this.Deal.macroDeal.description = "";
      }
      
      this.spinner.hide();
    });

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

  // GetClientFiles(microdealId , groupId){
  //   this.PipeLinesService.GetUserFiles(this.Deal.macroDeal.pipedriveId , microdealId , groupId).subscribe(res=>{    
  //    this.General.files = res; 
  //    this.PipeLinesService.GetFileCategories().subscribe(res=>{
  //     this.General.categories = res;   
  //    })
  //   })
  // }

  getCategory(catid){
    return this.General.categories.filter(r=> r.id == catid)[0].name ;
  }

}
