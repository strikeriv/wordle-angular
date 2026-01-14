import {
  Component,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ChartsModule, ChartTabularData } from '@carbon/charts-angular';
import { FrequencyAnalysisService } from '../../services/wordle/analyzer/frequency-analysis.service';
import { DataService } from '../../services/wordle/data.service';
import { WordleService } from '../../services/wordle/wordle.service';
import { WordleRowComponent } from '../wordle/components/row/row.component';
import { WordleNotificationComponent } from '../wordle/components/notification/notification.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [WordleRowComponent, ChartsModule, WordleNotificationComponent],
  providers: [DataService, FrequencyAnalysisService, WordleService],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  @ViewChild('notification') notification!: WordleNotificationComponent;

  notificationMessage: string = '';

  data: ChartTabularData = [];
  options = {
    title: 'Pre-existing Solutions Frequency Graph',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'labels',
        mapsTo: 'key',
      },
    },
    height: '400px',
  };

  wordleRowsLetters: string[][] = Array.from({ length: 6 }, () =>
    new Array(5).fill('')
  );
  wordleRowsSubmitted = signal<boolean[]>(new Array(6).fill(false));

  solution = 'PURPY';

  constructor(
    private readonly dataService: DataService,
    private readonly wordleService: WordleService,
    private readonly frequencyAnalysisService: FrequencyAnalysisService
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

  ngOnInit(): void {
    this.buildPreExistingSolutionsFrequencyChart();
  }

  private getCurrentWordleRow() {
    return this.wordleRowsSubmitted().findIndex((submitted) => !submitted);
  }

  private getCurrentWordleRowLetter(rowIndex: number) {
    return this.wordleRowsLetters[rowIndex].findIndex((letter) => !letter);
  }

  private onLetterPress(letter: string) {
    const currentRow = this.getCurrentWordleRow();
    if (currentRow === -1) {
      return; // no more rows to submit (failed game)
    }

    const currentLetter = this.getCurrentWordleRowLetter(currentRow);
    this.wordleRowsLetters[currentRow][currentLetter] =
      letter.toLocaleUpperCase();
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
      this.wordleRowsLetters[currentRow][4] = '';
    } else {
      // remove letter previous
      this.wordleRowsLetters[currentRow][deletedLetterIndex - 1] = '';
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
      this.notificationMessage = 'Not enough letters';
      this.notification.show();

      return;
    }

    // validate the guess before we allow them to guess
    const guess = this.wordleRowsLetters[currentRow].join('');
    // const isValidGuess = this.wordleService.validateGuess(guess);
    const isValidGuess = true;

    if (!isValidGuess) {
      // show a notification saying it's invalid!
      this.notificationMessage = 'Not in word list';
      this.notification.show();

      return;
    }

    this.wordleRowsSubmitted.update((oldArray) => {
      const newArray = [...oldArray];
      newArray[currentRow] = true;
      return newArray;
    });
  }

  private buildPreExistingSolutionsFrequencyChart() {
    const frequencyData =
      this.frequencyAnalysisService.performFrequencyAnalysisOnWords(
        this.dataService.getExistingSolutions()
      );

    const testData: ChartTabularData = frequencyData.flatMap((letter) =>
      letter.frequencies.map((freq) => ({
        group: letter.letter,
        key: `Position: ${freq.position + 1}`,
        value: freq.frequency,
      }))
    );

    console.log(testData, 'yo');
    this.data = testData;
  }
}
