import { Component, ViewChild, Input } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() logout = false;
  isAuth = !!localStorage.getItem('token');
  @ViewChild(AuthComponent)
  viewChild!: AuthComponent;
  ngOnInit() {}
  ngDoCheck() {}

  ngAfterContentChecked() {
    if (this.viewChild) {
      if (localStorage.getItem('activeID')) {
        this.isAuth = true;
        this.logout = false;
      }
    }
    if (this.logout) {
      this.isAuth = false;
    }
  }
}
