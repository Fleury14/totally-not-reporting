import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidFriendlyComponentComponent } from './kid-friendly-component.component';

describe('KidFriendlyComponentComponent', () => {
  let component: KidFriendlyComponentComponent;
  let fixture: ComponentFixture<KidFriendlyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidFriendlyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidFriendlyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
