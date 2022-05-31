import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-body',  
  styleUrls: ['./email-body.component.css'],
   templateUrl: './email-body.component.html' 
  
})
export class EmailBodyComponent implements OnInit {  
  constructor() { 
    console.log(this.deal); 
  }
  @Input() deal:any;
  
  ngOnInit(): void {

  }

}
