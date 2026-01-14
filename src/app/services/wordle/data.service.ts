import { Injectable } from '@angular/core';
import { PreviousSolutions } from './static/previous-solutions';
import { AllWords } from './static/all-words';

@Injectable()
export class DataService {
  constructor() {}

  getAllValidWords(): string[] {
    return AllWords;
  }

  getExistingSolutions(): string[] {
    return PreviousSolutions;
  }
}
