import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
   loginForm: FormGroup;
   showPassword = false;
   passwordToggleicon="eye";

   terms=false;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder,  private eventService:EventService,
    private apiService: ApiService, private router: Router) {

   // this.from = this.activatedRoute.snapshot.paramMap.get('from');
 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }

  register() {
    this.router.navigateByUrl('register');
  }

  login() {
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    var msg = ''

    if (this.loginForm.get('email').invalid) {
      if (email == '') {
        msg = msg + 'Enter your email address<br />'
      } else {
        msg = msg + 'Please enter a valid email address<br />'
      }
    }
    if (password == '') {
      msg = msg + 'Please enter Password<br />'
    }
   
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.login(email,password).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
        this.router.navigateByUrl('otpverification/' + res.data.DefaultOTP + '/' + res.data.phone);
        }, (error: Response) => {
          let err: any = error;        
          console.log('Api Error ', err);

          this.tools.closeLoader();
          this.tools.openAlertToken(err.status, err.error.message);
          console.log('Api Error >>>> ', err.error.message);

        });
      } else {
        this.tools.closeLoader();
      }
    }
  }

  forgotPassword(){
    this.router.navigateByUrl('forgotpassword');

  }

  togglePassword():void {
    this.showPassword = !this.showPassword;
    if(this.passwordToggleicon =='eye'){
      this.passwordToggleicon='eye-off';
    }else{
      this.passwordToggleicon='eye';
    }
  }
}
