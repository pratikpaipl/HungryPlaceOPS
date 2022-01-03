import { AssignDriverModelComponent } from './../../model/assigndriver/assigndriver.component';
import { DeclineComponent } from './../../model/decline/decline.component';
import { AcceptComponent } from './../../model/accept/accept.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { ChangeStatusModelComponent } from 'src/app/model/changestatus/changestatus.component';

@Component({
  selector: 'app-orderdetail',
  templateUrl: 'orderdetail.page.html',
  styleUrls: ['orderdetail.page.scss'],
})
export class OrderDetailPage {
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
  refund(){
    this.router.navigateByUrl("orderrefund");

  }


  accept(){
    this.Accept();
  }

  decline(){
    this.Decline();
  }
  assignDriver(){
    this.AssignDriver();
  }
  chngstatus(){
    this.ChangeStatus();
  }


  async Accept() {
    const modal = await this.modalController.create({
      component: AcceptComponent,
      cssClass: 'change-accept-modal',
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

  async Decline() {
    const modal = await this.modalController.create({
      component: DeclineComponent,
      cssClass: 'change-accept-modal',
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

  async AssignDriver() {
    const modal = await this.modalController.create({
      component: AssignDriverModelComponent,
      cssClass: 'change-assign-modal',
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
  async ChangeStatus() {
    const modal = await this.modalController.create({
      component: ChangeStatusModelComponent,
      cssClass: 'change-assign-modal',
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
