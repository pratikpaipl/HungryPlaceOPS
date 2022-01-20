import { AssignDriverModelComponent } from './../../model/assigndriver/assigndriver.component';
import { DeclineComponent } from './../../model/decline/decline.component';
import { AcceptComponent } from './../../model/accept/accept.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { ChangeStatusModelComponent } from 'src/app/model/changestatus/changestatus.component';
import { ChangeDriverModelComponent } from 'src/app/model/changedriver/changedriver.component';

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
    private platform: Platform,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

      this.route.params
      .subscribe((params) => {
        console.log('params =>', params.order_id);
        this.order_id = params.order_id;
      });

  }
  ionViewWillEnter() { 
    this.getOrderDetails();
  }


  //Button click
 
  refund(){
    this.router.navigateByUrl("orderrefund/"+this.order_id);
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
  changeDriver(){
    this.ChangeDriver();
  }
  chngstatus(){
    this.ChangeStatus();
  }

//   showMap(lat,lng){
//     if (this.platform.is('ios')) {
//       //try google maps first
//       this.lunchnevi.isAppAvailable(this.lunchnevi.APP.GOOGLE_MAPS).then(
//         response => {
//           if(response) {
//               window.open('comgooglemaps://?q=' + lat + ',' + lng + '(' + marker_name + ')', '_system');
//           }
//           else {
//               window.open('maps://?q=' + lat + ',' + lng, '_system');
//           }
//         },
//         failure => {
//           //check failed;
//         }
//       );
// }
// else if (this.platform.is('android')) {
//       window.open('geo://' + lat + ',' + lng + '?q=' + lat + ',' + lng + '(' + marker_name + ')', '_system');
// }
//   }


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
          this.acceptOrder(data.data)
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
          this.declineOrder(data.data) 
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
          this.assignDriverSubmit(data.data)
        }
      });
  }
  async ChangeDriver() {
    const modal = await this.modalController.create({
      component: ChangeDriverModelComponent,
      cssClass: 'change-assign-modal',
      componentProps: { value: 0 },
    
    });
    await modal.present();
    await modal.onDidDismiss()
      .then((data) => {
        console.log('Selected Cart Items from Dilogs ',data.data);
        if (data.data) {
          this.changeDriverSubmit(data.data)
        }
      });
  }
  async ChangeStatus() {
    const modal = await this.modalController.create({
      component: ChangeStatusModelComponent,
      cssClass: 'change-assign-modal',
      componentProps: { order_id:this.order_id },
    
    });
    await modal.present();
    await modal.onDidDismiss()
      .then((data) => {
        console.log('Selected Cart Items from Dilogs ',data);
        if (data.data) {
         this.statusSubmit(data.data,data.role) 
        }
      });
  }

  assignDriverSubmit(data) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("driver_id", data);
      postData.append("order_id",  this.order_id );

      
      this.apiService.assignDriver(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.tools.openNotification(res.msg)
        this.getOrderDetails();

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

  changeDriverSubmit(data) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("driver_id", data);
      postData.append("order_id",  this.order_id );
      postData.append("reassigned",'true');

      
      this.apiService.assignDriver(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.tools.openNotification(res.msg)
        this.getOrderDetails();

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


  statusSubmit(status,comment) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("status", status);
      postData.append("order_id",  this.order_id );
      postData.append("remarks",  comment);

      
      this.apiService.changeStatus(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.tools.openNotification(res.msg)
        this.getOrderDetails();

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

  acceptOrder(comment) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("order_id",  this.order_id );
      postData.append("remarks",  comment);

      
      this.apiService.acceptOrder(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.tools.backPage()
        

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
  declineOrder(comment) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("order_id",  this.order_id );
      postData.append("remarks",  comment);

      
      this.apiService.declineOrder(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.tools.backPage()
        

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
        this.tools.openAlertToken(err.status, err.error.msg);
      });

    } else {
      this.tools.closeLoader();
    }

  }
}
