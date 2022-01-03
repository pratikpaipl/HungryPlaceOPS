import { AddPrinterModelComponent } from './../../model/addprinter/addprinter.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-printersetup',
  templateUrl: 'printersetup.page.html',
  styleUrls: ['printersetup.page.scss'],
})
export class PrinterSetupPage {
  Date: any;
  time = 0;
  newDate: string;
  myDate: String = new Date().toISOString();

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

      this.myDate = new Date(this.time + (1000 * 60 * 60 * 24)).toISOString();


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
  
  clickaddprinter(){
    this.addprinter();
  }
  async addprinter() {
    const modal = await this.modalController.create({
      component: AddPrinterModelComponent,
      cssClass: 'change-addprinter-modal',
      componentProps: { value: 0 },
    
    });
    await modal.present();
    await modal.onDidDismiss()
      .then((data) => {
        console.log('Selected Cart Items from Dilogs ',data.data);
        if (data.data) {
         // this.callApi(data.data) 
        }
      });
  }
}
