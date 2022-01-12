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
  // Date: any;
  // time = 0;
  // newDate: string;
  // myDate: String = new Date().toISOString();
  
  defValue: any;

  //refundAmount='0';
  refundAmount:any = 0;

  APICALLING:any = "";

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

      // this.myDate = new Date(this.time + (1000 * 60 * 60 * 24)).toISOString();
      this.defValue = "fullrefund";

      this.route.params
      .subscribe((params) => {
        console.log('params =>', params.order_id);
        this.order_id = params.order_id;
      });
  }
  ionViewWillEnter() { 
    this.getOrderDetails();
  }

  itemSelProd(event) {
      console.log("Check Box >> ", this.defValue);
  }

  changeItem(item){
    console.log('items ',item)     
     console.log('isChecked ', this.ItemList.filter(item=> item.isChecked).length)

    var chkAmt = 0;
      for (let k = 0; k < this.ItemList.length; k++) {
        const element = this.ItemList[k];
        if (element.isChecked) {
          chkAmt =chkAmt + parseFloat(element.normal_price);
          console.log('chkAmt ',chkAmt)     
          this.refundAmount=chkAmt;
        } else{
           this.refundAmount=chkAmt;
        }      
      }
  }

  // onChangeDate(date) {
  //   console.log('Sel Date', date)
  //   let selDate = this.Date.split('T')[0];
  //   console.log('Selected Date split ', selDate.split('-'));
  //   this.newDate = selDate.split('-')[2] + '.' + selDate.split('-')[1] + '.' + selDate.split('-')[0]
  // }

  refund(type){
    console.log("Check Box >> ", this.defValue);
    console.log("type >> ", type);
    if(this.refundAmount != "0"){
    this.refundAmountApi(type);
    }else{
      this.tools.openAlert("Please Enter Refund Amount");
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

          for (let index = 0; index < this.ItemList.length; index++) {
            const element = this.ItemList[index];
            this.ItemList[index].isChecked=false
          }

          console.log('ItemList Response >>> ', this.ItemList.length);

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

  refundAmountApi(Type) {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("user_type","admin");
      postData.append("total_amount",  this.refundAmount);
      postData.append("refund_type",  this.defValue);
      postData.append("order_id",  this.order_id );

      if(Type == 'CITYPAY'){
        postData.append("citypay_refunding_amount",  this.refundAmount);
        this.APICALLING= this.apiService.cityPayRefund(postData);
      }
      if(Type == 'PYP' ||Type =='PAYPAL'){
        postData.append("paypal_refunding_amount",  this.refundAmount);
        this.APICALLING= this.apiService.paypalRefund(postData);
      }

      
      this.APICALLING.subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.tools.backPage()
        

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
