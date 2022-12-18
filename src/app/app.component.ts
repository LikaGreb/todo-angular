import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() logout = false;
  //isLogout: boolean = false;
  isAuth = !!localStorage.getItem('token');
  @ViewChild(AuthComponent)
  viewChild!: AuthComponent;
  ngOnInit() {}
  ngAfterContentChecked() {
    if (this.viewChild) {
      if (localStorage.getItem('activeID')) {
        this.isAuth = true;
        return;
      }
    }
    if (this.logout) {
      this.isAuth = false;
    }
  }
}
