import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrinterOptionPage } from './printeroption.page';

const routes: Routes = [
  {
    path: '',
    component: PrinterOptionPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [PrinterOptionPage]
})
export class PrinterOptionPageModule {}
