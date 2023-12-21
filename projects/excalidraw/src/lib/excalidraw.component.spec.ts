import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcalidrawComponent } from './excalidraw.component';

describe('ExcalidrawComponent', () => {
  let component: ExcalidrawComponent;
  let fixture: ComponentFixture<ExcalidrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcalidrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcalidrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
