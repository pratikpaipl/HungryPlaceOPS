import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-driversumary',
  templateUrl: 'driversumary.page.html',
  styleUrls: ['driversumary.page.scss'],
})
export class DriverSumaryPage {
  Date: any;
  time = 0;
  myDate: String = new Date().toISOString();
  data= "";
  driverSummary = [];
  sumA :any= 0;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

     // this.myDate = new Date(this.time + (1000 * 60 * 60 * 24)).toISOString();
     console.log('myDate >> ',this.myDate.split('T')[0]);

     this.Date = this.myDate.split('T')[0];

  }
   ngOnInit() { 
    this.getDriverSummary();
  }

  onChangeDate(date) {
    console.log('Sel Date >>>>>>>>>>>>>>', date)
    this.myDate= this.Date.split('T')[0];
  //  this.newDate = selDate.split('-')[2] + '.' + selDate.split('-')[1] + '.' + selDate.split('-')[0]
    this.getDriverSummary();
  }
  
  getDriverSummary() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getDriverSummary(this.myDate).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response >>> ', res.details);

        if (res.code == 1) {
              this.driverSummary=res.details;
              console.log(' Response ::: ', this.data);
              for (const q of this.driverSummary) {
                  this.sumA += Number(q.total_w_tax || 0);
              }
        }else{
          this.tools.openAlert(res.msg);
        }

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
