import { OrderSumaryPage } from './ordersumary.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: OrderSumaryPage;
  let fixture: ComponentFixture<OrderSumaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSumaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSumaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
