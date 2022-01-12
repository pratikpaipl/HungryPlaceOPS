import { ApiService } from 'src/app/services/api.service-new';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuController, ToastController } from "@ionic/angular";
import { Tools } from 'src/app/shared/tools';
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser/ngx";
import EscPosEncoder from 'esc-pos-encoder-ionic';

declare const callSound: any;
declare var Socket: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  options: InAppBrowserOptions = {
    location : 'no',//Or 'no'
     hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
     zoom : 'no',//Android only ,shows browser zoom controls
    hardwareback : 'no',
     mediaPlaybackRequiresUserAction : 'no',
     shouldPauseOnSuspend : 'no', //Android only
     closebuttoncaption : 'Close', //iOS only
     disallowoverscroll : 'no', //iOS only
     toolbar : 'no', //iOS only
     enableViewportScale : 'no', //iOS only
     allowInlineMediaPlayback : 'no',//iOS only
     presentationstyle : 'pagesheet',//iOS only
     fullscreen : 'yes',//Windows only
     footer:'no',
  };
  ipaddress= '192.168.1.100';
  // * Set your variable here
  //IP = '192.168.1.123';
  PORT = '9100';
  // * End

  user: any;

  //For Status List
  statusList = [];
  //For Order-Type List
  orderTypeList = ["All Type","Delivery","Collection"];

  //For Today Order
  TodayOrderList = [];
  ALLTodayOrderList = [];
  CustomerName = "";

  DTQty = 0;
  CTQty = 0;

  SelStatus = "";
  SelType = "";

  constructor(private menu: MenuController, public tools: Tools,private iab: InAppBrowser,
    private toast: ToastController,
    private router: Router, private apiService: ApiService) {
    this.user = this.apiService.getUserData();
    // events.subscribe('profileUpdate', (item) => {
    //   this.user = item;
    //   console.log('Event call')
    // });
  }

  //Api Calling
  ionViewWillEnter() {
    this.getTodayOrderData();
  }
  // ngOnInit() { 
  //   this.getTodayOrderData();
  // }

  // Button Click Event

  goDetail(order_id) {
    this.router.navigateByUrl("orderdetail/"+order_id);
  }
 
  HomeTableBooking(){
    console.log("Open Browser");
    let target = "_blank";
    const browser = this.iab.create("https://hungrydev.cuisine.je/ops/index.html",target,this.options);
    browser.on("loadstop").subscribe((event) => {
      console.log("orderData.url_details ", event.url);
      console.log("loadstop ==> ", event.url);
    });

    browser.on("exit").subscribe(
      (event) => {
        console.log("Log ", event);
      }
      // ,
      // (err) => {
      //     console.log("InAppBrowser Loadstop Event Error: " + err);
      // }
    );
  }
  
  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }
  ordrerSummary(){
    this.router.navigateByUrl("ordersumary");

  }
  driverSummary(){
    this.router.navigateByUrl("driversumary");

  }
  Dashboard() {
    this.menu.close();
    this.router.navigateByUrl("home");
  }
  tableBooking() {
    this.menu.close();
    console.log("Open Browser");
    let target = "_blank";
    const browser = this.iab.create("https://hungrydev.cuisine.je/ops/index.html",target,this.options);
    browser.on("loadstop").subscribe((event) => {
      console.log("orderData.url_details ", event.url);
      console.log("loadstop ==> ", event.url);
    });

    browser.on("exit").subscribe(
      (event) => {
        console.log("Log ", event);
      }
      // ,
      // (err) => {
      //     console.log("InAppBrowser Loadstop Event Error: " + err);
      // }
    );
  }
  allClientList() {
    this.menu.close();
    this.router.navigateByUrl("allclient");
  }
  allOrderList() {
    this.menu.close();
    this.router.navigateByUrl("orderhistory");
  }
  Profile() {
    this.menu.close();
    this.router.navigateByUrl("profile");
  }
  printSetup() {
    this.menu.close();
    this.router.navigateByUrl("printersetup");
  }
  printOptions() {
    this.menu.close();
    this.router.navigateByUrl("printeroption");
  }
  logout(isLogin) {
    this.menu.close();
    if (isLogin)
      this.tools.presentLogout(
        "Are you sure you want to logout?",
        "Logout",
        "Cancel"
      );
    else {
      this.menu.close();
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }
  gotoMerchant(){
    callSound();
  }
  printer(){
    const socket = new Socket();

    // socket receive bytecode, therefore we need to create a byte stream by using esc-pos-encoder-ionic
    const encoder = new EscPosEncoder();



    const result = encoder.initialize();

    result
      .align('center')
      .newline()
      .line('Congratulation, print success')
      .line('IP : ' + this.ipaddress)
      .line('Port : ' + this.PORT)
      .line('From ionic app by Addit InfoTech')
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .cut();

    const resultByte = result.encode();

    // send byte code into the printer
    socket.open(
      this.ipaddress,
      this.PORT,
      () => {
        socket.write(resultByte, () => {
          socket.shutdownWrite();
        });
      },
      (err) => {
        console.error(err);
        this.presentToast(err);

      }
    );
  }
  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  // onChangeOrderStatus(value){
  //   this.SelStatus=value;
  //   console.log("status value >>>",value);
  // }
  // onChangeOrderType(value){
  //   this.SelType=value;
  //   console.log("type value >>>",value);
  // }

  DTqty(item,type) {
  console.log("item DTqty >>>",typeof item);
   console.log("type DTqty >>>",type);
    if (type == 'min') {
      if (this.DTQty > 0) {
        this.DTQty = (parseInt(item) - 10)
      }
    } else {
      this.DTQty = (parseInt(item) + 10)
    }
    this.plusMinusDT();

  }

  CTqty(item,type) {
   console.log("item CTqty >>>",item);
   console.log("type CTqty >>>",type);
   
    if (type == 'min') {
      if (this.CTQty > 0) {
        this.CTQty= (parseInt(item) - 10)
      }
    } else {
      this.CTQty= (parseInt(item) + 10)
    }
    this.plusMinusCT();
  }



  getTodayOrderData() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.GetIpaddressDefaulttime().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);

        if(res.details.BellRang !=0){
          console.log(' callSound >>> ', "Ringing");
          callSound();

        }

        this.DTQty=res.details.merchantEstimationdetails.merchant_delivery_estimation
        this.CTQty=res.details.merchantEstimationdetails.merchant_pickup_estimation

        for(let i=0;i<res.details.status_list.length;i++){
          if(i==0){
            this.statusList.push("All Status");
          }else{
           this.statusList.push(res.details.status_list[i].description);
          }
        }
        this.TodayOrderList = res.details.todaysOrderdetails;
        this.ALLTodayOrderList = res.details.todaysOrderdetails;
     
       // this.statusList = res.details.status_list;
     

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
   
  plusMinusDT() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.UpdateMerchantTimings(this.DTQty).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
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
   
  plusMinusCT() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.UpdatePickupTimings(this.CTQty).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);

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
   
