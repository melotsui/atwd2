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
  modalTitle: String;
  iframeUrl: SafeResourceUrl;
  @Input() mainToModal: any | null = [];

  constructor(public sanitizer: DomSanitizer, fb: FormBuilder, http: HttpClient) {
    this.modalForm = fb.group({
      'modalMarketID': '',
      'modalName_e': '',
      'modalName_c': '',
      'modalRegion_e': '',
      'modalRegion_c': '',
      'modalDistrict_e': '',
      'modalDistrict_c': '',
      'modalAddress_e': '',
      'modalAddress_c': '',
      'modalBH_e': '',
      'modalBH_c': '',
      'modalContact1': '',
      'modalContact2': '',
      'modalCoordinate': '22.29123,114.20548'
    });
    this.http = http;
    this.modalTitle = 'Please confirm your';
    this.iframeUrl = this.modalForm.value.modalCoordinate == '' ? 
        this.sanitizer.bypassSecurityTrustResourceUrl('') : 
        this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q='+this.modalForm.value.modalCoordinate+'&t=&z=13&ie=UTF8&iwloc=&output=embed');
  }

  ngOnInit() {
    console.log('this.iframeUrl: '+this.iframeUrl);
  }

}
