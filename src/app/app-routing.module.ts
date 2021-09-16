import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { HomePageComponent } from './main-layout/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: AuthComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
