import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  http: HttpClient;
  
  constructor(private sharedService: SharedService, http: HttpClient) {
    this.http = http;
  }

  importMarket(event: any){
    this.http.get<any>('http://localhost:8080/atwd/index.php/market/xml_import')
      .subscribe({
        next: (res) => {
          if(res['Code'] != 200){
            alert(res['Message']);
          } else {
            alert('Market import successfully');
            this.sharedService.updateMarketList.emit();
          }
        },
        error: (err) => {
          console.log(`Server call failed: ${err}`);
          alert(`Server call failed: ${err}`);
        }
      });
  }
}
