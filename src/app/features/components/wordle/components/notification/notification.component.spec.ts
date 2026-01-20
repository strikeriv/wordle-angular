import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleNotificationComponent } from './notification.component';

describe('WordleNotificationComponent', () => {
  let component: WordleNotificationComponent;
  let fixture: ComponentFixture<WordleNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordleNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
