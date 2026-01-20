import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardBackspaceKeyComponent } from './backspace-key.component';

describe('KeyboardBackspaceKeyComponent', () => {
  let component: KeyboardBackspaceKeyComponent;
  let fixture: ComponentFixture<KeyboardBackspaceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardBackspaceKeyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardBackspaceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
