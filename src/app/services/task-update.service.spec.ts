import { TestBed } from '@angular/core/testing';

import { TaskUpdateService } from './task-update.service';

describe('TaskUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskUpdateService = TestBed.get(TaskUpdateService);
    expect(service).toBeTruthy();
  });
});
