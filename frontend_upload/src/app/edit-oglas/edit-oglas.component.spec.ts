import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOglasComponent } from './edit-oglas.component';

describe('EditOglasComponent', () => {
  let component: EditOglasComponent;
  let fixture: ComponentFixture<EditOglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOglasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
