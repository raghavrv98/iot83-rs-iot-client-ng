import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/service/auth/auth.service';
import { MainMenuService } from '@app/shared/services/main-menu.service';
import { MenuItem } from 'src/app/shared/models/menu-item.entity';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Input() templateType: 'homePageTemplate' | 'commonTemplate' = 'homePageTemplate';
  menuItems: MenuItem[] = [];

  constructor(private mainMenuService: MainMenuService, private elementRef: ElementRef, private auth: AuthService) { }

  @HostListener('document:click', ['event'])
  onClick() {
    if (this.elementRef.nativeElement.querySelector('#navbar')?.classList.contains('show')) {
      this.elementRef.nativeElement.querySelector('#navbar').classList.remove('show');
    }
  }

  signOut() {
    this.auth.signOut();
  }

  trackByIndex(index: number) {
    return index;
  }

  ngOnInit() {
    this.menuItems = this.mainMenuService.getMenuItems(this.templateType);
  }

}
