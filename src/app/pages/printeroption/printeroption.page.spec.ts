import { PrinterOptionPage } from './printeroption.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: PrinterOptionPage;
  let fixture: ComponentFixture<PrinterOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrinterOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
