import { PrinterSetupPage } from './printersetup.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: PrinterSetupPage;
  let fixture: ComponentFixture<PrinterSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterSetupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrinterSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
