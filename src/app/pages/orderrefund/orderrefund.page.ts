import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-orderrefund',
  templateUrl: 'orderrefund.page.html',
  styleUrls: ['orderrefund.page.scss'],
})
export class OrderRefundPage {
  Date: any;
  time = 0;
  newDate: string;
  myDate: String = new Date().toISOString();
  defValue: any;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

      this.myDate = new Date(this.time + (1000 * 60 * 60 * 24)).toISOString();
      this.defValue = "fullrefund";


  }
  itemSelProd(event) {
      console.log("Check Box >> ", this.defValue);
  }

  ionViewDidEnter() {
    //this.getAgentList();
  }

  onChangeDate(date) {
    console.log('Sel Date', date)
    let selDate = this.Date.split('T')[0];
    console.log('Selected Date split ', selDate.split('-'));
    this.newDate = selDate.split('-')[2] + '.' + selDate.split('-')[1] + '.' + selDate.split('-')[0]
  }

  refund(){
    console.log("Check Box >> ", this.defValue);
  }
  
}
