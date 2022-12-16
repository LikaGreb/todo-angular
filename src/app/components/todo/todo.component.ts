import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


interface ItemsResponseInterface {
  items: Item[];
}
type Item = {
  text: string;
  id: string;
  checked: boolean;
};
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  httpOptions = instance();
  error?: string;
  items: Item[] = []; 

  
  length: number=this.items.length;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10];
  pageEvent: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
     this.length = this.items.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
 

  constructor(private http: HttpClient) {
    
  }
  

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    const url = `${environment.apiUrl}/router?action=getItems`;
    this.http
      .post<ItemsResponseInterface>(
        url,
        { activeID: localStorage.getItem('activeID') },
        this.httpOptions
      )
      .pipe(map((data) => data))
      .subscribe({
        next: (data) => {
          this.items = data.items;
          
        },
        error: (e) => {
          this.error = 'Server error +${e.message}';
        },
      });
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(',')
      .map((str) => +str);
  }
  
  editFunc(): void {}
  saveFunc(): void {}
  deleteFunc(): void {}
}
