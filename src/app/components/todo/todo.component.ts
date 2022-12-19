import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/envirinment';
import instance from 'src/shared/requests';
import { map } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TodoService } from 'src/services/todo.service';


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
newTask="";
editID="";
editTask="";
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10];
  pageEvent: PageEvent = new PageEvent();
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    //this.length = this.items.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.getItems();
  }

  async getItems(): Promise<void> {
    const data = await this.service.getItems();
    if (data.error) {
      this.error = data.error + 'Не знайдено токен';
      return;
    }
    this.items = data.items;
  }

  async saveFunc(checked: boolean): Promise<void> {
    const data = await this.service.changeItem(this.editID, checked, this.editTask);
    if (data.error || !data.ok) {
      this.error = data.error || "Невідома помилка";
      return;
    }
    this.getItems();
    this.newTask = "";
    this.editID = "";
    this.editTask = "";
  }
  
  async deleteFunc(id: string): Promise<void> {
    const data = await this.service.deleteItem(id);
    if (data.error || !data.ok) {
      this.error = data.error || 'Невідома помилка';
      return;
    }
    this.getItems();
  }
  async changeFunc(id: string, checked: boolean): Promise<void> {
    const text = this.items.find(item => item.id === id)?.text;
    if (!text) {
      this.error = "Запис з таким id не знайдено "
      return;
    }
    const data = await this.service.changeItem(id, !checked, text);
    if (data.error || !data.ok) {
      this.error = data.error || "Невідома помилка";
      return;
    }
    this.getItems();
  }
  changeHandler(event: Event): void {
    this.editTask = (event.target as HTMLInputElement).value;
  }
  editFunc(id: string): void {
    this.editID = id;
  }
  async keyHandler(event: KeyboardEvent, checked: boolean): Promise<void> {
    if (event.key === "Enter") {
      await this.saveFunc(checked)
    }
  }

  // drop(event: CdkDragDrop<Item[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }
}
