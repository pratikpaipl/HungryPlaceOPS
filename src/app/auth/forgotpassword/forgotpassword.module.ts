import { ForgotPasswordPage } from './forgotpassword.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage,
  }
];

@NgModule({
  imports: [
    SharedModule,    FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
