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


  //For User
  MachineList = [];
  ALLMachineList = [];
  machineName = "";



  sumCart = 0;
  class_add = 'img carticon animate'
  cs_count = 'notification'
  DTQty = 0;

  
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

  ionViewDidEnter() {
 
      //this.getMachineList();
  
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
    this.router.navigateByUrl("profile");
  }
  printOptions() {
    this.menu.close();
    this.router.navigateByUrl("profile");
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
  getMachineList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MachineList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.MachineList = res.data.Machine;
        this.ALLMachineList = res.data.Machine;

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
  async ionChangeUser() {
    console.log("click >>", this.machineName)
    this.MachineList = await this.ALLMachineList;
    const searchTerm = this.machineName;
    if (!searchTerm) {
      return;
    }

    this.MachineList = this.MachineList.filter(currentDraw => {
      if (currentDraw.MachineName && searchTerm) {
        return ((currentDraw.MachineName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }


  DTqty(item,type) {
   
    if (type == 'min') {
      if (this.DTQty > 0) {
        this.DTQty = (item - 10)
      }
    } else {
      this.DTQty = (item + 10)
    }

  }

  // CTqty(item, i, type) {
   
  //   if (type == 'min') {
  //     if (item.qty > 0) {
  //       this.PartsList[i].qty = (item.qty - 1)
  //     }
  //   } else {
  //     this.PartsList[i].qty = (item.qty + 1)
  //   }

  // }


}
