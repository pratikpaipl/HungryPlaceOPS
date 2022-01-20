import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-changestatus',
  templateUrl: './changestatus.component.html',
  styleUrls: ['./changestatus.component.scss'],
})
export class ChangeStatusModelComponent  {
 
  StatusList=[];
  selStatus='';
  comment='';

  order_id='';

  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
    this.order_id = this.navParams.get('order_id');
    console.log("UID >",this.order_id)
  }
  ionViewWillEnter() {
    this.getStatus();
  }

  itemAdd(event) {
    this.selStatus=event.detail.value;
    console.log("event :: ", event.detail.value);
  }
  submit(){
    console.log("submit > :: ", this.selStatus);
    console.log("submit > :: ", this.comment);
    if(this.selStatus != ''){
      this.modalCtrl.dismiss(this.selStatus,this.comment);
    }else{
      this.tools.openAlert("Please Select Status")
    }
  }
 

  getStatus() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      let postData = new FormData();
      postData.append("order_id",  this.order_id );

      this.apiService.getStatus(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        this.StatusList=res.details.status_list;
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
