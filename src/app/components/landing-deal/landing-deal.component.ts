import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { General } from 'src/app/models/domain';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';

@Component({
  selector: 'app-landing-deal',
  templateUrl: './landing-deal.component.html',
  styleUrls: ['./landing-deal.component.css'],
})

export class LandingDealComponent implements OnInit {
  General: General;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private PipeLinesService: PipeLinesService, private spinner: NgxSpinnerService,private formBuilder: FormBuilder,
    private httpClient: HttpClient, private sanitizer: DomSanitizer, private modalService: NgbModal,
    private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.General = new General();
    this.spinner.show();
    this.activatedRoute.params.subscribe((params) => {
      this.PipeLinesService.getlandingpage(params.id).subscribe((res: any) => {
        this.General.landingPage = res.groupLandingPage.pageContent;
        this.spinner.hide();
      });
    });
  }
}
