import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleRowComponent } from './row.component';

describe('WordleRowComponent', () => {
  let component: WordleRowComponent;
  let fixture: ComponentFixture<WordleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
