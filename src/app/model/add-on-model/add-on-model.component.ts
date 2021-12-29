import * as lodash from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
@Component({
  selector: "app-add-on-model",
  templateUrl: "./add-on-model.component.html",
  styleUrls: ["./add-on-model.component.scss"],
})
export class AddOnModelComponent implements OnInit {
  defValue: any;
  signleSelect: any;
  speinst = "";
  total:any = 0;
  selItem: any;
  selExItem=[];
  catItem: any;
  isCheckboxDisabled:boolean=false;

  constructor(
    public navParams: NavParams,
    public router: Router,
    public tools: Tools,
    public modalCtrl: ModalController
  ) {
    this.catItem = this.navParams.get("value");
    this.selItem = this.catItem.prices[0];
    this.defValue = this.selItem.size+','+this.selItem.price;
    this.total =  this.catItem.qty * parseFloat(this.selItem.price);
    console.log(" ==>selItem.price  ",this.selItem.price);
    console.log(" ==>qty  ",this.catItem.qty );
    console.log(" ==>defValue  ",this.defValue);
    console.log(" ==>total  ",this.total);
  }

  ngOnInit() {
    // this.cuisineList()
  }
  qty(item, type) {
    this.total = 0;
    if (type == "min") {
      if (item.qty > 1) {
        this.catItem.qty = item.qty - 1;
      }
    } else {
      this.catItem.qty = item.qty + 1;
    }
    console.log('Cart Qty ',this.catItem.qty);

    var chkAmt = 0;
    for (let j = 0; j < this.catItem.addon_item.length; j++) {
      const element = this.catItem.addon_item[j];
      for (let k = 0; k < element.sub_item.length; k++) {
        const sub_item = element.sub_item[k];
                if(sub_item.isChecked){
          chkAmt = chkAmt +(this.catItem.qty*parseFloat(sub_item.price));
        }
      }
    }

    if(this.selExItem  != undefined && this.selExItem.length>0){
      this.total = chkAmt+ (this.catItem.qty * parseFloat(this.selItem.price));      
      for (let i = 0; i < this.selExItem.length; i++) {
        const element = this.selExItem[i];
        this.total = this.total + (this.catItem.qty * parseFloat(element.price));      
    }
    }else{
      this.total =  chkAmt + (this.catItem.qty * parseFloat(this.selItem.price));
    }
}

itemCheck(items,item){
  // if(item.multi_option == "custom"){
  //   if(items.filter(driver=> driver.isChecked).length == item.multi_option_val){
  //     this.isCheckboxDisabled=true;
  //    } else{
  //     this.isCheckboxDisabled=false;
  //    }
  //   }
  return items.filter(driver=> driver.isChecked).length == item.multi_option_val
}


