import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, Form, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  dialogRef: MatDialogRef<DeleteModalComponent>;
  http: HttpClient;
  updateMarketForm: FormGroup;
  fb: FormBuilder;
  data: any;
  iframeUrl: SafeResourceUrl;

  constructor(dialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) data: any, fb: FormBuilder, http: HttpClient, public sanitizer: DomSanitizer) {
    this.http = http;
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.updateMarketForm = fb.group({
      modalMarketID: ['', Validators.required],
      modalName_e: ['', Validators.required],
      modalName_c: ['', Validators.required],
      modalRegion_e: ['', Validators.required],
      modalRegion_c: ['', Validators.required],
      modalDistrict_e: ['', Validators.required],
      modalDistrict_c: ['', Validators.required],
      modalAddress_e: ['', Validators.required],
      modalAddress_c: ['', Validators.required],
      modalBH_e: ['', Validators.required],
      modalBH_c: ['', Validators.required],
      modalContact1: ['', Validators.required],
      modalContact2: ['', Validators.required],
      modalCoordinate: ['22.29123,114.20548', Validators.required],
      modal_tc: fb.array([])
    });
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q='+this.updateMarketForm.value.modalCoordinate+'&t=&z=13&ie=UTF8&iwloc=&output=embed');
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.loadMarketDetail();
  }

  loadMarketDetail() {
    this.http.delete<any>('http://localhost:8080/atwd/index.php/market/mID/' + this.data['mID'])
      .subscribe({
        next: (res) => {
          if (res['Code'] != 200) {
            alert(res['Message']);
          }
          else {
            this.setFormValues(res['Data']);
          }
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }

  setFormValues(response: any) {
    this.updateMarketForm.patchValue({
      modalMarketID: response.Market_ID,
      modalName_e: response.Market_Name_e,
      modalName_c: response.Market_Name_c,
      modalRegion_e: response.Region_e,
      modalRegion_c: response.Region_c,
      modalDistrict_e: response.District_e,
      modalDistrict_c: response.District_c,
      modalAddress_e: response.Address_e,
      modalAddress_c: response.Address_c,
      modalBH_e: response.Bussiness_Hour_e,
      modalBH_c: response.Bussiness_Hour_c,
      modalContact1: response.Contact_1,
      modalContact2: response.Contact_2,
      modalCoordinate: response.Coordinate
    });
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q='+this.updateMarketForm.value.modalCoordinate+'&t=&z=13&ie=UTF8&iwloc=&output=embed');
    // Set Tenancy_Commodity values using FormArray
    const tcArray = this.updateMarketForm.get('modal_tc') as FormArray;
    tcArray.clear();

    response.Tenancy_Commodity.forEach((tc: any) => {
      tcArray.push(this.fb.group({
        Tenancy_Commodity_ID: tc.Tenancy_Commodity_ID,
        Tenancy_Commodity_e: tc.Tenancy_Commodity_e,
        Tenancy_Commodity_c: tc.Tenancy_Commodity_c,
        nos_stall: tc.nos_stall
      }));
    });
    console.log(this.updateMarketForm.value);
  }


  onSubmit(formValue: any): void {

  }
}
