import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobportal } from './jobportal';

describe('Jobportal', () => {
  let component: Jobportal;
  let fixture: ComponentFixture<Jobportal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobportal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobportal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
