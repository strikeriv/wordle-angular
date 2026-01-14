import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordleSolution } from './model/wordle.model';
import { DataService } from './data.service';

@Injectable()
export class WordleService {
  constructor(
    private readonly dataService: DataService,
    private readonly http: HttpClient
  ) {}

  getWordleToday(): Observable<WordleSolution> {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return this.http.get<WordleSolution>(
      `https://cors-anywhere.herokuapp.com/https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`
    );
  }

  calculateLetterCount(word: string): Map<string, number> {
    const letterCount = new Map<string, number>();

    for (const letter of word) {
      letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
    }

    return letterCount;
  }

  validateGuess(guess: string): boolean {
    return this.dataService
      .getAllValidWords()
      .includes(guess.toLocaleLowerCase());
  }
}
