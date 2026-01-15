import { Component, effect, input } from '@angular/core';
import { WordleService } from '../../../../services/wordle/wordle.service';
import { RowAttributes } from '../../interfaces/wordle.interface';
import { LetterComponent } from '../letter/letter.component';
import { LetterAttributes } from './interfaces/row.interface';

@Component({
  selector: 'wordle-row',
  standalone: true,
  imports: [LetterComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class WordleRowComponent {
  letters = input.required<string[]>();
  solution = input.required<string>();
  rowAttributes = input.required<RowAttributes>();

  letterAttributes: LetterAttributes[] = Array.from({ length: 5 }, () => ({
    ...this.buildDefaultAttributes(),
  }));

  constructor(private readonly wordleService: WordleService) {
    // effect(() => {
    //   if (this.rowAttributes().isLocked) {
    //     return this.onGuessSubmitted();
    //   }
    // });
  }

  private onGuessSubmitted() {
    // first, check to see if the row is complete
    if (!this.isRowComplete()) {
      return;
    }
  }

  private performSolutionCheck() {
    const solutionSplit = this.solution().split('');
    const letterCounts = this.wordleService.calculateLetterCount(
      this.solution()
    );

    const existingLetters = new Map<string, number>();

    console.log(letterCounts, existingLetters);

    this.letters().forEach((letter, index) => {
      const solutionLetter = solutionSplit[index];

      if (letter === solutionLetter) {
        const existingCount = existingLetters.get(letter) || 0;
        existingLetters.set(letter, existingCount + 1);

        this.letterAttributes[index].isCorrect = true;
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

          this.letterAttributes[index].isIncorrect = true;
          return;
        }

        existingLetters.set(letter, existingCount + 1);

        this.letterAttributes[index].isSemiCorrect = true;
      } else {
        this.letterAttributes[index].isIncorrect = true;
      }

      console.log(this.letterAttributes[index], 'hmm');
    });
  }

  private isRowComplete() {
    return this.letters().every((letter) => !!letter);
  }

  private buildDefaultAttributes(): LetterAttributes {
    return {
      isIncorrect: false,
      isSemiCorrect: false,
      isCorrect: false,
    };
  }
}
