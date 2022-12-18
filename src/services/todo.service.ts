import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemAddResponseInterface, ItemDeleteResponseInterface, ItemsResponseInterface } from 'src/interfaces/todo.interface';
import instance from 'src/shared/request';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpOptions = instance();
  constructor(private http: HttpClient) {}
  async getItems(): Promise<ItemsResponseInterface> {
    try {
      const url = `${environment.apiUrl}/router?action=getItems`;
      const sourse$ = this.http.post<ItemsResponseInterface>(
        url,
        {
          activeID: localStorage.getItem('activeID'),
        },
        this.httpOptions
      );
      const data = await lastValueFrom(sourse$);

      return data;
    } catch (e: any) {
      return {
        items: [],
        error: `Помилка сервера + ${e.message}`,
      };
    }
  }
  async addItem(text: string): Promise<ItemAddResponseInterface> {
    try {
      if(text===""){
        return{
          id:"",
        error: `Пусте значення`,
        }
      }
      const url = `${environment.apiUrl}/router?action=createItem`;
      const sourse$ = this.http.post<ItemAddResponseInterface>(
        url,
        {
          activeID: localStorage.getItem('activeID'),
          text,
        },
        this.httpOptions
      );
      const data = await lastValueFrom(sourse$);

      return data;
    } catch (e: any) {
      return {
        id:"",
        error: `Помилка сервера + ${e.message}`,
    }
  }
}

async deleteItem(id: string): Promise<ItemDeleteResponseInterface> {
  try {
    const url = `${environment.apiUrl}/router?action=deleteItem`;
    const sourse$ = this.http.post<ItemDeleteResponseInterface>(
      url,
      {
        activeID: localStorage.getItem('activeID'),
        id
      },
      this.httpOptions
    );
    const data = await lastValueFrom(sourse$);

    return data;
  } catch (e: any) {
    return {
      ok:false,
      error: `Помилка сервера + ${e.message}`,
  }
}
}

async changeItem(id: string, checked:boolean, text:string): Promise<ItemDeleteResponseInterface> {
  try {
    
    const url = `${environment.apiUrl}/router?action=editItem`;
    const sourse$ = this.http.post<ItemDeleteResponseInterface>(
      url,
      {
        activeID: localStorage.getItem('activeID'),
        text,
        id,
        checked
      },
      this.httpOptions
    );
    const data = await lastValueFrom(sourse$);

    return data;
  } catch (e: any) {
    return {
      ok:false,
      error: `Помилка сервера + ${e.message}`,
  }
}
}


}