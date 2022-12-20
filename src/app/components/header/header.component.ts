import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import instance from 'src/shared/requests';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() checkLogout = localStorage.getItem('token') ? false : true;
  @Input() isAuth = true;
  @Output() checkLogoutChange = new EventEmitter<boolean>();
  httpOptions = instance();
  error = '';

  constructor(private service: AuthService) {}

  async logoutFunc(): Promise<void> {
    const data = await this.service.logout();
    if (data.ok === true) {
      this.checkLogout = true;
      this.checkLogoutChange.emit(this.checkLogout);
      localStorage.clear();
      return;
    }
    this.error = data.error || 'Помилка невідома';
  }
}
