import { Component } from '@angular/core';
import { ButtonModule } from 'carbon-components-angular';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {}
