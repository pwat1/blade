import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagelineComponent } from './messageline.component';

describe('MessagelineComponent', () => {
  let component: MessagelineComponent;
  let fixture: ComponentFixture<MessagelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
