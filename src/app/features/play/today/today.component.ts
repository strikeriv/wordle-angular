import { Component, signal } from '@angular/core';
import { WordleService } from '../../../services/wordle/wordle.service';
import { WordleGameComponent } from '../../components/wordle/wordle.component';
import { DataService } from '../../../services/wordle/data.service';

@Component({
  selector: 'wordle-today',
  standalone: true,
  imports: [WordleGameComponent],
  providers: [DataService, WordleService],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class PlayTodayComponent {
  wordleSolution = signal<string>('');

  constructor(private readonly wordleService: WordleService) {
    this.wordleService.getWordleToday().subscribe((solution) => {
      this.wordleSolution.set(solution.solution.toLocaleUpperCase());
    });
  }
}
