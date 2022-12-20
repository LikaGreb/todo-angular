import { Component, Input } from '@angular/core';
import instance from 'src/shared/requests';
import { AuthService } from 'src/services/auth.service';

interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  error?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  httpOptions = instance();
  login: string = '';
  pass: string = '';
  error: string = '';
  @Input() activeID = '';
  constructor(private service: AuthService) {}

  async loginFunc() {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      setTimeout(() => {
        this.error = '';
      }, 3000);
      return;
    }
    const data = await this.service.login(this.login, this.pass);
    if (data.error) {
      this.error = data.error;
      setTimeout(() => {
        this.error = '';
      }, 3000);
      return;
    }
  }
}
