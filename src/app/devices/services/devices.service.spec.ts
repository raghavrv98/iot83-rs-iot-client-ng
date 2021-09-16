import { PaginationService } from '@app/common-components/components/pagination/services/pagination.service';
import { DevicesService } from './devices.service';
import { DEVICE_ALARM_DATA } from '../../shared/data/devices-list-data';

describe('DevicesService', () => {
  let service: DevicesService;

  beforeEach(() => {
    service = new DevicesService(new PaginationService());
  });

  it('should get all cards', (done) => {
    const value = service.getDeviceAlarmData();
    expect(value).toBe(DEVICE_ALARM_DATA);
    done();
  });


  it('should calculate last page', () => {
    const totalRecords = 100;
    const devicePerPage = 10;
    const arbitrarilyLastPage = 10;
    const value = service.getLastPageInPagination(totalRecords, devicePerPage);
    expect(value).toBe(arbitrarilyLastPage);
  });

  it('should create device list response', () => {
    const value = service.getDeviceDataWithPagination();
    expect(value).toHaveProperty('deviceAlarmData');
    expect(value).toHaveProperty('totalRecordsFiltered');
    expect(value).toHaveProperty('lastPage');
  });

});
