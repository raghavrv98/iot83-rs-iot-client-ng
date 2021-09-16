import { Injectable } from '@angular/core';
import { DEVICE_ALARM_DATA } from '../../shared/data/devices-list-data';
import { DeviceAlarmData } from '../../shared/models/device.entity';
import { DeviceListResponse } from '../models/device-list-response';
import { PaginationService } from '@app/common-components/components/pagination/services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  deviceListResponse = new DeviceListResponse();

  constructor(
    private paginationService: PaginationService
  ) { }

  getDeviceAlarmData(): DeviceAlarmData[] {
    return DEVICE_ALARM_DATA;
  }

  getDeviceDataWithPagination(): DeviceListResponse {
    this.deviceListResponse.deviceAlarmData = this.getDeviceAlarmData();
    this.deviceListResponse.totalRecordsFiltered = this.deviceListResponse.deviceAlarmData.length;
    this.deviceListResponse.lastPage = this.getLastPageInPagination
      (this.deviceListResponse.totalRecordsFiltered, this.paginationService.devicePerPage);
    return this.deviceListResponse;
  }

  getLastPageInPagination(totalRecords, devicePerPage): number {
    return Math.ceil(totalRecords / devicePerPage);
  }

  getFilterDeviceAlarmDataOnInit() {
    const selectedFilters = sessionStorage.getItem('selectedFilters') ? JSON.parse(sessionStorage.getItem('selectedFilters')) : [];
    this.getFilterDeviceAlarmData(selectedFilters);
  }

  getFilterDeviceAlarmData(selectedFilters) {

    if (selectedFilters.length === 0) {
      this.getDeviceDataWithPagination();
    }
    else {
      let filteredDevices = this.getDeviceAlarmData();

      selectedFilters = selectedFilters.map(value => {
        filteredDevices = filteredDevices.filter(val => {
          if (val[value.filterId]) {
            return value.subFilterNames.includes(val[value.filterId]);
          } else {
            if (val.alarmDetails.filter(alarm => value.subFilterNames.includes(alarm[value.filterId])).length > 0) {
              return val;
            }
          }
        });
        return value;
      });
      this.deviceListResponse.deviceAlarmData = filteredDevices;
      this.deviceListResponse.totalRecordsFiltered = this.deviceListResponse.deviceAlarmData.length;
    }
  }



}
