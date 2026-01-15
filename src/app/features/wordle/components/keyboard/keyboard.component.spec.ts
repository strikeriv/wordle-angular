import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleKeyboardComponent } from './keyboard.component';

describe('WordleKeyboardComponent', () => {
  let component: WordleKeyboardComponent;
  let fixture: ComponentFixture<WordleKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleKeyboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordleKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
