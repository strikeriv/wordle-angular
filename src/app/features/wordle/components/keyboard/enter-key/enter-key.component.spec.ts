import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardEnterKeyComponent } from './enter-key.component';

describe('KeyboardEnterKeyComponent', () => {
  let component: KeyboardEnterKeyComponent;
  let fixture: ComponentFixture<KeyboardEnterKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardEnterKeyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardEnterKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
