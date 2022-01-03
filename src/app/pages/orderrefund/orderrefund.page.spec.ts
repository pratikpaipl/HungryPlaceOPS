import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OrderRefundPage } from './orderrefund.page';


describe('HomePage', () => {
  let component: OrderRefundPage;
  let fixture: ComponentFixture<OrderRefundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRefundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRefundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
