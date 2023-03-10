import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  modalForm: FormGroup;
  http: HttpClient;
  iframeUrl: SafeResourceUrl;
  @Input() mainToModal: any;

  constructor(public sanitizer: DomSanitizer, fb: FormBuilder, http: HttpClient) {
    this.modalForm = fb.group({
      'modalMarketID': null,
      'modalName_e': null,
      'modalName_c': null,
      'modalRegion_e': null,
      'modalRegion_c': null,
      'modalDistrict_e': null,
      'modalDistrict_c': null,
      'modalAddress_e': null,
      'modalAddress_c': null,
      'modalBH_e': null,
      'modalBH_c': null,
      'modalContact1': null,
      'modalContact2': null,
      'modalCoordinate': null
    });
    this.http = http;
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=' + this.modalForm.value.modalCoordinate + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
  }

  ngOnInit() {
    this.mainToModal = ({
      action: '',
      mID: null
    });
    console.log('this.iframeUrl: ' + this.iframeUrl);
  }

  resetModalForm() {
    this.modalForm.reset();
  }

  setModalForm() {
    this.modalForm.controls['modalMarketID'].setValue(this.mainToModal.mID);
    console.log(this.modalForm.value);
  }
}
