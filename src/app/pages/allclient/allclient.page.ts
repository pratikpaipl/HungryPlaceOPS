import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AddPrefrencesComponent } from 'src/app/model/add-prefrences/add-prefrences.component';

@Component({
  selector: 'app-allclient',
  templateUrl: 'allclient.page.html',
  styleUrls: ['allclient.page.scss'],
})
export class AllClientPage {
  uid = '';

  //For  Order
  ClientList = [];
  ALLClientList = [];
  client = "";

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

  }
  
  
  ionViewWillEnter() {
    this.getClientList();
  }

  //Delete Pref.

  deleteprefrences(uid){
    this.uid = uid;
    this.deleteAlert(
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    );
  }
  async deleteAlert(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: btnNo ? btnNo : 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: btnYes ? btnYes : 'Yes',
          handler: () => {
            this.deletePrefrences();
          }
        }
      ], backdropDismiss: true
    });
    return await alert.present();
  }
  deletePrefrences() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('uid', this.uid);

      this.tools.openLoader();
      this.apiService.RemovePreferences(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        this.tools.openNotification(res.msg);
          this.getClientList();
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

  //Add Pref.
  addprefrences(uid){
    this.addPrefrences(uid);
  }
  async addPrefrences(uid) {
    const modal = await this.modalController.create({
      component: AddPrefrencesComponent,
      cssClass: 'change-preference-modal',
      componentProps: { uid: uid },
    
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
  //Get All Client
  getClientList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getAllClient().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('All Order Response >>> ', res);

        if (res.code == 1) {
          this.ClientList = res.details;
          this.ALLClientList = res.details;

        }else{
          this.tools.openAlert(res.msg);
        }
     
     
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

    // For User Filter
  async ionChange() {
    console.log("click >>", this.client)
    this.ClientList = await this.ALLClientList;
    const searchTerm = this.client;
    if (!searchTerm) {
      return;
    }

    this.ClientList = this.ClientList.filter(currentDraw => {
      if (currentDraw.client_name && searchTerm) {
        return ((currentDraw.client_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.email_address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.contact_phone.indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }


}