  changeItem(items,$event,entry,item){
    //  console.log('Checkbox Item 0 ',$event.detail.checked )
    //  console.log('Checkbox Item 1 ',entry.price )
    console.log('items ',items)
      console.log('item.multi_option_val ',item.multi_option_val)
      console.log('isChecked ', items.filter(driver=> driver.isChecked).length)
      
      if(item.multi_option == "custom"){
      if(items.filter(driver=> driver.isChecked).length == item.multi_option_val){
        this.isCheckboxDisabled=true;
       } else{
        this.isCheckboxDisabled=false;
       }
      }

     this.total =0 ; 
     var chkAmt = 0;
     for (let j = 0; j < this.catItem.addon_item.length; j++) {
      const element = this.catItem.addon_item[j];
      for (let k = 0; k < element.sub_item.length; k++) {
        const subitem = element.sub_item[k];
        if (subitem.isChecked) {
          chkAmt = chkAmt + (this.catItem.qty * parseFloat(subitem.price));
        }       
      }
      // addon_ids = lodash.uniqWith(addon_ids , lodash.isEqual);
      // sub_item = lodash.uniqWith(sub_item , lodash.isEqual);
      // txtbk = lodash.uniqWith(txtbk , lodash.isEqual);
      // sub_item_with_addon_id.push(element.subcat_id + ":" + txtbk.join(', '));
    }
      if( this.selExItem  != undefined && this.selExItem.length>0){
        this.total =  ((this.catItem.qty * parseFloat(this.selItem.price))   +  chkAmt)
        for (let i = 0; i < this.selExItem.length; i++) {
          const element = this.selExItem[i];
          this.total = this.total + (this.catItem.qty *parseFloat(element.price))
        }
      }else{
        this.total =  (this.catItem.qty * parseFloat(this.selItem.price))  +  chkAmt
      }
     
  }
  changeItemCustom(items,$event,entry,item){
    //  console.log('Checkbox Item 0 ',$event.detail.checked )
    //  console.log('Checkbox Item 1 ',entry.price )

    

     this.total =0 ; 
     var chkAmt = 0;
     for (let j = 0; j < this.catItem.addon_item.length; j++) {
      const element = this.catItem.addon_item[j];
      for (let k = 0; k < element.sub_item.length; k++) {
        const subitem = element.sub_item[k];
        if (subitem.isChecked) {
          chkAmt = chkAmt + (this.catItem.qty * parseFloat(subitem.price));
        }       
      }
    }
      if( this.selExItem  != undefined && this.selExItem.length>0){
        this.total =  ((this.catItem.qty * parseFloat(this.selItem.price))   +  chkAmt)
        for (let i = 0; i < this.selExItem.length; i++) {
          const element = this.selExItem[i];
          this.total = this.total + (this.catItem.qty *parseFloat(element.price))
        }
      }else{
        this.total =  (this.catItem.qty * parseFloat(this.selItem.price))  +  chkAmt
      }
      //check for two selected.

      console.log('items ',items)
      console.log('item.multi_option_val ',item.multi_option_val)
      console.log('isChecked ', items.filter(driver=> driver.isChecked).length)
      
    if(items.filter(driver=> driver.isChecked).length === item.multi_option_val){
      this.isCheckboxDisabled=true;
     } 
  }

  itemSelProd(event) {
    this.total =0 ; 
    var chkAmt = 0;
    for (let j = 0; j < this.catItem.addon_item.length; j++) {
      const element = this.catItem.addon_item[j];
      for (let k = 0; k < element.sub_item.length; k++) {
        const subitem = element.sub_item[k];        
        if(subitem.isChecked){
          chkAmt = chkAmt + parseFloat(subitem.price);
        }
      }
    }

    // console.log("Check Box 0 ", event);
    for (let k = 0; k < this.catItem.prices.length; k++) {
      const element = this.catItem.prices[k];
      if((element.size+','+element.price) == event.detail.value){
          this.selItem = element;
      }
    }
    // console.log("selItem ", this.selItem);
    if( this.selExItem  != undefined && this.selExItem.length>0){
        for (let i = 0; i < this.selExItem.length; i++) {
          const element = this.selExItem[i];
          this.total =  (this.catItem.qty * parseFloat(this.selItem.price))+parseFloat(element.price) + chkAmt;
        }
    }else{
      this.total =  (this.catItem.qty * parseFloat(this.selItem.price)) + chkAmt;
    }
  }
  // itemAdd(event,subItem,subcatID) {

  //   console.log("event :: ", event);  
  //   console.log("subItem :: ", subItem);  

  //   this.total =0 ; 
  //   var chkAmt = 0;
  //   var cntMn = 0
  //   console.log("addon_item :: ", this.catItem.addon_item.length);  

  //   for (let j = 0; j < this.catItem.addon_item.length; j++) {
  //     const element = this.catItem.addon_item[j];
  //     console.log("element.multi_option :: ", element.multi_option);  

  //     if(element.multi_option == 'one'){
  //       cntMn = cntMn + 1;
  //       console.log("element.multi_option == 'one' :: ", "true");  

