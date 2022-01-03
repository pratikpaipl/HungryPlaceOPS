import { DeclineComponent } from './decline.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AddPrefrencesComponent', () => {
  let component: DeclineComponent;
  let fixture: ComponentFixture<DeclineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclineComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
