import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  http: HttpClient;
  sideBarForm: FormGroup;
  region: Region[];
  bussiness_hour: Bussiness_Hour[];
  district: District[];
  tc: TC[];
  @Output() callParent = new EventEmitter();
  marketListToParent: any[];

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
    this.marketListToParent = [];
  }

  ngOnInit() {
    this.loadSearchFields();
    this.loadMarketList();
  }

  loadSearchFields() {
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/field')
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } 
          this.region = res['Data']['region'];
          this.bussiness_hour = res['Data']['bussinessHour'];
          this.district = res['Data']['district'];
          this.tc = res['Data']['tc'];
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }

  loadMarketList() {
    this.http.get<any>('http://localhost:8080/atwd/index.php/market')
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } 
          console.log(res);
          this.marketListToParent = res['Data'];
          this.msgToParent();
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }

  btnClear() {
    this.sideBarForm.reset();
    this.onChangeSearch();
  }

  msgToParent() {
    this.callParent.emit(this.marketListToParent);
  }

  onChangeRegion() {
    this.sideBarForm.controls['search_district'].setValue('-');
    let region = this.sideBarForm.value.search_region != '-' ? this.sideBarForm.value.search_region : ''
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/field/district/' + region)
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } 
          this.district = res['Data']['district'];
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
    this.onChangeSearch();
  }

  onChangeSearch() {
    let lang = 'e';
    let search_name = this.sideBarForm.value.search_name == '' || this.sideBarForm.value.search_name == null ? '-' : this.sideBarForm.value.search_name;
    let search_region = this.sideBarForm.value.search_region == '' || this.sideBarForm.value.search_region == null ? '-' : this.sideBarForm.value.search_region;
    let search_district = this.sideBarForm.value.search_district == '' || this.sideBarForm.value.search_district == null ? '-' : this.sideBarForm.value.search_district;
    let tcStr = this.sideBarForm.value.search_tc == '' || this.sideBarForm.value.search_tc == null ? '-' : this.sideBarForm.value.search_tc;
    // console.log(`http://localhost:8080/atwd/index.php/market/search/${lang}/${search_name}/${search_region}/${search_district}/${tcStr}`);
    this.http.get<any>(`http://localhost:8080/atwd/index.php/market/search/${lang}/${search_name}/${search_region}/${search_district}/${tcStr}`)
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } 
          this.marketListToParent = res['Data'];
          console.log(res);
          this.msgToParent();
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }
}
