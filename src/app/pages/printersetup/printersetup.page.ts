import { AddPrinterModelComponent } from './../../model/addprinter/addprinter.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-printersetup',
  templateUrl: 'printersetup.page.html',
  styleUrls: ['printersetup.page.scss'],
})
export class PrinterSetupPage {
  PrinterList = [];

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {



  }
  ngOnInit() { 
    this.getPrinter();
  }
  
  clickaddprinter(){
    this.addprinter();
  }
  async addprinter() {
    const modal = await this.modalController.create({
      component: AddPrinterModelComponent,
      cssClass: 'change-addprinter-modal',
      componentProps: { value: 0 },
    
    });
    await modal.present();
    await modal.onDidDismiss()
      .then((data) => {
        console.log('Selected Cart Items from Dilogs ',data.data);
        if (data.data) {
         // this.callApi(data.data) 
        }
      });
  }



  getPrinter() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getPrinter().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;

        if (res.code == 1) {
          this.PrinterList = res.details;

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
