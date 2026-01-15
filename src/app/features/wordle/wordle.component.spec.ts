import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordleGameComponent } from './wordle.component';

describe('WordleGameComponent', () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
