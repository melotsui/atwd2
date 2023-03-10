import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Market } from './market.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  serverData: Object | null = null;
  http: HttpClient;
  tableHTML: String;
  marketList: any[];
  @Input() parent_sidebarData: any;
  @Input() parent_marketList: any | null = [];

  constructor(http: HttpClient) {
    this.http = http;
    this.tableHTML = 'tableHTML';
    this.marketList = [];
  }

  ngOnInit() {
    console.log(`Main: ${this.parent_sidebarData.region}`);

  }


}
