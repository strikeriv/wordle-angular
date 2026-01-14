import { Component, effect, input } from '@angular/core';
import { LetterComponent } from '../../letter/letter.component';
import { LetterAttributes } from './interfaces/row.interface';

@Component({
  selector: 'wordle-row',
  standalone: true,
  imports: [LetterComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class WordleRowComponent {
  isSubmitted = input.required<boolean>();
  rowLetters = input.required<string[]>();

  solution = input.required<string>();

  rowLetterAttributes: LetterAttributes[] = Array.from({ length: 5 }, () => ({
    ...this.buildDefaultAttributes(),
  }));

  constructor() {
    effect(() => {
      if (this.isSubmitted()) {
        this.performSolutionCheck();
      }
    });
  }

  private performSolutionCheck() {
    const solutionSplit = this.solution().split('');

    console.log(solutionSplit, 'split!');
    this.rowLetters().forEach((letter, index) => {
      const solutionLetter = solutionSplit[index];
      console.log(letter, solutionLetter);
      if (letter === solutionLetter) {
        this.rowLetterAttributes[index].isCorrect = true;
      } else if (solutionSplit.includes(letter)) {
        this.rowLetterAttributes[index].isSemiCorrect = true;
      } else {
        this.rowLetterAttributes[index].isIncorrect = true;
      }

      console.log(this.rowLetterAttributes[index], 'hmm');
    });
  }

  private buildDefaultAttributes(): LetterAttributes {
    return {
      isIncorrect: false,
      isSemiCorrect: false,
      isCorrect: false,
    };
  }
}
