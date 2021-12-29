import { DriverSumaryPage } from './driversumary.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: DriverSumaryPage;
  let fixture: ComponentFixture<DriverSumaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSumaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverSumaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
