import {
  Component,
  effect,
  HostListener,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { WordleNotificationComponent } from '../../features/wordle/components/notification/notification.component';
import { NotificationService } from '../../features/wordle/components/notification/services/notification.service';
import { WordleRowComponent } from '../../features/wordle/components/row/row.component';
import {
  KeyboardKeyState,
  RowAttributes,
} from '../../features/wordle/interfaces/wordle.interface';
import { DataService } from '../../services/wordle/data.service';
import { WordleService } from '../../services/wordle/wordle.service';
import { WordleKeyboardComponent } from './components/keyboard/keyboard.component';

@Component({
  selector: 'wordle-game',
  standalone: true,
  imports: [
    WordleKeyboardComponent,
    WordleNotificationComponent,
    WordleRowComponent,
  ],
  providers: [DataService, NotificationService, WordleService],
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.scss',
})
export class WordleGameComponent implements OnInit {
  solution = input.required<string>();

  notificationMessage: string = '';

  rows: string[][] = Array.from({ length: 6 }, () => new Array(5).fill(''));
  rowAttributes = signal<RowAttributes[]>(
    Array.from({ length: 6 }, () => this.buildRowAttributes())
  );

  guesses = signal<string[]>([]);

  doCancelInput = false; // when flipping letters and such, cancel input
  gameActive = true;

  keyboardLetterStates = signal<Record<string, KeyboardKeyState>>({});

  constructor(
    private readonly notificationService: NotificationService,
    private readonly wordleService: WordleService
  ) {
    effect(() => {
      // Calculate the new states immediately (logic from previous step)
      const nextStates = this.computeLetterStates();

      // Wait for the animation to finish before updating the UI signal
      setTimeout(() => {
        this.doCancelInput = false;
        this.keyboardLetterStates.set(nextStates);
      }, 1500); // Match this to your CSS transition time
    });
  }

  ngOnInit(): void {
    console.log(this.solution(), 'solution!');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.gameActive || this.doCancelInput) {
      return;
    }

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

  onWordleKeyboardPressed(key: string) {
    return this.handleKeyboardEvent({ key } as KeyboardEvent);
  }

  handleGameOver(attempts: number) {
    const messages = [
      'Genius',
      'Magnificent',
      'Impressive',
      'Splendid',
      'Great',
      'Phew',
    ];

    if (attempts === 6) {
      // failed game
      this.notificationService.show(this.solution());
    } else {
      this.notificationService.show(messages[attempts]);
    }

    this.gameActive = false;
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
    const currentRow = this.getCurrentWordleRow();
    if (currentRow === -1) {
      return; // no more rows to submit (failed game)
    }

    const currentLetter = this.getCurrentWordleRowLetter(currentRow);
    if (currentLetter !== -1) {
      // row is not filled (cannot submit)
      this.notificationService.show('Not enough letters');
      this.shakeRowOnInvalidGuess(currentRow);

      return;
    }

    // validate the guess before we allow them to guess
    const guess = this.rows[currentRow].join('');
    const isValidGuess = this.wordleService.validateGuess(guess);
    if (!isValidGuess) {
      // show a notification saying it's invalid!
      this.notificationService.show('Not in word list');
      this.shakeRowOnInvalidGuess(currentRow);

      return;
    }

    // guess is valid, we submit their guess
    this.doCancelInput = true;
    this.guesses.update((prev) => [...prev, guess]);

    this.rowAttributes.update((prev) =>
      prev.map((attr, i) =>
        i === currentRow ? { ...attr, isSubmitted: true } : attr
      )
    );
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
    return this.rowAttributes().findIndex((row) => !row.isSubmitted);
  }

  private getCurrentWordleRowLetter(rowIndex: number) {
    return this.rows[rowIndex].findIndex((letter) => !letter);
  }

  private shakeRowOnInvalidGuess(rowIndex: number) {
    this.rowAttributes.update((prev) =>
      prev.map((attr, i) =>
        i === rowIndex ? { ...attr, isShaking: true } : attr
      )
    );

    setTimeout(() => {
      this.rowAttributes.update((prev) =>
        prev.map((attr, i) =>
          i === rowIndex ? { ...attr, isShaking: false } : attr
        )
      );
    }, 500);
  }

  private computeLetterStates(): Record<string, KeyboardKeyState> {
    const states: Record<string, KeyboardKeyState> = {};
    const solution = this.solution().toUpperCase();

    this.guesses().forEach((guess) => {
      guess.split('').forEach((letter, i) => {
        const upperLetter = letter.toUpperCase();
        const currentState = states[upperLetter];

        if (currentState === 'correct') return;

        if (upperLetter === solution[i]) {
          states[upperLetter] = 'correct';
        } else if (solution.includes(upperLetter)) {
          states[upperLetter] = 'semicorrect';
        } else if (!currentState) {
          states[upperLetter] = 'incorrect';
        }
      });
    });

    return states;
  }

  private buildRowAttributes(): RowAttributes {
    return {
      isShaking: false,
      isSubmitted: false,
    };
  }
}
