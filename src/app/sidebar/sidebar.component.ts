import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Region } from './region.model';
import { Bussiness_Hour } from './business_hour.model';
import { District } from './district.model';
import { TC } from './tc.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  serverData: Object | null = null;
  sideBarForm: FormGroup;
  http: HttpClient;
  region: Region[];
  bussiness_hour: Bussiness_Hour[];
  district: District[];
  tc: TC[];

  constructor(fb: FormBuilder, http: HttpClient) {
    this.sideBarForm = fb.group({
      'search_name': '',
      'search_region': '',
      'search_district': '',
      'search_tc': []
    });
    this.http = http;
    this.region = [];
    this.bussiness_hour = [];
    this.district = [];
    this.tc = [];
  }

  ngOnInit() {
    this.loadSearchFields();
  }

  loadSearchFields() {
    this.serverData = null;
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/field')
      .subscribe({
        next: (res) => {
          this.serverData = res;
          this.region = res['Data']['region'];
          this.bussiness_hour = res['Data']['bussinessHour'];
          this.district = res['Data']['district'];
          this.tc = res['Data']['tc'];
        },
        error: (err) => {
          this.serverData = "Server call failed: " + err
          console.log(`Server call failed: ${this.serverData}`);
        }
      });
  }

  btnClear() {
    this.sideBarForm.reset();
    this.onChangeSearch();
  }

  onChangeRegion() {
    this.sideBarForm.controls['search_district'].setValue('-');
    let region = this.sideBarForm.value.search_region != '-' ? this.sideBarForm.value.search_region : ''
    this.serverData = null;
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/field/district/' + region)
      .subscribe({
        next: (res) => {
          this.serverData = res;
          this.district = res['Data']['district'];
        },
        error: (err) => {
          this.serverData = "Server call failed: " + err
          console.log(`Server call failed: ${this.serverData}`);
        }
      });
    this.onChangeSearch();
  }

  onChangeSearch() {
    console.log('onChangeSearch');
  }
}
