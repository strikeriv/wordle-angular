import { Component, output } from '@angular/core';

@Component({
  selector: 'keyboard-enter-key',
  standalone: true,
  imports: [],
  templateUrl: './enter-key.component.html',
  styleUrl: './enter-key.component.scss',
})
export class EnterKeyComponent {
  enterPressed = output<string>();

  onBackpacePressed() {
    this.enterPressed.emit('Enter');
  }
}
