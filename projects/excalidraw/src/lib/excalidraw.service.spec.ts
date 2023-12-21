import { TestBed } from '@angular/core/testing';

import { ExcalidrawService } from './excalidraw.service';

describe('ExcalidrawService', () => {
  let service: ExcalidrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcalidrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
