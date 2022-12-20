import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from 'src/services/todo.service';


type Item = {
  text: string;
  id: string;
  checked: boolean;
};
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
})
export class AddtaskComponent {
  error: string = '';
  @Input() addItem = false;
  @Output() addItemChange = new EventEmitter<boolean>();
  @Input() items: Item[] = [];
  @Input() newTask = '';
  constructor(private service: TodoService) {}

  async addTaskFunc(): Promise<void> {
    const data = await this.service.addItem(this.newTask);
    if (this.newTask === '') {
      this.error = 'Введіть назву задачі';
      setTimeout(() => {
        this.error = '';
      }, 3000);
      return;
    }
    if (data.error) {
      this.error = data.error;
      return;
    }
    this.addItem = true;
    this.addItemChange.emit(this.addItem)
  }
  
  
}

