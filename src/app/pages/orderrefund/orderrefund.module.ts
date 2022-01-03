import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderRefundPage } from './orderrefund.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRefundPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [OrderRefundPage]
})
export class OrderRefundPageModule {}
