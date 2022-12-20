import { Component } from '@angular/core';
import { SpinnerService } from 'src/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public loader: SpinnerService) {}
}
