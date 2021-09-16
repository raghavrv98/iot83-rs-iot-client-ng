import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '@app/common-components/components/filter/services/filter.service';
import { PaginationService } from '@app/common-components/components/pagination/services/pagination.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceListResponse } from './models/device-list-response';
import { DevicesService } from './services/devices.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { BaseComponent } from '@app/base.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent extends BaseComponent implements OnInit, OnDestroy {

  deviceListResponse: DeviceListResponse;
  filterSubscribe: Subscription;
  downloadSubscribe: Subscription;
  private ngUnsubscribe = new Subject();

  constructor(
    private deviceService: DevicesService,
    public paginationService: PaginationService,
    private filterService: FilterService,
    public utilsService: UtilsService
  ) { super(); }

  getDeviceAlarmData(): void {
    this.deviceListResponse = this.deviceService.getDeviceDataWithPagination();
  }

  getFilterDeviceAlarmData(selectedFilters) {
    this.isLoading = true;
    this.isNoDataFound = false;
    this.isLoadingHandler();
    this.deviceService.getFilterDeviceAlarmData(selectedFilters);
    if (this.deviceListResponse.totalRecordsFiltered === 0) {
      this.isNoDataFoundHandler();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getDeviceAlarmData();
    this.isLoadingHandler();
    this.filterSubscribe = this.filterService.filterSubject.
      pipe(takeUntil(this.ngUnsubscribe)).
      subscribe(selectedFilters => this.getFilterDeviceAlarmData(selectedFilters));
    this.downloadSubscribe = this.filterService.downloadSubject.
      pipe(takeUntil(this.ngUnsubscribe)).
      subscribe(() => this.utilsService.downloadDataAsCSV(this.deviceListResponse.deviceAlarmData, 'Devices Data'));
    this.deviceService.getFilterDeviceAlarmDataOnInit();
    if (this.deviceListResponse.totalRecordsFiltered === 0) {
      this.isNoDataFoundHandler();
    }
  }

}
