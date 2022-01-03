import { PrinterSetupPage } from './printersetup.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PrinterSetupPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [PrinterSetupPage]
})
export class PrinterSetupPageModule {}
