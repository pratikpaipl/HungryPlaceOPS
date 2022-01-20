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

  passwordToggleicon="eye";
  cnfPasswordToggleicon="eye";
  showPassword = false;
  showCnfPassword = false;

  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService,
    private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.user = this.apiService.getUserData();
      console.log("user >>",this.user)
    this.loginForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      password: ['', Validators.required],
      cnfpassword: ['', Validators.required],

    });
  }


  login() {
    localStorage.setItem('isFirst', 'true');
    this.router.navigateByUrl('login');
  }
  Saveprofile() {

    console.log("calll >>>")
    let password = this.loginForm.get('password').value;
    let cnfpassword = this.loginForm.get('cnfpassword').value;
    var msg = ''
    if (password == "") {
      msg = msg + "Enter Password<br />";
    }
    if (cnfpassword == "") {
      msg = msg + "Enter Confirm Password<br />";
    }
    

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();

        postData.append('password', password);
        postData.append('cpassword', cnfpassword);
      
        this.tools.openLoader();
        this.apiService.SaveProfile(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }, (error: Response) => {
          this.tools.closeLoader();
          let err: any = error;

          console.log('Api Error ', err);

        });
      } else {
        this.tools.closeLoader();
      }
    }
  }
 
  isReadonly() {return true;}

  togglePassword():void {
    this.showPassword = !this.showPassword;
    if(this.passwordToggleicon =='eye'){
      this.passwordToggleicon='eye-off';
    }else{
      this.passwordToggleicon='eye';
    }
  }

  CNFtogglePassword():void {
    this.showCnfPassword = !this.showCnfPassword;
    if(this.cnfPasswordToggleicon =='eye'){
      this.cnfPasswordToggleicon='eye-off';
    }else{
      this.cnfPasswordToggleicon='eye';
    }
  }
}
