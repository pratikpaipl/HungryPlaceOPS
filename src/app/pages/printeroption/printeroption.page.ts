import { AddPrinterModelComponent } from '../../model/addprinter/addprinter.component';
import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-printeroption',
  templateUrl: 'printeroption.page.html',
  styleUrls: ['printeroption.page.scss'],
})
export class PrinterOptionPage {
  ResCopy=false;
  CusCopy=false;
  KitCopy=false;

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

  }

 ionViewWillEnter() {
    this.getPrinterOption();
  }

  UpdatePrinter(data,from) {
    console.log("data >>",data)
    console.log("from >>",from)
    if(data==true){
      this.getUpdatePrinterOption(false,from);
    }else{
      this.getUpdatePrinterOption(true,from);
    }
  }
 
  getPrinterOption() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getPrinterOption().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log("Response >>",res)
         for (let index = 0; index < res.length; index++) {
           const element = res[index];
           if(element=="restaurant_copy"){
            this.ResCopy=true;
           }
           if(element=="customer_copy"){
            this.CusCopy=true;
           }
           if(element=="kitchen_copy"){
            this.KitCopy=true;
           } 
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
  
  getUpdatePrinterOption(Status,From) {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append("isChecked",Status)
      postData.append("printer_type",From)

      this.tools.openLoader();
      this.apiService.updatePrinterOption(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log("Response >>",res)
        this.getPrinterOption();
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
