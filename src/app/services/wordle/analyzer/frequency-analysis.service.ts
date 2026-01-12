import { Injectable } from '@angular/core';
import {
  LetterPositionFrequency,
  Position,
} from './model/frequency-analysis.model';

@Injectable()
export class FrequencyAnalysisService {
  constructor() {}

  performFrequencyAnalysisOnWords(words: string[]) {
    const positionMap = new Map<string, Map<Position, number>>();

    words.forEach((word) => {
      word.split('').forEach((letter, index) => {
        const letterPositionMap = positionMap.get(letter);

        if (letterPositionMap) {
          const positionKey =
            Position[Position[index] as keyof typeof Position];
          const frequencyCount = letterPositionMap.get(positionKey)!;

          letterPositionMap.set(positionKey, frequencyCount + 1);
        } else {
          positionMap.set(
            letter,
            new Map([
              [Position.ONE, 0],
              [Position.TWO, 0],
              [Position.THREE, 0],
              [Position.FOUR, 0],
              [Position.FIVE, 0],
            ])
          );
        }
      });
    });

    // convert to a useable data structure
    const positions = Array.from(positionMap).map(
      (positions) =>
        ({
          letter: positions[0],
          frequencies: Array.from(positions[1]).map((position) => ({
            position: position[0],
            frequency: position[1],
          })),
        } as LetterPositionFrequency)
    );

    return positions;
  }
}
