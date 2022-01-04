import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ordersumary',
  templateUrl: 'ordersumary.page.html',
  styleUrls: ['ordersumary.page.scss'],
})
export class OrderSumaryPage {
  Date: any;
  data= "";
  time = 0;

  myDate: String = new Date().toISOString();

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

      //this.myDate = new Date(this.time + (1000 * 60 * 60 * 24)).toISOString();
      this.Date = this.myDate.split('T')[0];
  }

  ngOnInit() { 
    this.getOrderSummary();
  }

  onChangeDate(date) {
    console.log('Sel Date >>>>>>>>>>>>>>', date)
    this.myDate= this.Date.split('T')[0];
  //  this.newDate = selDate.split('-')[2] + '.' + selDate.split('-')[1] + '.' + selDate.split('-')[0]
    this.getOrderSummary();
  }
  
  getOrderSummary() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getOrderSummary(this.myDate).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;

        if (res.code == 1) {
          console.log(' Response >>> ', res.details);
          this.data=res.details;
          console.log(' Response ::: ', this.data);
        }else{
          this.tools.openAlert(res.msg);
        }

      }, (error: Response) => {
        this.tools.closeLoader();
        console.log(error);

        let err: any = error;
        this.tools.openAlertToken(err.status, err.error.message);
      });

    } else {
      this.tools.closeLoader();
    }

  }
   
}
