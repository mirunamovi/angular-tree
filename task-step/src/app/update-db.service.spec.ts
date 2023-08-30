import { TestBed } from '@angular/core/testing';

import { UpdateDbService } from './update-db.service';

describe('UpdateDbService', () => {
  let service: UpdateDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
