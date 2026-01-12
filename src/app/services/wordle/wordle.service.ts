import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordleSolution } from './model/wordle.model';

@Injectable()
export class WordleService {
  constructor(private readonly http: HttpClient) {}

  getWordleToday(): Observable<WordleSolution> {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return this.http.get<WordleSolution>(
      `https://cors-anywhere.herokuapp.com/https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`
    );
  }
}
