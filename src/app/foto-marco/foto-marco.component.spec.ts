import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoMarcoComponent } from './foto-marco.component';

describe('FotoMarcoComponent', () => {
  let component: FotoMarcoComponent;
  let fixture: ComponentFixture<FotoMarcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoMarcoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoMarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
