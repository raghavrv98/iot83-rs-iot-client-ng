import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomePageComponent,
    PieChartComponent,
    SkeletonLoaderComponent
  ],
})
export class HomePageModule { }
