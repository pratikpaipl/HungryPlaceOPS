import { AuthGuard } from './shared/authguard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
  //  path: 'home', canActivate: [AuthGuard],
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }, {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./auth/forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
