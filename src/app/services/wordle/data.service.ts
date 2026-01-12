import { Injectable } from '@angular/core';
import { PreviousSolutions } from './static/previous-solutions';

@Injectable()
export class DataService {
  constructor() {}

  getExistingSolutions(): string[] {
    return PreviousSolutions;
  }
}
