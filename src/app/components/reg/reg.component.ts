import { HttpClient } from '@angular/common/http';
import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from "rxjs";

interface RegResponseInterface {
  // token: string;
  // activeID: string;
  ok: boolean;
  error?: string;
  alreadyExist:boolean;
}
interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  arror?: string;
}
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  httpOptions = instance();
   login: string = "";
   pass: string = "";
  //title: string = "Реєстрація";
  error: string = "";
   @Input() activeID = "";
  // @Output() activeIDChange = new EventEmitter<string>; 
  // viewChild: FormInnerComponent = FormInnerComponent();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }

  regFunc(): void {
    //console.log(this.login, this.pass);
    // const login = this.viewChild.login;
    //  const pass = this.viewChild.pass;
    if (this.login === "" || this.pass === "") {
      this.error = "Пусте значення";
      setTimeout(() => {
        this.error = "";
      }, 3000);
    }
    const url = `${environment.apiUrl}/router?action=register`;
    const res = this.http.post<RegResponseInterface>(url, { login: this.login, pass: this.pass }, this.httpOptions).pipe(map(data => data)).subscribe({
      next: (data) => {
        if (data.ok && data.alreadyExist) {
          
          this.error="Такий користувач вже існує";
        }
        if (data.ok && !data.alreadyExist) {
          this.loginFunc()
        }
        this.error = "Такий користувач не зареєстрований"
      },
      error: (e) => { this.error = 'Server error +${e.message}' }
    });
    console.log(res)
  }
  
loginFunc(): void {
   
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







