import { TestBed } from '@angular/core/testing';

import { Tab5Service } from './tab5.service';

describe('Tab5Service', () => {
  let service: Tab5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tab5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
