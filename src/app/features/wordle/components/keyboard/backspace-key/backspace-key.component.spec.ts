import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackspaceKeyComponent } from './backspace-key.component';

describe('BackspaceKeyComponent', () => {
  let component: BackspaceKeyComponent;
  let fixture: ComponentFixture<BackspaceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackspaceKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackspaceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
