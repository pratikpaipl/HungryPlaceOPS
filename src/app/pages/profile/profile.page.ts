import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  loginForm: FormGroup;
  user: any;


  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService,
    private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.user = this.apiService.getUserData();

    //this.from = this.activatedRoute.snapshot.paramMap.get('from');
    this.loginForm = this.formBuilder.group({
      username: ['Ayaz', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      password: ['', Validators.required],
      cnfpassword: ['', Validators.required],

    });
  }
  ionViewDidEnter() {
   
  }

  login() {
    localStorage.setItem('isFirst', 'true');
    this.router.navigateByUrl('login');
  }
  // Saveprofile() {

  //   console.log("calll >>>")
  //   let fname = this.loginForm.get('fname').value;
  //   let lname = this.loginForm.get('lname').value;
  //   let mobile = this.loginForm.get('mobile').value;
  //   let email = this.loginForm.get('email').value;
  //   let compname = this.loginForm.get('compname').value;
  //   let agent = this.loginForm.get('agent').value;

  //   var msg = ''
  //   if (fname == "") {
  //     msg = msg + "Enter your first name<br />";
  //   }
  //   if (lname == "") {
  //     msg = msg + "Enter your last name<br />";
  //   }
  //   if(this.user.roleid == 2){
  //     if (compname == "") {
  //       msg = msg + "Enter your comapany name<br />";
  //     }
  //   }
  //   if (this.loginForm.get("email").invalid) {
  //     if (email == "") {
  //       msg = msg + "Please enter email address<br />";
  //     } else {
  //       msg = msg + "Please enter a valid email address<br />";
  //     }
  //   }
  //   if (mobile == "" || mobile.length != 10) {
  //     msg = msg + "Please enter a valid mobile number<br />";
  //   }
  //   if(this.user.roleid == 2){
  //     if (agent == undefined || agent == "") {
  //       msg = msg + "Select Agent<br />";
  //     }
  //   }

  //   if (msg != '') {
  //     this.tools.openAlert(msg);
  //   } else {
  //     if (this.tools.isNetwork()) {
  //       let postData = new FormData();

  //       postData.append('first_name', fname);
  //       postData.append('last_name', lname);
  //       postData.append('email', email);
  //       postData.append('phone', mobile);
  //       postData.append('roleid', this.user.roleid);
  //       if(this.user.roleid == 2){
  //         postData.append('company_name', compname);
  //         postData.append('agentid', agent);
  //       }
  //       this.tools.openLoader();
  //       this.apiService.SaveProfile(postData).subscribe(response => {
  //         this.tools.closeLoader();
  //         let res: any = response;
  //         this.apiService.setUserData(res.data.user, '');
  //         this.router.navigateByUrl('/home', { replaceUrl: true });
  //       }, (error: Response) => {
  //         this.tools.closeLoader();
  //         let err: any = error;

  //         console.log('Api Error ', err);

  //       });
  //     } else {
  //       this.tools.closeLoader();
  //     }
  //   }
  // }
 
  isReadonly() {return true;}

}
