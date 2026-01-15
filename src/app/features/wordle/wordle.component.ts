import { Component, HostListener, ViewChild } from '@angular/core';

import { WordleNotificationComponent } from '../../features/wordle/components/notification/notification.component';
import { NotificationService } from '../../features/wordle/components/notification/services/notification.service';
import { WordleRowComponent } from '../../features/wordle/components/row/row.component';
import { RowAttributes } from '../../features/wordle/interfaces/wordle.interface';
import { WordleService } from '../../services/wordle/wordle.service';

@Component({
  selector: 'wordle-game',
  standalone: true,
  imports: [WordleNotificationComponent, WordleRowComponent],
  providers: [NotificationService, WordleService],
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.scss',
})
export class WordleGameComponent {
  @ViewChild('notification') notification!: WordleNotificationComponent;

  notificationMessage: string = '';

  rows: string[][] = Array.from({ length: 6 }, () => new Array(5).fill(''));
  rowAttributes: RowAttributes[] = Array.from({ length: 6 }, () => ({
    ...this.buildRowAttributes(),
  }));

  solution = 'PURPY';

  constructor(
    private readonly notificationService: NotificationService,
    private readonly wordleService: WordleService
  ) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const { key } = event;

    if (key === 'Backspace') {
      return this.onBackspacePress();
    }

    if (key === 'Enter') {
      return this.onEnterPress();
    }

    if (/^[a-zA-Z]$/.test(key)) {
      return this.onLetterPress(key);
    }
  }

  private onBackspacePress() {
    const currentRow = this.getCurrentWordleRow();
    if (currentRow === -1) {
      return; // no more rows to submit (failed game)
    }

    const currentLetter = this.getCurrentWordleRowLetter(currentRow);
    if (currentLetter === 0) {
      return; // trying to delete letters from empty row
    }

    let deletedLetterIndex = currentLetter;
    if (deletedLetterIndex === -1) {
      // remove last letter
      this.rows[currentRow][4] = '';
    } else {
      // remove letter previous
      this.rows[currentRow][deletedLetterIndex - 1] = '';
    }
  }

  private onEnterPress() {
    this.shakeRowOnInvalidGuess(0);

    const currentRow = this.getCurrentWordleRow();
    if (currentRow === -1) {
      return; // no more rows to submit (failed game)
    }

    const currentLetter = this.getCurrentWordleRowLetter(currentRow);
    console.log(currentLetter, this.rows);
    if (currentLetter !== -1) {
      // row is not filled (cannot submit)
      console.log('showing not enough letters');
      this.notificationService.show('Not enough letters');
      this.shakeRowOnInvalidGuess(currentRow);

      return;
    }

    // validate the guess before we allow them to guess
    const guess = this.rows[currentRow].join('');
    const isValidGuess = this.wordleService.validateGuess(guess);
    if (!isValidGuess) {
      // show a notification saying it's invalid!
      console.log('showing not in word list');
      this.notificationService.show('Not in word list');
    }
  }

  private onLetterPress(letter: string) {
    const currentRow = this.getCurrentWordleRow();
    if (currentRow === -1) {
      return; // no more rows to submit (failed game)
    }

    const currentLetter = this.getCurrentWordleRowLetter(currentRow);
    this.rows[currentRow][currentLetter] = letter.toLocaleUpperCase();
  }

  private getCurrentWordleRow() {
    return this.rowAttributes.findIndex((row) => !row.isLocked);
  }

  private getCurrentWordleRowLetter(rowIndex: number) {
    return this.rows[rowIndex].findIndex((letter) => !letter);
  }

  private shakeRowOnInvalidGuess(row: number) {
    this.rowAttributes[row].isShaking = true;

    // remove shaking attribute to stop shaking
    setTimeout(() => (this.rowAttributes[row].isShaking = false), 500);
  }

  private buildRowAttributes(): RowAttributes {
    return {
      isShaking: false,
      isLocked: false,
    };
  }
}
