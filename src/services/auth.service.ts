import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/envirinment';

import {
  LoginResInterface,
  LogoutResInterface,
  RegResponseInterface,
} from 'src/interfaces/auth.interface';
import instance from 'src/shared/requests';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = instance();
  constructor(private http: HttpClient) {}

  async login(login: string, pass: string): Promise<LoginResInterface> {
    try {
      const url = `${environment.apiUrl}/router?action=login`;
      const source$ = this.http.post<LoginResInterface>(
        url,
        { login, pass },
        this.httpOptions
      );
      const data = await lastValueFrom(source$);
      if (data.token && data.activeID) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('activeID', data.activeID);
        return data;
      }
      return {
        token: '',
        activeID: '',
        ok: false,
        error: `${data?.error}Такий користувач на зареєстрований`,
      };
    } catch (e: any) {
      return {
        token: '',
        activeID: '',
        ok: false,
        error: `Помилка сервера + ${e.message}`,
      };
    }
  }

  async reg(login: string, pass: string): Promise<RegResponseInterface> {
    try {
      const url = `${environment.apiUrl}/router?action=register`;
      const source$ = this.http.post<RegResponseInterface>(
        url,
        { login, pass },
        this.httpOptions
      );
      const res = await lastValueFrom(source$);
      if (res.ok && !res.alreadyExist) {
        return { ...res, error: 'такий користувач вже існує' };
      }
      const loginData = await this.login(login, pass);
      if (loginData.ok) {
        return res;
      }
      return { ...res, error: `Помилка входу + ${loginData?.error}` };
    } catch (e: any) {
      return {
        ok: false,
        alreadyExist: false,
        error: `Помилка сервера + ${e.message}`,
      };
    }
  }
  async logout(): Promise<LogoutResInterface> {
    try {
      const url = `${environment.apiUrl}/router?action=logout`;
      const sourse$ = this.http.post<LogoutResInterface>(
        url,
        this.httpOptions
      );
      const res = await lastValueFrom(sourse$);
      if (res.ok) {
          return res;
      }
      return {
        ok: false,
        error: `Не розлогінились`,
      };
    } catch (e: any) {
      return {
        ok: false,
        error: `Помилка сервера + ${e.message}`,
      };
    }
  }
}
