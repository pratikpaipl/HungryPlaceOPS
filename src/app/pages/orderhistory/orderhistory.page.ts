import { FilterModelComponent } from './../../model/filtermodel/filtermodel.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-orderhistory',
  templateUrl: 'orderhistory.page.html',
  styleUrls: ['orderhistory.page.scss'],
})
export class OrderHistoryPage {
  CustomerName = "";

  //For  Order
  OrderList = [];
  ALLOrderList = [];


  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) 
    {

  }

  ngOnInit() { 
    this.getOrderData('','','');
  }


  // Open Filter

  clickfilter(){
    this.filter();
  }

  async filter() {
    const modal = await this.modalController.create({
      component: FilterModelComponent,
      cssClass: 'change-filter-modal',
      componentProps: { value: 0 },
    
    });
    await modal.present();
    await modal.onDidDismiss()
      .then((data) => {
        console.log('Selected Cart Items from Dilogs ',data);
        console.log("aa >>",data[0].SelStatus)

        if (data) {
          console.log("aa >>",data[0].SelStatus)
         // this.getOrderData(data.SelStatus,'','');

        }
      });
  }

 
  gotoDetils(order_id) {
    this.router.navigateByUrl("orderdetail/"+order_id);
  }

  getOrderData(txt_status,txt_order_type,txt_search) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getAllOrder(txt_status,txt_order_type,txt_search).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log('All Order Response >>> ', res);

        if (res.code == 1) {
          this.OrderList = res.details;
          this.ALLOrderList = res.details;
          console.log('All Order Response >>> ', this.OrderList.length);

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


     // For User Filter
     async ionChange() {
      this.OrderList = await this.ALLOrderList;
      const searchTerm = this.CustomerName;
      if (!searchTerm) {
        return;
      }
  
      this.OrderList = this.OrderList.filter(currentDraw => {
        if (currentDraw.customer_name && searchTerm) {
          return ((currentDraw.customer_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
        }
      });
    }
  

}
