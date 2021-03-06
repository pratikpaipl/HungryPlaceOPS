import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-filtermodel',
  templateUrl: './filtermodel.component.html',
  styleUrls: ['./filtermodel.component.scss'],
})
export class FilterModelComponent  {
  //For Status List
  statusList = [];
  //For Order-Type List
  orderTypeList = ["All Type","Delivery","Collection"];
  //For Order-sort
  orderSortList = ["Sort by","Customer Name","Date","Price"];

  FromDate: any;
  ToDate: any;

  // Selected Value
  SelFromDate='';
  SelToDate='';

  // SelFromDate: String = new Date().toISOString();
  // SelToDate: String = new Date().toISOString();

  //For take Filter Data
  SubmitData = [];

  //for reset value
  Status: string;
  OrderType: string;
  SortBY: string;

  @ViewChild('rating') rating : any;

  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
    //this.mId = this.navParams.get('mId');
    //this.FromDate = this.SelFromDate.split('T')[0];
   // this.ToDate = this.SelToDate.split('T')[0];
  }

  ionViewWillEnter() {
    this.getTodayOrderData();
  }

  // onChangeStatus(value){
  //   this.SelStatus=value;
  //   console.log("status value >>>",value);
  // }
  // onChangeOrderType(value){
  //   this.SelOrderType=value;

  //   console.log("type value >>>",value);
  // }
  // onChangeSortby(value){
  //   this.SelSortBy=value;
  //   console.log("type value >>>",value);
  // }


  onChangeFromDate(date) {
  //  console.log('Sel Date >>>>>>>>>>>>>>', date)
     this.SelFromDate= this.FromDate.split('T')[0];
     console.log('Sel Date >>>>>>>>>>>>>>', this.SelFromDate)

  // //  this.newDate = selDate.split('-')[2] + '.' + selDate.split('-')[1] + '.' + selDate.split('-')[0]
  //   this.getOrderSummary();
  }
  onChangeToDate(date) {
   // console.log('Sel Date >>>>>>>>>>>>>>', date)
     this.SelToDate= this.ToDate.split('T')[0];
     console.log('Sel Date >>>>>>>>>>>>>>', this.SelToDate)

  // //  this.newDate = selDate.split('-')[2] + '.' + selDate.split('-')[1] + '.' + selDate.split('-')[0]
  //   this.getOrderSummary();
  }
  
  resetData(){
   
    this.SelFromDate=''
    this.SelToDate=''

    this.SubmitData=null;

    this.Status = null;
    this.OrderType = null;
    this.SortBY = null;
    this.FromDate = null;
    this.ToDate = null;
    
  }


  submit(){
    this.SubmitData = [{ SelStatus: this.Status==null?'':this.Status},{ SelOrderType: this.OrderType==null?'':this.OrderType},{ SelFromDate: this.SelFromDate},{ SelToDate: this.SelToDate},{ SelSortBy: this.SortBY==null?'':this.SortBY}]
    this.modalCtrl.dismiss((this.SubmitData));
    console.log("data >>",this.Status+" >>> "+ this.OrderType +" >>> "+this.SelFromDate+" >> "+ this.SelToDate+" >> "+this.SortBY)
  }


  getTodayOrderData() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetIpaddressDefaulttime().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        for(let i=0;i<res.details.status_list.length;i++){
          if(i==0){
            this.statusList.push("All Status");
          }else{
           this.statusList.push(res.details.status_list[i].description);
          }
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

  dismissModal() {
    this.modalCtrl.dismiss('');
  }

  cancel() {
    this.modalCtrl.dismiss('');
  }


}
