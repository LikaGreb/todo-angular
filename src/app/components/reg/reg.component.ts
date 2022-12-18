import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from 'rxjs';
import { AuthService } from 'src/services/auth.service';


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

  constructor(private service: AuthService) {}

  ngOnInit(): void {}

  async regFunc(): Promise<void> {
    if (this.login === '' || this.pass === '') {
      this.error = 'Пусте значення';
      return;
    }
    const data = await this.service.reg(this.login, this.pass);
    if (data.error) {
      this.error = data.error;
      return;
    }
    this.activeID = localStorage.getItem('activeID') || '';
  }

  // loginFunc(): void {
  //   const url = `${environment.apiUrl}/router?action=login`;
  //   const res = this.http
  //     .post<LoginResInterface>(
  //       url,
  //       { login: this.login, pass: this.pass },
  //       this.httpOptions
  //     )
  //     .pipe(map((data) => data))
  //     .subscribe({
  //       next: (data) => {
  //         if (data.token !== '' && data.activeID !== '' && data.ok === true) {
  //           this.activeID = data.activeID;
  //           localStorage.setItem('token', data.token);
  //           localStorage.setItem('activeID', data.activeID);
  //           console.log(data, 'data');
  //           return;
  //         }
  //         if (data.ok === false) {
  //           this.error = 'Такого користувача не існує';
  //           setTimeout(() => {
  //             this.error = '';
  //           }, 3000);
  //           return;
  //         } else this.error = 'Такий користувач не зареєстрований';
  //       },
  //       error: (e) => {
  //         this.error = 'Server error +${e.message}';
  //         setTimeout(() => {
  //           this.error = '';
  //         }, 3000);
  //         return;
  //       },
  //     });
  //   console.log(res);
  // }
}
