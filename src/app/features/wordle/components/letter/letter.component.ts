import { Component, input } from '@angular/core';
import { LetterAttributes } from '../row/row/interfaces/row.interface';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss',
})
export class LetterComponent {
  index = input.required<number>();

  letter = input.required<string>();
  attributes = input.required<LetterAttributes>();
}