  //     }
  //     for (let k = 0; k < element.sub_item.length; k++) {
  //       const subitem = element.sub_item[k];      
  //       //console.log("element.sub_item 0 ", subitem);  
  //       console.log("subitem.isChecked :: ", "true");  

  //       if(subitem.isChecked){
  //         chkAmt = chkAmt + (this.catItem.qty *parseFloat(subitem.price));
  //       }
  //     //  console.log("chkAmt ", chkAmt);  

  //     }
  //   }

  //   console.log('One Xnt ',cntMn)
  //   if(cntMn < 2){      
  //     this.selExItem=[];
  //   }
  //   console.log("selExItem >>> ", this.selExItem.length);  

  //   // this.total = 0;
  //   if(subItem.length>0){
  //     for (let index = 0; index < subItem.length; index++) {
  //       const element = subItem[index];
  //       if(element.sub_item_id ==  event.detail.value){
  //         this.selExItem.push(element);
  //       }
  //     }
  //   }

  //   if (this.selExItem != undefined && this.selExItem.length > 0) {
  //     this.total = (this.catItem.qty * parseFloat(this.selItem.price)) + chkAmt;
  //     for (let i = 0; i < this.selExItem.length; i++) {
  //       const element = this.selExItem[i];
  //       this.total =this.total + parseFloat(element.price) ;
  //     }
  //   } else {
  //     this.total = (this.catItem.qty * parseFloat(this.selItem.price)) + chkAmt;
  //   }

    
  // }

itemAdd(event,subItem,subcatID) {

    console.log("event :: ", event);  
    console.log("subItem :: ", subItem);  
    console.log("subcatID :: ", subcatID);  

    this.total =0 ; 
    var chkAmt = 0;
    var clear = false;
    console.log("addon_item :: ", this.catItem.addon_item.length);  

    for (let j = 0; j < this.catItem.addon_item.length; j++) {
      const element = this.catItem.addon_item[j];
      console.log("element.subcat_id :: ", element.subcat_id);  
      console.log("element.multi_option :: ", element.multi_option);  

      if( subcatID == element.subcat_id ){
        console.log("element.multi_option == 'one' :: ", "true");  
         for (let k = 0; k < element.sub_item.length; k++) {
           subItem[k].subcat_id=  element.subcat_id;
         }
      }

      for (let k = 0; k < element.sub_item.length; k++) {
        const sub = element.sub_item[k];      
        console.log("subitem.isChecked :: ", "true");  
        if(sub.isChecked){
          chkAmt = chkAmt + (this.catItem.qty *parseFloat(sub.price));
        }
      }
    }
    //if(subcatID){      
    //  this.selExItem=[];
    //}
    console.log("selExItem >>> ", this.selExItem.length);  

    // this.total = 0;
    if(subItem.length>0){

          for (let i = 0; i < this.selExItem.length; i++) {
            const element = this.selExItem[i];
            if(element.subcat_id == subcatID){
              this.selExItem.splice(i,1);
            }
          }
            for (let index = 0; index < subItem.length; index++) {
              const element = subItem[index];
              if(element.sub_item_id ==  event.detail.value){
                this.selExItem.push(element);
               }
            }
        }
      console.log(" this.selExItem >", this.selExItem);

    if (this.selExItem != undefined && this.selExItem.length > 0) {
      this.total = (this.catItem.qty * parseFloat(this.selItem.price)) + chkAmt;
      for (let i = 0; i < this.selExItem.length; i++) {
        const element = this.selExItem[i];
        this.total =this.total + parseFloat(element.price) ;
      }
    } else {
      this.total = (this.catItem.qty * parseFloat(this.selItem.price)) + chkAmt;
    }


  }
  
