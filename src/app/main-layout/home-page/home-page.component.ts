import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/service/auth/auth.service';
import { BaseComponent } from '@app/base.component';
@Component({
  selector: 'app-main',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent extends BaseComponent implements OnInit {
  constructor(private auth: AuthService) {
    super();
  }

  signOut() {
    this.auth.signOut();
  }

  ngOnInit(): void {
    this.isLoadingHandler();
  }
}
