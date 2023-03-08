import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  serverData: Object | null = null;
  sideBarForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.sideBarForm = fb.group({
      'search_name': ['']
    });
  }

  ngOnInit() {
    console.log(this.sideBarForm.value['search_name']);
  }

  // loadSearchFields() {
  //   this.serverData = null;
  //   this.http.get<any>('http://localhost:8080/atwd/index.php/market/field')
  //     .subscribe({
  //       next: (res) => {
  //         console.log("Server returns: " + res);
  //         this.serverData = res;
  //       },
  //       error: (err) => {
  //         this.serverData = "Server call failed: " + err
  //       }
  //     });
  // }

}
