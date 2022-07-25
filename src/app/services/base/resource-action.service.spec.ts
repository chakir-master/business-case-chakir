import { TestBed } from '@angular/core/testing';

import { ResourceActionService } from './resource-action.service';

describe('ResourceActionService', () => {
  let service: ResourceActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
