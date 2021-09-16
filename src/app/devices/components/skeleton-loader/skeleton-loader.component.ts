import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base.component';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent extends BaseComponent{

  constructor() {
    super();
  }

  elementCountHandler(i: number) {
    return new Array(i);
  }

}
