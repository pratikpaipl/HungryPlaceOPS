import { ApiService } from 'src/app/services/api.service-new';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { Tools } from 'src/app/shared/tools';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  //For Status List
  statusList = [];
  //For Order-Type List
  orderTypeList = ["All Type","Delivery","Collection"];

  //For Today Order
  TodayOrderList = [];
  ALLTodayOrderList = [];
  machineName = "";

  DTQty = 0;
  CTQty = 0;

  
  constructor(private menu: MenuController, public tools: Tools,
    private router: Router, private apiService: ApiService) {
    this.user = this.apiService.getUserData();
    // events.subscribe('profileUpdate', (item) => {
    //   this.user = item;
    //   console.log('Event call')
    // });
  }
  // ionViewWillEnter() {
  //   this.user = this.apiService.getUserData();
  //    }

  //Api Calling
  ionViewDidEnter() {
    this.getTodayOrderData();
  }


  // Button Click Event

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
    this.router.navigateByUrl("home");
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

  }
  printer(){
    
  }

  onChangeOrderStatus(value){
    console.log("type value >>>",value);
  }
  onChangeOrderType(value){
    console.log("type value >>>",value);
  }

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
   
  // For User Filter
  // async ionChangeUser() {
  //   console.log("click >>", this.machineName)
  //   this.MachineList = await this.ALLMachineList;
  //   const searchTerm = this.machineName;
  //   if (!searchTerm) {
  //     return;
  //   }

  //   this.MachineList = this.MachineList.filter(currentDraw => {
  //     if (currentDraw.MachineName && searchTerm) {
  //       return ((currentDraw.MachineName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
  //     }
  //   });
  // }



}
