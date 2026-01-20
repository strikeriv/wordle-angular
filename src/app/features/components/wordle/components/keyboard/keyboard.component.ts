import { Component, input, output } from '@angular/core';
import { KeyboardKeyState } from '../../interfaces/wordle.interface';
import { KeyboardBackspaceKeyComponent } from './backspace-key/backspace-key.component';
import { KeyboardEnterKeyComponent } from './enter-key/enter-key.component';
import { KeyboardKeyComponent } from './key/key.component';

@Component({
  selector: 'wordle-keyboard',
  standalone: true,
  imports: [
    KeyboardKeyComponent,
    KeyboardBackspaceKeyComponent,
    KeyboardEnterKeyComponent,
  ],
  templateUrl: './keyboard.component.html',
})
export class WordleKeyboardComponent {
  keyboardRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  keyboardRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  keyboardRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  letterStates = input.required<Record<string, KeyboardKeyState>>();
  wordleKeyboardPressed = output<string>();

  onKeyboardButtonPress(key: string) {
    this.wordleKeyboardPressed.emit(key);
  }

  getKeyState(key: string): KeyboardKeyState {
    return this.letterStates()[key.toUpperCase()] || null;
  }
}
