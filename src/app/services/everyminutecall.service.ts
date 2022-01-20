import { Tools } from 'src/app/shared/tools';
import { ApiService } from './api.service-new';
import { Injectable } from '@angular/core';

declare const callSound: any;

@Injectable({
  providedIn: 'root'
})
export class EveryMinuteCallService {

  constructor(private apiService: ApiService,private tools:Tools) { 

  }

 callApi(){
 
  // interval(10000)
  // .subscribe(() => {
  //   // do something.
  //   // or callSomeMethod();
  // });

  setInterval(data => {
   // if (this.tools.isNetwork()) {
      //this.tools.openLoader();
      this.apiService.GetIpaddressDefaulttime().subscribe(data => {
       // this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res);
        if(res.details.BellRang !=0){
          console.log(' callSound >>> ', "Ringing");
          callSound();

        }

      }, (error: Response) => {
        //this.tools.closeLoader();
        console.log(error);

        let err: any = error;
        this.tools.openAlertToken(err.status, err.error.msg);
      });

    // } else {
    //   his.tools.closeLoader();
    // }
    }, 1*60*1000);
 }
}
