import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviOglasiComponent } from './svi-oglasi.component';

describe('SviOglasiComponent', () => {
  let component: SviOglasiComponent;
  let fixture: ComponentFixture<SviOglasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SviOglasiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviOglasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