// For Search Filter
async ionChange() {
  this.TodayOrderList = await this.ALLTodayOrderList;
  const searchTerm = this.CustomerName;
  if (!searchTerm) {
    return;
  }

  this.TodayOrderList = this.TodayOrderList.filter(currentDraw => {
    if (currentDraw.customer_name && searchTerm) {
      return ((currentDraw.customer_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.bill_total.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.order_id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)|| (currentDraw.payment_type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
    }
  });
}

// For Status Filter
async onChangeOrderStatus() {
  this.TodayOrderList = await this.ALLTodayOrderList;
  const searchTerm = this.SelStatus;
  if (!searchTerm) {
    return;
  }

  if(searchTerm == 'All Status'){
    this.TodayOrderList = this.ALLTodayOrderList;

  }else{
    this.TodayOrderList = this.TodayOrderList.filter(currentDraw => {
      if (currentDraw.status && searchTerm) {
        return ((currentDraw.status.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }

  }


  // For Type Filter
async onChangeOrderType() {
  this.TodayOrderList = await this.ALLTodayOrderList;
  const searchTerm = this.SelType;
  if (!searchTerm) {
    return;
  }

  if(searchTerm == 'All Type'){
    this.TodayOrderList = this.ALLTodayOrderList;

  }else{
    this.TodayOrderList = this.TodayOrderList.filter(currentDraw => {
      if (currentDraw.trans_type && searchTerm) {
        return ((currentDraw.trans_type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }

  }
}
