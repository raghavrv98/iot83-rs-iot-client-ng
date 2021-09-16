import { TestIdService } from './testid.service';

describe('TestidService', () => {
  let service: TestIdService;

  beforeEach(() => {
    service = new TestIdService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
