import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  dialogRef: MatDialogRef<CreateModalComponent>;
  http: HttpClient;
  tcList!: any | null;
  region!: any | null;
  district!: any | null;
  createMarketForm: FormGroup;
  fb: FormBuilder;

  constructor(dialogRef: MatDialogRef<CreateModalComponent>, fb: FormBuilder, http: HttpClient) {
    this.dialogRef = dialogRef;
    this.http = http;
    this.fb = fb;
    this.tcList = null;
    this.region = null;
    this.district = null;
    this.createMarketForm = fb.group({
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
      modalCoordinate: ['', Validators.required],
      modal_tc: fb.array([])
    });
  }

  ngOnInit() {
    this.loadFields();
    this.loadTCList();
  }

  closeModal() {
    console.log(this.createMarketForm.value);
    this.dialogRef.close();
  }

  onSubmit(formValue: any): void {
    // Submit form data to server
    const url = "http://localhost:8080/atwd/index.php/market";
    
    // Filter the Tenancy_Commodity array to only include objects with a nos_stall value > 0
    const filteredTenancyCommodity = formValue.modal_tc.filter((tc: any) => tc.nos_stall > 0);
    
    const marketData = {
      Market_Name_e: formValue.modalName_e,
      Market_Name_c: formValue.modalName_c,
      Region_e: formValue.modalRegion_e,
      Region_c: formValue.modalRegion_c,
      District_e: formValue.modalDistrict_e,
      District_c: formValue.modalDistrict_c,
      Address_e: formValue.modalAddress_e,
      Address_c: formValue.modalAddress_c,
      Bussiness_Hour_e: formValue.modalBH_e,
      Bussiness_Hour_c: formValue.modalBH_c,
      Coordinate: formValue.modalCoordinate,
      Contact_1: formValue.modalContact1,
      Contact_2: formValue.modalContact2,
      isActive: true,
      Tenancy_Commodity: filteredTenancyCommodity
    };
  
    console.log(marketData)

    this.http.post<any>(url, marketData).subscribe({
      next: (res) => {
        console.log(res);
        if(res['Code'] != 200){
          alert(res['Message']);
        } else {
          alert('Market added successfully');
        }
      },
      error: (err) => {
        console.log("Error submitting market data:");
        console.log(err);
        alert('Error submitting market data:' + err);
      }
    });
  }
  
  

  onChangeRegion() {
    const selectedRegion = this.createMarketForm.get('modalRegion_e')?.value;
    const regionObj = this.region.find((r: any) => r.region_e === selectedRegion);
    if (regionObj) {
      this.createMarketForm.get('modalRegion_c')?.setValue(regionObj?.region_c);
      this.http.get<any>('http://localhost:8080/atwd/index.php/market/field/district/' + selectedRegion)
        .subscribe({
          next: (res) => {
            if(res['Code'] != 200){
              alert(res['Message']);
            } 
            this.district = res['Data']['district'];
            console.log(this.district);
          },
          error: (err) => {
            console.log(`Server call failed: ${err}`);
          }
        });
    } else {
      this.createMarketForm.get('modalRegion_c')?.setValue('');
    }
    this.resetModalDistrict();
  }

  onChangeDistrict(){
    console.log(this.createMarketForm.value);
    const selectedDistrict = this.createMarketForm.get('modalDistrict_e')?.value;
    const districtObj = this.district.find((r: any) => r.District_e === selectedDistrict);
    if (districtObj) {
      this.createMarketForm.get('modalDistrict_c')?.setValue(districtObj?.District_c);
    } else {
      this.createMarketForm.get('modalDistrict_c')?.setValue('');
    }
  }

  resetModalDistrict(){
    this.createMarketForm.get('modalDistrict_e')?.setValue('');
    this.createMarketForm.get('modalDistrict_c')?.setValue('');
  }

  loadFields() {
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/field')
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } 
          this.region = res['Data']['region'];
          console.log(this.region);
          this.district = res['Data']['district'];
          console.log(this.district);
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }

  loadTCList() {
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/tenancy_commodity')
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } 
          this.tcList = res['Data'];
          // Create a FormGroup object for each item in tcList
          const modalTcArray = this.createMarketForm.get('modal_tc') as FormArray;
          res['Data'].forEach((tc: any) => {
            modalTcArray.push(this.fb.group({
              // Tenancy_Commodity_ID: [tc.Tenancy_Commodity_ID],
              Tenancy_Commodity_e: [tc.Tenancy_Commodity_e],
              Tenancy_Commodity_c: [tc.Tenancy_Commodity_c],
              nos_stall: [tc.nos_stall]
            }));
          });
          console.log(this.createMarketForm.value.modal_tc);
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
        }
      });
  }

}