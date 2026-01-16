import { Component, output } from '@angular/core';

@Component({
  selector: 'keyboard-backspace-key',
  standalone: true,
  imports: [],
  templateUrl: './backspace-key.component.html',
})
export class KeyboardBackspaceKeyComponent {
  backspacePressed = output<string>();

  onBackpacePressed() {
    this.backspacePressed.emit('Backspace');
  }
}
