import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTodayComponent } from './today.component';

describe('PlayTodayComponent', () => {
  let component: PlayTodayComponent;
  let fixture: ComponentFixture<PlayTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayTodayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
