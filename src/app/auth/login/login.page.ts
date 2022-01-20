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
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    this.router.navigateByUrl('register');
  }

  login() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    var msg = ''

    
    if (username == '') {
      msg = msg + 'Please enter Username<br />'
    }
    if (password == '') {
      msg = msg + 'Please enter Password<br />'
    }
   
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.login(username,password).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          console.log("res >>",res);

          if (res.code == 1) {
            this.loginForm.reset();
            localStorage.setItem('login_token', res.details.login_token);
            console.log("login_token >>>",res.details.login_token);
            this.apiService.setUserData(res.details.info, res.details.login_token);
            this.router.navigateByUrl('/home', { replaceUrl: true }); 
          }else{
            this.tools.openAlert(res.msg);
          }

          
        }, (error: Response) => {
          let err: any = error;        
          console.log('Api Error ', err);

          this.tools.closeLoader();
          this.tools.openAlertToken(err.status, err.error.msg);
          console.log('Api Error >>>> ', err.error.msg);

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
