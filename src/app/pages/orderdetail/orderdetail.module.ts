import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDetailPage } from './orderdetail.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [OrderDetailPage]
})
export class OrderDetailPageModule {}
