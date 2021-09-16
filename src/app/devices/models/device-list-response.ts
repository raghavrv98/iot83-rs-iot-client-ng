import { DeviceAlarmData } from '@app/shared/models/device.entity';

export class DeviceListResponse {
  deviceAlarmData: DeviceAlarmData[];
  totalRecordsFiltered = 0;
  lastPage = 0;
}
