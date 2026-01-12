import { Component, OnInit } from '@angular/core';
import { WordleService } from '../../services/wordle/wordle.service';
import { FrequencyAnalysisService } from '../../services/wordle/analyzer/frequency-analysis.service';
import { ChartsModule, ChartTabularData } from '@carbon/charts-angular';
import { DataService } from '../../services/wordle/data.service';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ChartsModule],
  providers: [DataService, FrequencyAnalysisService, WordleService],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  data: ChartTabularData = [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: -29123,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: -35213,
    },
    {
      group: 'Dataset 1',
      key: 'Restocking',
      value: 51213,
    },
    {
      group: 'Dataset 1',
      key: 'Misc',
      value: 16932,
    },
    {
      group: 'Dataset 2',
      key: 'Qty',
      value: 32432,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: -21312,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: -56456,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: -21312,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: -12312,
    },
    {
      group: 'Dataset 3',
      key: 'More',
      value: 23232,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 34232,
    },
    {
      group: 'Dataset 3',
      key: 'Restocking',
      value: -12312,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: -34234,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: -32423,
    },
    {
      group: 'Dataset 4',
      key: 'More',
      value: 21313,
    },
    {
      group: 'Dataset 4',
      key: 'Sold',
      value: 64353,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 24134,
    },
    {
      group: 'Dataset 4',
      key: 'Misc',
      value: 24134,
    },
  ];

  options = {
    title: 'Pre-selected groups (grouped bar)',
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

  constructor(
    private readonly dataService: DataService,
    private readonly frequencyAnalysisService: FrequencyAnalysisService
  ) {}

  ngOnInit(): void {
    this.buildPreExistingSolutionsFrequencyChart();
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
