import { Component, OnInit, Input, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, Form, FormArray, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  @ViewChild('scrollMe') private scrollContainer!: any;
  dialogRef: MatDialogRef<UpdateModalComponent>;
  http: HttpClient;
  tcList!: any | null;
  region!: any | null;
  district!: any | null;
  updateMarketForm: FormGroup;
  fb: FormBuilder;
  data: any;

  constructor(private sharedService: SharedService, dialogRef: MatDialogRef<UpdateModalComponent>, @Inject(MAT_DIALOG_DATA) data: any, fb: FormBuilder, http: HttpClient) {
    this.dialogRef = dialogRef;
    this.http = http;
    this.fb = fb;
    this.tcList = null;
    this.region = null;
    this.district = null;
    this.data = data;
    this.updateMarketForm = fb.group({
      modalMarketID: ['', [Validators.required]],
      modalName_e: ['', [Validators.required, this.customValidator]],
      modalName_c: ['', [Validators.required, this.customValidator]],
      modalRegion_e: ['', [Validators.required, this.customValidator]],
      modalRegion_c: ['', [Validators.required, this.customValidator]],
      modalDistrict_e: ['', [Validators.required, this.customValidator]],
      modalDistrict_c: ['', [Validators.required, this.customValidator]],
      modalAddress_e: ['', [Validators.required, this.customValidator]],
      modalAddress_c: ['', [Validators.required, this.customValidator]],
      modalBH_e: ['', [Validators.required, this.customValidator]],
      modalBH_c: ['', [Validators.required, this.customValidator]],
      modalContact1: ['', [Validators.required, this.customValidator]],
      modalContact2: ['', [Validators.required, this.customValidator]],
      modalCoordinate: ['', [Validators.required, this.customValidator]],
      modal_tc: fb.array([])
    });
  }

  customValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value == null || control.value.trim() === '') {
      return { 'required': true };
    }
    return null;
  }

  closeModal() {
    this.dialogRef.close();
  }

  async ngOnInit() {
    const fieldData = await this.loadFields();
    console.log(fieldData);
    if(fieldData){
      this.region = fieldData['region'];
      this.district = fieldData['district'];
    }
    this.loadMarketDetail();
  }

  async loadFields(): Promise<any> {
    try {
      const res = await this.http.get<any>('http://localhost:8080/atwd/index.php/market/field').toPromise();
      if (res['Code'] !== 200) {
        alert(res['Message']);
        return null;
      }
      return res['Data'];
    } catch (err) {
      console.log(`Server call failed: ${err}`);
      alert(`Server call failed: ${err}`);
      return null;
    }
  }

  onChangeRegion() {
    const selectedRegion = this.updateMarketForm.get('modalRegion_e')?.value;
    console.log(this.region);
    const regionObj = this.region.find((r: any) => r.region_e === selectedRegion);
    if (regionObj) {
      this.updateMarketForm.get('modalRegion_c')?.setValue(regionObj?.region_c);
      this.http.get<any>('http://localhost:8080/atwd/index.php/market/field/district/' + selectedRegion)
        .subscribe({
          next: (res) => {
            if (res['Code'] != 200) {
              alert(res['Message']);
            }
            this.district = res['Data']['district'];
          },
          error: (err) => {
            console.log(`Server call failed: ${err}`);
            alert(`Server call failed: ${err}`);
          }
        });
    } else {
      this.updateMarketForm.get('modalRegion_c')?.setValue('');
    }
    this.resetModalDistrict();
  }

  getDistrictByRegion(){
    
  }

  onChangeDistrict() {
    const selectedDistrict = this.updateMarketForm.get('modalDistrict_e')?.value;
    const districtObj = this.district.find((r: any) => r.District_e === selectedDistrict);
    if (districtObj) {
      this.updateMarketForm.get('modalDistrict_c')?.setValue(districtObj?.District_c);
    } else {
      this.updateMarketForm.get('modalDistrict_c')?.setValue('');
    }
  }

  resetModalDistrict() {
    this.updateMarketForm.get('modalDistrict_e')?.setValue('');
    this.updateMarketForm.get('modalDistrict_c')?.setValue('');
  }

  loadMarketDetail() {
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/mID/' + this.data['mID'])
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
          alert(`Server call failed: ${err}`);
        }
      });
  }

  setFormValues(response: any) {
    this.updateMarketForm.controls['modalRegion_e'].setValue(response.Region_e);
    this.onChangeRegion();
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

    // Set Tenancy_Commodity values using FormArray
    const tcArray = this.updateMarketForm.get('modal_tc') as FormArray;
    tcArray.clear();

    response.Tenancy_Commodity.forEach((tc: any) => {
      tcArray.push(this.fb.group({
        Tenancy_Commodity_ID: tc.Tenancy_Commodity_ID,
        Tenancy_Commodity_e: tc.Tenancy_Commodity_e,
        Tenancy_Commodity_c: tc.Tenancy_Commodity_c,
        nos_stall: tc.nos_stall,
        isActive: true
      }));
    });
    this.getOtherTC(tcArray);
  }

  getOtherTC(tcArray: FormArray) {
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/tenancy_commodity/mID/' + this.data['mID'])
      .subscribe({
        next: (res) => {
          if (res['Code'] != 200) {
            alert(res['Message']);
          }
          else {
            res['Data']['tc'].forEach((tc: any) => {
              tcArray.push(this.fb.group({
                Tenancy_Commodity_ID: tc.Tenancy_Commodity_ID,
                Tenancy_Commodity_e: tc.Tenancy_Commodity_e,
                Tenancy_Commodity_c: tc.Tenancy_Commodity_c,
                nos_stall: tc.nos_stall,
                isActive: true
              }));
            });
            const tcArrayValues = tcArray.value;
            this.tcList = [...tcArrayValues];
          }
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
          alert(`Server call failed: ${err}`);
        }
      });
  }

  scrollToTop(): void {
    this.scrollContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  onSubmit(formValue: any): void {
    // Submit form data to server
    if (this.updateMarketForm.invalid) {
      this.scrollToTop();
      return;
    }
    const url = "http://localhost:8080/atwd/index.php/market";

    // Filter the Tenancy_Commodity array to only include objects with a nos_stall value > 0
    const filteredTenancyCommodity = formValue.modal_tc.filter((tc: any) => tc.nos_stall > 0);

    const marketData = {
      Market_ID: formValue.modalMarketID,
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

    console.log(marketData);
    this.http.put<any>(url, marketData).subscribe({
      next: (res) => {
        console.log(res);
        if (res['Code'] != 200) {
          alert(res['Message']);
        } else {
          alert('Market updated successfully');
          this.closeModal();
          this.sharedService.updateMarketList.emit();
        }
      },
      error: (err) => {
        console.log("Error submitting market data:");
        console.log(err);
        alert('Error submitting market data:' + err);
      }
    });
  }
}
