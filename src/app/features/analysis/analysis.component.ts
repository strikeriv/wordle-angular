import { Component, OnInit } from '@angular/core';
import { ChartsModule, ChartTabularData } from '@carbon/charts-angular';
import { FrequencyAnalysisService } from '../../services/wordle/analyzer/frequency-analysis.service';
import { DataService } from '../../services/wordle/data.service';
import { WordleService } from '../../services/wordle/wordle.service';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ChartsModule],
  providers: [DataService, FrequencyAnalysisService, WordleService],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
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

  constructor(
    private readonly dataService: DataService,
    private readonly frequencyAnalysisService: FrequencyAnalysisService,
  ) {}

  ngOnInit(): void {
    this.buildPreExistingSolutionsFrequencyChart();
  }

  private buildPreExistingSolutionsFrequencyChart() {
    const frequencyData =
      this.frequencyAnalysisService.performFrequencyAnalysisOnWords(
        this.dataService.getExistingSolutions(),
      );

    const testData: ChartTabularData = frequencyData.flatMap((letter) =>
      letter.frequencies.map((freq) => ({
        group: letter.letter,
        key: `Position: ${freq.position + 1}`,
        value: freq.frequency,
      })),
    );

    this.data = testData;
  }
}
