jest.useFakeTimers();

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    service = new UtilsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
