import { AddPrinterModelComponent } from './addprinter.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AddPrefrencesComponent', () => {
  let component: AddPrinterModelComponent;
  let fixture: ComponentFixture<AddPrinterModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrinterModelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrinterModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
