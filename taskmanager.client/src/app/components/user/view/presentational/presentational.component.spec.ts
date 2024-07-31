import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationalComponent } from './presentational.component';

describe('PresentationalComponent', () => {
  let component: PresentationalComponent;
  let fixture: ComponentFixture<PresentationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentationalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
