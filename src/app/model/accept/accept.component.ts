import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss'],
})
export class AcceptComponent  {
  comment='';

  constructor(public navParams: NavParams, public router: Router, 
    private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
  }

  
  submit(){
      this.modalCtrl.dismiss(this.comment);
  }
 

  dismissModal() {
    this.modalCtrl.dismiss('');
  }

  cancel() {
    this.modalCtrl.dismiss('');
  }


}
