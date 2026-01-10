import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMesage } from './error-message';

describe('ErrorMessage', () => {
  let component: ErrorMesage;
  let fixture: ComponentFixture<ErrorMesage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMesage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMesage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
