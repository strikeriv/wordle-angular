import { Component, OnInit } from '@angular/core';
import { WordleService } from '../../services/wordle/wordle.service';
import { FrequencyAnalysisService } from '../../services/wordle/analyzer/frequency-analysis.service';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [],
  providers: [FrequencyAnalysisService, WordleService],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  constructor(
    private readonly frequencyAnalysisService: FrequencyAnalysisService
  ) {}

  ngOnInit(): void {
    console.log(
      this.frequencyAnalysisService.performFrequencyAnalysisOnPreviousSolutions()
    );
  }
}
