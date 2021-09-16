import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesComponent } from './devices.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponentsModule } from '@app/common-components/common-components.module';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';

const routes: Routes = [
  { path: '', component: DevicesComponent }
];

@NgModule({
  declarations: [DevicesComponent, SkeletonLoaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonComponentsModule
  ]
})
export class DevicesModule { }
