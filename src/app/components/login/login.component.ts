import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from "rxjs";

interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  error?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  httpOptions = instance();
  login: string = "";
  pass: string = "";
  error: string = "";
  @Input() activeID="";
  constructor(private http: HttpClient) {

  }

  loginFunc(): void {
    console.log(this.login, this.pass);
    if (this.login === "" || this.pass === "") {
      this.error = "Пусте значення";
      return;
    }
    const url = `${environment.apiUrl}/router?action=login`;
    const res = this.http.post<LoginResInterface>(url, { login: this.login, pass: this.pass }, this.httpOptions).pipe(map(data => data)).subscribe({
      next: (data) => {
        if (data.token !== "" && data.activeID !== "") {
          this.activeID=data.activeID;
          localStorage.setItem("token", data.token);
          localStorage.setItem("activeID", data.activeID);

          return;
        }
        this.error = "Такий користувач не зареєстрований"
      },
      error: (e) => { this.error = 'Server error +${e.message}' }
    });
    console.log(res)
  }
}
