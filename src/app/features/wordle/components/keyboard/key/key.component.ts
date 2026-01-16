import { Component, input, output } from '@angular/core';
import { KeyboardKeyState } from '../../../interfaces/wordle.interface';

@Component({
  selector: 'keyboard-key',
  standalone: true,
  imports: [],
  templateUrl: './key.component.html',
})
export class KeyboardKeyComponent {
  key = input.required<string>();
  state = input.required<KeyboardKeyState>();

  keyPressed = output<string>();

  onKeyPressed() {
    this.keyPressed.emit(this.key());
  }
}
