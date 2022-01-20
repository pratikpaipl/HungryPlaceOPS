import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: 'forgotpassword.page.html',
  styleUrls: ['forgotpassword.page.scss'],
})
export class ForgotPasswordPage {
  
  loginForm: FormGroup;
  constructor(public tools: Tools,private route: ActivatedRoute, 
     public formBuilder: FormBuilder,
       private eventService:EventService,private apiService: ApiService, private router: Router) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],    
    });
  }

 

  forgotPwd() {
    let email = this.loginForm.get('email').value;

    var msg = ''

    if (this.loginForm.get('email').invalid) {
      if (email == '') {
        msg = msg + 'Enter your email address<br />'
      } else {
        msg = msg + 'Please enter a valid email address<br />'
      }
    }
 
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.forgotPassword(email).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
          this.tools.backPage();
        
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
  

}
