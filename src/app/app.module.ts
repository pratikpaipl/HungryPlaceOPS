import { DeclineComponent } from './model/decline/decline.component';
import { AcceptComponent } from './model/accept/accept.component';
import { AddOnModelComponent } from './model/add-on-model/add-on-model.component';
import { AddPrinterModelComponent } from './model/addprinter/addprinter.component';
import { FormsModule } from '@angular/forms';
import { WelcomeGuard } from './shared/welcomGuard.service';
import { AuthGuard } from './shared/authguard.service';
import { EventService } from 'src/app/services/EventService';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {HTTP} from "@ionic-native/http/ngx";
import { File } from '@ionic-native/file/ngx';
import { AddPrefrencesComponent } from './model/add-prefrences/add-prefrences.component';
import { FilterModelComponent } from './model/filtermodel/filtermodel.component';
import { AssignDriverModelComponent } from './model/assigndriver/assigndriver.component';
import { ChangeStatusModelComponent } from './model/changestatus/changestatus.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ChangeDriverModelComponent } from './model/changedriver/changedriver.component';

@NgModule({
  declarations: [AppComponent,AddPrefrencesComponent,FilterModelComponent,DeclineComponent,
    AssignDriverModelComponent,ChangeStatusModelComponent,ChangeDriverModelComponent,
    AddPrinterModelComponent,AddOnModelComponent,AcceptComponent],
  entryComponents: [AddPrefrencesComponent,FilterModelComponent,DeclineComponent,
    AssignDriverModelComponent,ChangeStatusModelComponent,ChangeDriverModelComponent,
    AddPrinterModelComponent,AddOnModelComponent,AcceptComponent],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot({mode:'md', scrollAssist: false}), HttpClientModule,AppRoutingModule,],
  providers: [
    StatusBar,Network, EventService, AuthGuard, WelcomeGuard,Camera,ImagePicker,WebView,HTTP,File,
    SplashScreen,Device,AppVersion,Clipboard,InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal],
  bootstrap: [AppComponent],
})
export class AppModule {}
