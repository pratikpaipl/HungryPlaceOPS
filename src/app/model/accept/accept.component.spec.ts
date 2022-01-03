import { AcceptComponent } from './accept.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AddPrefrencesComponent', () => {
  let component: AcceptComponent;
  let fixture: ComponentFixture<AcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
