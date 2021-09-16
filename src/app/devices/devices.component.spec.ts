jest.useFakeTimers();
import { render, screen, waitFor } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { PaginationService } from '@app/common-components/components/pagination/services/pagination.service';
import { DevicesComponent } from './devices.component';
import { DeviceAlarmData } from '../shared/models/device.entity';
import { DevicesService } from './services/devices.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { CommonComponentsModule } from '@app/common-components/common-components.module';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { FilterService } from '@app/common-components/components/filter/services/filter.service';
import { DeviceListResponse } from './models/device-list-response';

let component: DevicesComponent;

test('it should render DevicesComponent', () => {
  render(DevicesComponent, {
    imports: [CommonComponentsModule],
    declarations: [SkeletonLoaderComponent],
  });
  component = new DevicesComponent(
    new DevicesService(new PaginationService()),
    new PaginationService(),
    new FilterService(),
    new UtilsService());
  expect(component).toBeTruthy();
});

test('it should set isLoading variable to false after 1000 ms', async () => {
  expect(component.isLoading).toBeTruthy();
  return waitFor(() => {
    component.isLoadingHandler();
    expect(component.isLoading).toBeFalsy();
  });
});

test('it should render devices list from service', async () => {

  const mockDeviceAlarmData: DeviceAlarmData[] = [
    {
      deviceTag: 'blah device tag',
      site: '',
      plant: '',
      area: '',
      unit: '',
      unitDescription: '',
      systemNumber: '',
      lineNumber: '',
      lineCriticality: '',
      breakerPanel: '',
      controlPanel: '',
      deviceType: '',
      temperatureSource1Celsius: '',
      temperatureSource2Celsius: '',
      controlTemperatureCelsius: '',
      lineCurrentA: '',
      groundFaultCurrentmA: '',
      voltageV: '',
      powerW: '',
      outputState: '',
      alarmState: '',
      onlineStatus: '',
      lastUpdatedAt: '',
      alarmDetails: []
    }
  ];

  const mockDeviceListResponse: DeviceListResponse = {
    deviceAlarmData: mockDeviceAlarmData,
    lastPage: 1,
    totalRecordsFiltered: 0
  };

  const mockDeviceService = createMock(DevicesService);
  mockDeviceService.getDeviceDataWithPagination = jest.fn(() => mockDeviceListResponse);
  await render(DevicesComponent, {
    imports: [CommonComponentsModule],
    declarations: [SkeletonLoaderComponent],
    providers: [
      { provide: DevicesService, useValue: mockDeviceService }
    ]
  });

  jest.runAllTimers();
  return waitFor(() => {
    const mockDeviceAlarms = mockDeviceAlarmData.map((c) => c.deviceTag);
    const deviceAlarms = screen.getAllByRole('heading', { level: 5 }).map(l => l.textContent);
    expect(mockDeviceAlarms).toEqual(deviceAlarms);
  });

});
