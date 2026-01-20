import { Component, effect, input, output, signal } from '@angular/core';
import { RowAttributes } from '../../interfaces/wordle.interface';
import { LetterComponent } from '../letter/letter.component';
import { LetterAttributes } from './interfaces/row.interface';
import { WordleService } from '../../../../../services/wordle/wordle.service';

@Component({
  selector: 'wordle-row',
  standalone: true,
  imports: [LetterComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class WordleRowComponent {
  index = input.required<number>();

  letters = input.required<string[]>();
  solution = input.required<string>();
  rowAttributes = input.required<RowAttributes>();

  letterAttributes = signal<LetterAttributes[]>(
    Array.from({ length: 5 }, () => this.buildDefaultAttributes()),
  );

  gameOver = output<number>(); // return # attempts

  constructor(private readonly wordleService: WordleService) {
    effect(() => {
      if (this.rowAttributes().isSubmitted) {
        return this.performSolutionCheck();
      }
    });
  }

  private performSolutionCheck() {
    const solutionSplit = this.solution().split('');
    const letterCounts = this.wordleService.calculateLetterCount(
      this.solution(),
    );
    const existingLetters = new Map<string, number>();

    const isCorrectSolution = this.solution() === this.letters().join('');

    // perform one pass to update correct letters
    this.letters().forEach((letter, index) => {
      if (letter === solutionSplit[index]) {
        this.letterAttributes()[index].isCorrect = true;
        const count = existingLetters.get(letter) || 0;
        existingLetters.set(letter, count + 1);

        // add bounce if correct solution
        if (isCorrectSolution) {
          this.letterAttributes()[index].isBouncing = true;
        }
      }
    });

    // perform pass 2 to update incorrect & semi-correct
    // this prevent multiple letters from being parked
    if (isCorrectSolution) {
      setTimeout(() => this.gameOver.emit(this.index()), 1500);
    } else {
      this.letters().forEach((letter, index) => {
        if (this.letterAttributes()[index].isCorrect) return;

        const letterCount = letterCounts.get(letter) || 0;
        const existingCount = existingLetters.get(letter) || 0;

        if (solutionSplit.includes(letter) && existingCount < letterCount) {
          this.letterAttributes()[index].isSemiCorrect = true;
          existingLetters.set(letter, existingCount + 1);
        } else {
          this.letterAttributes()[index].isIncorrect = true;
        }
      });
    }

    // if the row is index 5, and we didn't hit above, the game is a fail
    if (this.index() === 5) {
      setTimeout(() => this.gameOver.emit(6), 1500);
    }
  }

  private buildDefaultAttributes(): LetterAttributes {
    return {
      isBouncing: false,

      isIncorrect: false,
      isSemiCorrect: false,
      isCorrect: false,
    };
  }
}
