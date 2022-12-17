import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from 'rxjs';

interface RegResponseInterface {
  ok: boolean;
  error?: string;
  alreadyExist: boolean;
}
interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  error?: string;
}
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {
  httpOptions = instance();
  login: string = '';
  pass: string = '';
  error: string = '';
  @Input() activeID = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  regFunc(): void {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      setTimeout(() => {
        this.error = '';
      }, 3000);
    }
    const url = `${environment.apiUrl}/router?action=register`;
    const res = this.http
      .post<RegResponseInterface>(
        url,
        { login: this.login, pass: this.pass },
        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          // if (data.ok && data.alreadyExist) {
          //   this.error = 'Такий користувач вже існує';
          // }
          if (data.ok && data.alreadyExist=== false) {
            this.loginFunc();
            console.log(data, 'reg');
            return;
          }
          this.error = 'Такий користувач вже зареєстрований';
          setTimeout(() => {
            this.error = '';
          }, 3000);
          return;
        },
        error: (e) => {
          this.error = 'Server error +${e.message}';
        },
      });
    console.log(res);
  }

  loginFunc(): void {
    const url = `${environment.apiUrl}/router?action=login`;
    const res = this.http
      .post<LoginResInterface>(
        url,
        { login: this.login, pass: this.pass },
        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          if (data.token !== '' && data.activeID !== '' && data.ok === true) {
            this.activeID = data.activeID;
            localStorage.setItem('token', data.token);
            localStorage.setItem('activeID', data.activeID);
            console.log(data, 'data');
            return;
          }
          if (data.ok === false) {
            this.error = 'Такого користувача не існує';
            setTimeout(() => {
              this.error = '';
            }, 3000);
            return;
          } else this.error = 'Такий користувач не зареєстрований';
        },
        error: (e) => {
          this.error = 'Server error +${e.message}';
          setTimeout(() => {
            this.error = '';
          }, 3000);
          return;
        },
      });
    console.log(res);
  }
}
