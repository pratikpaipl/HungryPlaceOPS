import { AuthGuard } from './../shared/authguard.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: "root",
})

export class ApiService {
  deviceInfo;
  options;
  httpOptions: any;
  device_id = "";
  device_details = null;

  constructor(public auth: AuthGuard, private http: HttpClient, private device: Device) {
    console.log('Device UUID is: ', this.device);
    this.deviceInfo = this.getDeviceInfo();
    this.device_id = this.device.uuid != null ? this.device.uuid : "1595831596879";
    console.log('device_id ', this.device_id);
    this.device_details = this.device.platform;

    this.setHeaderData();

  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  setHeaderData() {
    //console.log('Basic auth ' + this.bacisAuth)

    console.log('getLoginToken ', this.getLoginToken());
    console.log('getUserId ', this.getUserId());

    if (this.getLoginToken() == undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
         // 'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        //  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

          'Access-Control-Allow-Origin': '*',
        //  'Authorization': this.bacisAuth,
          'api-key': environment.apikey,
        })
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        //  'Accept': 'application/json',  For Raw data
        //  'Content-Type': 'application/json', For Raw data
          'Access-Control-Allow-Origin': '*',
          // 'Authorization': this.bacisAuth,
          'api-key': environment.apikey,
          // 'User-Id': this.getUserId(),
          'login_token': this.getLoginToken(),

        })
      };

    }
  }

  setHeaderDataNative() {
    if (this.auth.canActivate && this.getLoginToken() && this.getUserId()) {
      console.log('User Info ', this.getLoginToken());
      console.log('User Info ', this.getUserId());
      this.httpOptions = {
        'api-key': environment.apikey,
        // 'Authorization': this.bacisAuth,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, Origin'
      }
    }
  }

  login(username, password) {
    let postData = new FormData();
    postData.append("username", username);
    postData.append("password", btoa(password));

    postData.append("device_id", this.device_id);
    // postData.append("version_id", this.app_version);
    // postData.append("lang_id", this.langId);
    postData.append("device_details", this.device_details);
    postData.append("OSPlayerID", localStorage.getItem('OSPlayerID'));

   // postData.append("json", "true");

    return this.http.post(environment.BaseUrl + "login", postData, this.httpOptions);
  }
    
  forgotPassword(email): any {
   
    let postData = new FormData();
    postData.append("email_address", email);
    return this.http.post(environment.BaseUrl + 'ForgotPassword', postData, this.httpOptions);
  }

  GetIpaddressDefaulttime(): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'api-key': environment.apikey,
        'login_token': this.getLoginToken(),

      })
    }
    let postData = new FormData();
    return this.http.post(environment.BaseUrl + 'getIpaddressDefaulttime', postData, httpOptions);
  }
  UpdateMerchantTimings(DTime): any {
    let postData = new FormData();
    postData.append("time", DTime);

    return this.http.post(environment.BaseUrl + 'UpdateMerchantTimings', postData, this.httpOptions);
  }
  UpdatePickupTimings(ColTime): any {
    let postData = new FormData();
    postData.append("time", ColTime);

    return this.http.post(environment.BaseUrl + 'UpdatePickupTimings', postData, this.httpOptions);
  }
  getOrderSummary(date): any {
    let postData = new FormData();
    postData.append("date", date);

    return this.http.post(environment.BaseUrl + 'AcceptedOrderList', postData, this.httpOptions);
  }
  getDriverSummary(date): any {
    let postData = new FormData();
    postData.append("delivery_date", date);

    return this.http.post(environment.BaseUrl + 'DriversCollectionList', postData, this.httpOptions);
  }
  getAllOrder(txt_status,txt_order_type,txt_search,txt_from_date,txt_to_date,txt_sort_type): any {
    let postData = new FormData();
    postData.append("txt_status", txt_status);
    postData.append("txt_order_type", txt_order_type);
    postData.append("txt_search", txt_search);
    postData.append("txt_from_date", txt_from_date);
    postData.append("txt_to_date", txt_to_date);
    postData.append("txt_sort_type", txt_sort_type);

    return this.http.post(environment.BaseUrl + 'GetAllOrders', postData, this.httpOptions);
  }
  getAllClient(): any {
    let postData = new FormData();
    // postData.append("txt_status", txt_status);

    return this.http.post(environment.BaseUrl + 'all_clients_list', postData, this.httpOptions);
  }
  getOrderDetails(order_id): any {
    let postData = new FormData();
     postData.append("order_id", order_id);

    return this.http.post(environment.BaseUrl + 'OrderdDetails', postData, this.httpOptions);
  }
  getPrinter(): any {
    let postData = new FormData();
    return this.http.post(environment.BaseUrl + 'getprinterdetails', postData, this.httpOptions);
  }
  SaveProfile(Data): any {
    return this.http.post(environment.BaseUrl + 'saveProfile', Data, this.httpOptions);
  }
  deletePrinter(Data): any {
    return this.http.post(environment.BaseUrl + 'deleteprinter', Data, this.httpOptions);
  }
  addPrinter(Data): any {
    return this.http.post(environment.BaseUrl + 'add_new_printer', Data, this.httpOptions);
  }
  PrinterChangesSave(Data): any {
    return this.http.post(environment.BaseUrl + 'updateprinterdetails', Data, this.httpOptions);
  }
  getPrinterOption(): any {
    let postData = new FormData();
    postData.append("mtid","1")
    return this.http.post(environment.BaseUrl + 'getAvailablePrinters', postData, this.httpOptions);
  }
  updatePrinterOption(Data): any {
    return this.http.post(environment.BaseUrl + 'updateprinteroptions', Data, this.httpOptions);
  }

  CheckPrinterIsConnected(IP): any {
    return this.http.post('https://'+IP+'/cgi-bin/epos/service.cgi?devid=local_printer', "", this.httpOptions);
  }
  
  getPreferences(Data): any {
    return this.http.post(environment.BaseUrl + 'get_preference', Data, this.httpOptions);
  }
  AddPreferences(Data): any {
    return this.http.post(environment.BaseUrl + 'AddPreference', Data, this.httpOptions);
  }
  RemovePreferences(Data): any {
    return this.http.post(environment.BaseUrl + 'remove_preference', Data, this.httpOptions);
  }









  bookNow(): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'api-key': environment.apikey,
        'KUSHAL-LOGIN-TOKEN': this.getLoginToken(),
        'User-Id': this.getUserId(),

      })
    }

    return this.http.post(environment.BaseUrl + 'BookNow', "", httpOptions);
  }
 

  // GET & SET USER DATA

  setUserData(userData, login_token) {
    console.log(userData)
    window.localStorage.setItem('ops_user_data', JSON.stringify(userData));
    if (login_token != '')
      window.localStorage.setItem('login_token', login_token);
    window.localStorage.setItem('user_id', userData.id);
  }
  
  
  setSelectedRoute(item) {
    window.localStorage.setItem('sel_route_sub', JSON.stringify(item));
  }
  getSelectedRoute() {
    if (window.localStorage['sel_route_sub']) {
      return JSON.parse(window.localStorage['sel_route_sub']);
    }
    return;
  }

  getUserData() {
    if (window.localStorage['ops_user_data']) {
      return JSON.parse(window.localStorage['ops_user_data']);
    }
    return;
  }
 
  getUserId() {
    if (window.localStorage['user_id']) {
      return window.localStorage['user_id'];
    }
    return;
  }

  getLoginToken() {
    if (window.localStorage['login_token']) {
      return window.localStorage['login_token'];
    }
    return;
  }


  // GET & SET DEVICE INFO
  setDeviceInfo(deviceInfo) {
    window.localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
  }

  getDeviceInfo() {
    if (window.localStorage['deviceInfo']) {
      return JSON.parse(window.localStorage['deviceInfo']);
    }
    return;
  }
}