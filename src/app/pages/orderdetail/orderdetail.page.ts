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

  order_id='';
  DetailData= "";
  ClientInfo= "";
  totalCount= "";

  ItemList =[];

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

      this.route.params
      .subscribe((params) => {
        console.log('params =>', params.order_id);
        this.order_id = params.order_id;
      });

  }
  ngOnInit() { 
    this.getOrderDetails();
  }


  //Button click
 
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





  getOrderDetails() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getOrderDetails(this.order_id).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('details >>> ', res);

        if (res.code == 1) {
          this.totalCount=res.details.total;
          this.DetailData=res.details;
          this.ClientInfo=res.details.client_info;
          this.ItemList=res.details.item;

          console.log('All Order Response >>> ', res);

        }else{
          this.tools.openAlert(res.msg);
        }
     
     
      }, (error: Response) => {
        this.tools.closeLoader();
        console.log(error);

        let err: any = error;
        this.tools.openAlertToken(err.status, err.error.message);
      });

    } else {
      this.tools.closeLoader();
    }

  }
}
