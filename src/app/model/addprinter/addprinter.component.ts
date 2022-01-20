import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-addprinter',
  templateUrl: './addprinter.component.html',
  styleUrls: ['./addprinter.component.scss'],
})
export class AddPrinterModelComponent implements OnInit {
  mId: any;
 
  PName= '';
  PId= '';

  @ViewChild('rating') rating : any;

  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
  //  this.mId = this.navParams.get('mId');
  }

  ngOnInit() {
    // this.cuisineList()
  }
 

  dismissModal() {
    this.modalCtrl.dismiss('');
  }
  cancel() {
    this.modalCtrl.dismiss('');
  }
  save(){
      this.AddPrinter();
  }

  AddPrinter() {
    var msg = ''
    if (this.PName == '') {
      msg = msg + 'Please enter Printer Name<br />'
    }
    if (this.PId == '') {
      msg = msg + 'Please enter Printer IP<br />'
    }
   
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();
  
        postData.append('printer_name', this.PName);
        postData.append('printer_ip', this.PId);
  
        this.tools.openLoader();
        this.apiService.addPrinter(postData).subscribe(data => {
          this.tools.closeLoader();
          let res: any = data;
          this.dismissModal()
        }, (error: Response) => {
          this.tools.closeLoader();
          console.log(error);
  
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.msg);
        });
  
      } else {
        this.tools.closeLoader();
      }
    }
  
  }


}
