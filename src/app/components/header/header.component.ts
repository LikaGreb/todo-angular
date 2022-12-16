import { HttpClient } from '@angular/common/http';
import { Component,Input,Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from "rxjs";


interface LogoutResInterface {
    token: string;
    activeID: string;
    ok: boolean;
    arror?: string;
  }
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()logout=false;
  @Output() logoutChange=new EventEmitter<boolean>(true)
  httpOptions=instance();
  error="";
  constructor(private http:HttpClient){ }
 
  logoutFunc():void{
    const url = `${environment.apiUrl}/router?action=logout`;
    const res = this.http.post<LogoutResInterface>(url, this.httpOptions).pipe(map(data => data)).subscribe({
      next: (data) => {
        if (data.ok) {
          this.logout=true;
          this.logoutChange.emit(this.logout);
          localStorage.clear();
          return;
        }
        this.error = "Помилка! Спробуйте вийти ще раз"
      },
      error: (e) => { this.error = 'Server error +${e.message}' }
    });
  }
}
