import { Component, output } from '@angular/core';

@Component({
  selector: 'keyboard-enter-key',
  standalone: true,
  imports: [],
  templateUrl: './enter-key.component.html',
})
export class KeyboardEnterKeyComponent {
  enterPressed = output<string>();

  onBackpacePressed() {
    this.enterPressed.emit('Enter');
  }
}