  addToCart() {
    var isNext = true;
    var sub_item =[]
    var sub_item_with_addon_id ={}
    var addon_ids =[]
    var require_addon_lists =[];
    var subcat_require_msg =[];
    for (let j = 0; j < this.catItem.addon_item.length; j++) {
      const element = this.catItem.addon_item[j];
      require_addon_lists.push('require_addon_'+element.subcat_id+'|'+element.require_addons) 
      subcat_require_msg.push('You must select at least one addon - '+element.subcat_name) 
     // console.log(element.require_addons)
      var txtbk =[]
      for (let k = 0; k < element.sub_item.length; k++) {
        const subitem = element.sub_item[k];
        console.log("element.sub_item 0 ", subitem); 
        if (subitem.isChecked) {
          var txt =
            subitem.sub_item_id +
            "|" +
            subitem.price +
            "|" +
            subitem.sub_item_name;
          addon_ids.push(subitem.sub_item_id);
          sub_item.push(txt);
          txtbk.push(txt);
        }
        if ( this.selExItem  != undefined && this.selExItem.length>0){
          for (let i = 0; i < this.selExItem.length; i++) {   
            if (this.selExItem[i].sub_item_id == subitem.sub_item_id) {
              var txt =
                subitem.sub_item_id +
                "|" +
                subitem.price +
                "|" +
                subitem.sub_item_name;
              addon_ids.push(subitem.sub_item_id);
              sub_item.push(txt);
              txtbk.push(txt);
            }
          }
        }
      }

      addon_ids = lodash.uniqWith(addon_ids , lodash.isEqual);
      sub_item = lodash.uniqWith(sub_item , lodash.isEqual);
      txtbk = lodash.uniqWith(txtbk , lodash.isEqual);
      console.log('txtbk ',txtbk);
      if(sub_item_with_addon_id[element.subcat_id]!=''&& sub_item_with_addon_id[element.subcat_id]!=undefined) 
      {
        sub_item_with_addon_id[element.subcat_id] = sub_item_with_addon_id[element.subcat_id]+", "+txtbk.join(',');                                 
      }
      else 
      {                   
        sub_item_with_addon_id[element.subcat_id] = txtbk.join(',');
      }
    }
    var showError=false;
    var showMsg='';
     console.log('sub_item_with_addon_id ',sub_item_with_addon_id);
    for (let h = 0; h < require_addon_lists.length; h++) {
      const element = require_addon_lists[h].split("|");
      var catID = element[0].replace('require_addon_','');
      var require= element[1]

      console.log('require ',require);
      console.log('catID ',catID);
      console.log('catID ',sub_item_with_addon_id[catID]);
      if(require == '2' && sub_item_with_addon_id[catID] == ''){
        console.log('require_addon_lists ',catID)
        console.log('require_addon_lists ',require)
        console.log('require_addon_lists ',subcat_require_msg[h])
        showMsg = subcat_require_msg[h];
        showError=true;
        break;
      }
    }

    if(require_addon_lists.length == 0){
      isNext= false;    
    }else{
      isNext= true
    }
    var selItem = {
      item_id: this.catItem.item_id,
      qty: this.catItem.qty,
      price: this.selItem.price + "|" + this.selItem.size,
      sub_item: sub_item,
      sub_item_with_addon_id:sub_item_with_addon_id,
      cooking_ref: [],//cooking_ref,
      ingredients: [],//ingredients,
      order_notes: this.speinst,
      discount:  this.catItem.discount,
      addon_ids:addon_ids,
      require_addon_lists:require_addon_lists.join(','),                   
      has_sub_item: 'yes' ,
      is_addon_item:'yes'
  };

  console.log(' Sample Data ',require_addon_lists)

    // var selItem = {
    //   item_id: this.catItem.item_id,
    //   qty: this.catItem.qty,
    //   price: item[0].price + "|" + item[0].size,
    //   sub_item: [],
    //   cooking_ref: [],
    //   ingredients: [],
    //   order_notes: this.speinst,
    //   discount: this.catItem.discount,
    // };
   
     if(showError){
      this.tools.presentAlert('',showMsg);
     }else{
       this.modalCtrl.dismiss(selItem);
     }
  }

  dismissModal() {
    this.modalCtrl.dismiss("");
  }

  cancel() {
    this.modalCtrl.dismiss("");
  }
}
