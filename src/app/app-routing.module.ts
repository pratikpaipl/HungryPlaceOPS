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
  {
    path: 'allclient',
    loadChildren: () => import('./pages/allclient/allclient.module').then(m => m.AllClientPageModule)
  },
  {
    path: 'ordersumary',
    loadChildren: () => import('./pages/ordersumary/ordersumary.module').then(m => m.OrderSumaryPageModule)
  },
  {
    path: 'driversumary',
    loadChildren: () => import('./pages/driversumary/driversumary.module').then(m => m.DriverSumaryPageModule)
  },
  {
    path: 'orderhistory',
    loadChildren: () => import('./pages/orderhistory/orderhistory.module').then(m => m.OrderHistoryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'orderdetail',
    loadChildren: () => import('./pages/orderdetail/orderdetail.module').then(m => m.OrderDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
