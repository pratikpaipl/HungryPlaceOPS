import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-changedriver',
  templateUrl: './changedriver.component.html',
  styleUrls: ['./changedriver.component.scss'],
})
export class ChangeDriverModelComponent  {

  DriverList=[];
  selDriver='';
  //driverID='';
  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService,
     public tools: Tools, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.getDriver();
  }

  itemAdd(event) {
    this.selDriver=event.detail.value;
    console.log("event :: ", event.detail.value);
  }
  submit(){
    console.log("submit > :: ", this.selDriver);
    if(this.selDriver != ''){
      this.modalCtrl.dismiss(this.selDriver);
    }else{
      this.tools.openAlert("Please Select Driver")
    }

  }
 

  getDriver() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      
      this.apiService.getDriver(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.DriverList=res.details;
        // for (let index = 0; index < this.DriverList.length; index++) {
        //   const element = this.DriverList[index];
        //   if(element.id ==)
        // }
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
