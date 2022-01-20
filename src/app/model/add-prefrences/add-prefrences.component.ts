import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-add-prefrences',
  templateUrl: './add-prefrences.component.html',
  styleUrls: ['./add-prefrences.component.scss'],
})
export class AddPrefrencesComponent implements OnInit {
  
  uid:any;
  pName='';
  @ViewChild('rating') rating : any;

  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService,
     public tools: Tools, public modalCtrl: ModalController) {
 
    this.uid = this.navParams.get('uid');
    console.log("UID >",this.uid)
  }

  ngOnInit() {
    this.getPrefrences()
  }
  submit(){
    this.AddPrefrences();
  }

  dismissModal() {
    this.modalCtrl.dismiss('');
  }
  cancel() {
    this.modalCtrl.dismiss('');
  }

  getPrefrences() {
      if (this.tools.isNetwork()) {
        let postData = new FormData();
  
        postData.append('uid', this.uid);
  
        this.tools.openLoader();
        this.apiService.getPreferences(postData).subscribe(data => {
          this.tools.closeLoader();
          let res: any = data;
          this.pName=res.details.preferences
        }, (error: Response) => {
          this.tools.closeLoader();
          console.log(error);
  
          let err: any = error;
          this.tools.openAlertToken(err.status, err.error.msg);
        });
    }
  
  }

  AddPrefrences() {
      var msg = ''
      if (this.pName == '') {
        msg = msg + 'Please enter Preference<br />'
      }
     
      if (msg != '') {
        this.tools.openAlert(msg);
      } else {
        if (this.tools.isNetwork()) {
          let postData = new FormData();
    
          postData.append('ClientID', this.uid);
          postData.append('Preferences', this.pName);
    
          this.tools.openLoader();
          this.apiService.AddPreferences(postData).subscribe(data => {
            this.tools.closeLoader();
            let res: any = data;
            this.dismissModal()
            this.tools.openNotification(res.details)
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


}
