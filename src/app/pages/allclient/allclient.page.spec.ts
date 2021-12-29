import { AllClientPage } from './allclient.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: AllClientPage;
  let fixture: ComponentFixture<AllClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
