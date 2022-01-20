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
  PrinterId='';
  
  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

  }
  
  ionViewWillEnter() {
    this.getPrinter();
  }

  // ngOnInit() { 
  //   this.getPrinter();
  // }

  
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
        console.log('Selected Cart Items from Dilogs ',data);
         this.getPrinter();
      });
  }

  savechanges(){
    console.log('data >> ',JSON.stringify(this.PrinterList))
    this.SaveChanges();
  }

  getPrinter() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getPrinter().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;

        if (res.code == 1) {
          this.PrinterList = res.details;

          
          for (let index = 0; index < this.PrinterList.length; index++) {
            const element = this.PrinterList[index];
            this.PrinterList[index].Connected=false
            this.PrinterList[index].ConnectValue ="Not Connected"
            console.log("IP >>",element.printer_ip)
            this.checkPrinter(element.printer_ip,index); 
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

  deletePrinter(PrinterId){
    this.PrinterId=PrinterId;
    this.deleteAlert(
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    );
  }

  async deleteAlert(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: btnNo ? btnNo : 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: btnYes ? btnYes : 'Yes',
          handler: () => {
            this.deletePart();
          }
        }
      ], backdropDismiss: true
    });
    return await alert.present();
  }

  deletePart() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('id', this.PrinterId);

      this.tools.openLoader();
      this.apiService.deletePrinter(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        this.getPrinter();

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

  SaveChanges() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('printer_data', JSON.stringify(this.PrinterList));

      this.tools.openLoader();
      this.apiService.PrinterChangesSave(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        this.getPrinter();

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

  checkPrinter(IP,index) {
    if (this.tools.isNetwork()) {
     // this.tools.openLoader();
      this.apiService.CheckPrinterIsConnected(IP).subscribe(data => {
        //this.tools.closeLoader();

        let res: any = data;
        this.PrinterList[index].Connected=true
        this.PrinterList[index].ConnectValue ="Connected"
        console.log("response >>",res)
        
      }, (error: Response) => {
       // this.tools.closeLoader();
        console.log(error);
        let err: any = error;
        console.log("error >> ",err.status);
        if(err.status==200){
          this.PrinterList[index].Connected=true
          this.PrinterList[index].ConnectValue ="Connected"
        }else{
          this.PrinterList[index].Connected=false
          this.PrinterList[index].ConnectValue ="Not Connected"
        }
       
       // this.tools.openAlertToken(err.status, err.error.message);
      });

    } else {
      this.tools.closeLoader();
    }

  }
}
