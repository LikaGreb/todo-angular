import { Component } from '@angular/core';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent {
  error:string="";
  text: string = "";
  addTaskFunc(): void{
    if (this.text === "") {
      this.error = "Введіть назву задачі";
       setTimeout(() => {
         this.error = '';
       }, 3000);
      return;
   }
  }
}
