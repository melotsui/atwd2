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

  constructor(http: HttpClient) {
    this.http = http;
    this.tableHTML = 'tableHTML';
    this.marketList = [];
  }

  ngOnInit() {
    console.log(`Main: ${this.parent_sidebarData.region}`);
    this.loadMarketList();
  }

  loadMarketList() {
    this.serverData = null;
    this.http.get<any>('http://localhost:8080/atwd/index.php/market')
      .subscribe({
        next: (res) => {
          this.serverData = res;
          console.log(res);
          this.marketList = res['Data'];
          console.log(this.marketList);
        },
        error: (err) => {
          this.serverData = "Server call failed: " + err
          console.log(`Server call failed: ${this.serverData}`);
        }
      });
  }

}
