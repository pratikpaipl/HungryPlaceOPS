import { ApiService } from 'src/app/services/api.service-new';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: 'app-addprinter',
  templateUrl: './addprinter.component.html',
  styleUrls: ['./addprinter.component.scss'],
})
export class AddPrinterModelComponent implements OnInit {
  defValue: any;
  speinst= '';
  mId: any;
  Services=[];
  itemsCuisines=[];
  rat = 0;
  rate = 0;
  @ViewChild('rating') rating : any;

  constructor(public navParams: NavParams, public router: Router, private apiService: ApiService, public tools: Tools, public modalCtrl: ModalController) {
    this.mId = this.navParams.get('mId');
  }

  ngOnInit() {
    // this.cuisineList()
  }
  onModelChange(rating) {
    console.log("changed rating: ", rating);
     this.rat = rating;
  }
  addReview(){
    var msg ='';
    if(this.rat == 0 || this.speinst == ''){
      msg = msg + 'Rating & Review is required.'
    } 
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {    
      var selItem = { "rating":this.rat,  "review": this.speinst }    
       this.modalCtrl.dismiss(selItem);
    }

  }

 

  dismissModal() {
    this.modalCtrl.dismiss('');
  }

  cancel() {
    this.modalCtrl.dismiss('');
  }


}
