import { AssignDriverModelComponent } from './assigndriver.component';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AddPrefrencesComponent', () => {
  let component: AssignDriverModelComponent;
  let fixture: ComponentFixture<AssignDriverModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDriverModelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriverModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
