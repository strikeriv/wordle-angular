import { Component, effect, input } from '@angular/core';
import { LetterComponent } from '../letter/letter.component';
import { LetterAttributes } from './interfaces/row.interface';
import { WordleService } from '../../../../services/wordle/wordle.service';

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

  constructor(private readonly wordleService: WordleService) {
    effect(() => {
      if (this.isSubmitted()) {
        this.performSolutionCheck();
      }
    });
  }

  private performSolutionCheck() {
    const solutionSplit = this.solution().split('');
    const letterCounts = this.wordleService.calculateLetterCount(
      this.solution()
    );

    const existingLetters = new Map<string, number>();

    console.log(letterCounts, existingLetters);

    this.rowLetters().forEach((letter, index) => {
      const solutionLetter = solutionSplit[index];

      if (letter === solutionLetter) {
        const existingCount = existingLetters.get(letter) || 0;
        existingLetters.set(letter, existingCount + 1);

        this.rowLetterAttributes[index].isCorrect = true;
      } else if (solutionSplit.includes(letter)) {
        // we need to do a bit of extra logic here
        // words can have more than one letter if included,
        // so we need to keep track of that, and
        // only highlight the # that are included and nothing more
        const letterCount = letterCounts.get(letter) || 0;
        const existingCount = existingLetters.get(letter) || 0;

        if (existingCount >= letterCount) {
          // the count "guessed" is passed the amount in the word
          // so, we skip the incorrect and directly go to incorrect

          this.rowLetterAttributes[index].isIncorrect = true;
          return;
        }

        existingLetters.set(letter, existingCount + 1);

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
