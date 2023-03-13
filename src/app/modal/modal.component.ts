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
  http: HttpClient;
  iframeUrl: SafeResourceUrl;
  @Input() mainToModal: any;
  modalCoordinate = '22.286083,114.191790';

  constructor(public sanitizer: DomSanitizer, http: HttpClient) {
    this.http = http;
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=' + this.modalCoordinate + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
  }

  ngOnInit() {
    this.mainToModal = ({
      action: '',
      mID: null
    });
    console.log('this.iframeUrl: ' + this.iframeUrl);
  }

  resetModalForm(modalRegion_e: HTMLSelectElement, modalCoordinate: HTMLInputElement) {
    this.isModalEditable(this.mainToModal.action, modalRegion_e, modalCoordinate);
    modalCoordinate.value = '';
  }

  setModalForm(modalRegion_e: HTMLSelectElement, modalCoordinate: HTMLInputElement) {
    this.isModalEditable(this.mainToModal.action, modalRegion_e, modalCoordinate);
    modalCoordinate.value = this.mainToModal.mID;
    modalRegion_e.options.remove(0);
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    opt1.value = 'KLN';
    opt1.text = 'Kowloon';
    opt2.value = 'HK';
    opt2.text = 'Hong Kong';
    opt2.selected = true;
    modalRegion_e.add(opt1, null);
    modalRegion_e.add(opt2, null);
    console.log('setModalForm');
  }

  isModalEditable(action: string, modalRegion_e: HTMLSelectElement, modalCoordinate: HTMLInputElement) {
    modalCoordinate.readOnly = action == 'detail' ? true : false;
    modalRegion_e.disabled = action == 'detail' ? true : false;
  }
}
