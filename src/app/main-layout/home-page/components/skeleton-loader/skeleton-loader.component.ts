import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent {

  constructor() { }

  elementCountHandler(i: number) {
    return new Array(i);
  }

  trackByFn(item) {
    return item.id;
  }

}
