import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import instance from 'src/shared/requests';
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
}
