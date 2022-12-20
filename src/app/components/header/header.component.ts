//import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { map } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import instance from 'src/shared/requests';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() checkLogout = false;
  //@Input() logout = false;
  @Input() isAuth = true;
  @Output() checkLogoutChange = new EventEmitter<boolean>();
  httpOptions = instance();
  error = '';
  constructor(private service: AuthService) {}

  async logoutFunc(): Promise<void> {
    const data = await this.service.logout();
    if (data.ok === true) {
      // this.checkLogout = true;
      this.isAuth = false;
      this.checkLogoutChange.emit(this.checkLogout);
      localStorage.clear();
      console.log(data, 'data', this.isAuth, 'isAuth');
      return;
    }
    this.error = data.error || 'Помилка невідома';
  }
}
