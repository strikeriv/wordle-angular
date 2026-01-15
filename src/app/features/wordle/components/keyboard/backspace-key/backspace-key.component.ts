import { Component, output } from '@angular/core';

@Component({
  selector: 'keyboard-backspace-key',
  standalone: true,
  imports: [],
  templateUrl: './backspace-key.component.html',
  styleUrl: './backspace-key.component.scss',
})
export class BackspaceKeyComponent {
  backspacePressed = output<string>();

  onBackpacePressed() {
    this.backspacePressed.emit('Backspace');
  }
}
