import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneSimulatorComponent } from './drone-simulator.component';

describe('DroneSimulatorComponent', () => {
  let component: DroneSimulatorComponent;
  let fixture: ComponentFixture<DroneSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroneSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
