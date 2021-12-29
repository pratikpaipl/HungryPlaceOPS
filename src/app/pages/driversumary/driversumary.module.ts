import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DriverSumaryPage } from './driversumary.page';

const routes: Routes = [
  {
    path: '',
    component: DriverSumaryPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [DriverSumaryPage]
})
export class DriverSumaryPageModule {}
