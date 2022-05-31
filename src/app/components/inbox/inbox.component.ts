import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute ,  private PipeLinesService: PipeLinesService 
    , private spinner: NgxSpinnerService ) { }
  mails:any[]=[]
  public mailBody!:any;
  Contact:any[]=[];
  microDealId:number;
  ngOnInit(): void {
    this.PipeLinesService.GetOrphanMail().subscribe((res:any) => {
      this.mails =res;
      console.log(res);
    })
  } 
  // End of ngOnInit

  getMailBody(mailId: number , fromAddress:string) { 
    this.PipeLinesService.getMailBody(mailId).subscribe( (res:any) => {
     this.mailBody = res;   
    }) 
    this.spinner.show();

    this.PipeLinesService.GetActiveCampaignContactByEmail(fromAddress).subscribe((res:any) =>{
      this.Contact = res.deals ;
      console.log(`start log`);
      console.log(this.Contact);
      this.spinner.hide();
    })

  }

  assginDeal(emailId:number , microDealId:number){
    console.log(emailId , Number(microDealId) );
    this.microDealId = Number(microDealId);
    this.PipeLinesService.SetOrphanMail(emailId , this.microDealId).subscribe((res:any) =>{
      console.log(res);
      
    })

  }



}
