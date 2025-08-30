import { TestBed } from '@angular/core/testing';

import { FlowbitefixService } from './flowbitefix.service';

describe('FlowbitefixService', () => {
  let service: FlowbitefixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbitefixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
