import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Raychem Supervisor';
  showHomePage = true;
  ngUnSubscribe = new Subject();

  constructor(private router: Router) { }

  getCurrentRoute() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.ngUnSubscribe)
      )
      .subscribe((event: NavigationStart) => {
        const specificPages: string[] = ['/', '/login', '/home'];
        if (specificPages.includes(event.url) || event.url.includes('state=')) {
          this.showHomePage = true;
        }
        else {
          this.showHomePage = false;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  ngOnInit() {
    this.getCurrentRoute();
  }
}
