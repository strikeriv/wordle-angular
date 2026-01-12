import { TestBed } from '@angular/core/testing';

import { FrequencyAnalysisService } from './frequency-analysis.service';

describe('FrequencyAnalysisService', () => {
  let service: FrequencyAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencyAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
