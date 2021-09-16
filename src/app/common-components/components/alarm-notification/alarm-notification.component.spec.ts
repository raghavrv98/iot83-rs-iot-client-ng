import { AlarmDetails, DeviceAlarmData } from '@app/shared/models/device.entity';
import { render } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { waitFor } from '@testing-library/dom';
import { FilterService } from '../filter/services/filter.service';
import { AlarmNotificationComponent } from './alarm-notification.component';
import { AlarmService } from './services/alarm.service';

render(AlarmNotificationComponent, {
  imports: [],
});

test('it should create AlarmNotificationComponent', () => {
  render(AlarmNotificationComponent, {});
  const component = new AlarmNotificationComponent(new AlarmService(), new FilterService());
  expect(component).toBeTruthy();
});

test('it should convert time stamp to duration', () => {
  const component = new AlarmNotificationComponent(new AlarmService(), new FilterService());
  const arbitrarilyDuration = 'a few seconds ago';
  const currentTimeStamp = new Date().getTime();
  const duration = component.convertTimeStampToDuration(currentTimeStamp);
  expect(duration).toEqual(arbitrarilyDuration);
});

test('it should change alarm state', () => {
  const component = new AlarmNotificationComponent(new AlarmService(), new FilterService());
  let alarmState = true;
  const index = 1;
  component.notificationAlarmStateHandler(alarmState, index);
  alarmState = JSON.parse(sessionStorage.getItem('notificationAlarmData'))[index].state;
  expect(alarmState).toBeFalsy();
});

test('it should create all notifications from AlarmService', async () => {

  const mockNotificationData: AlarmDetails[] = [
    {
      devicePriority: '',
      deviceTag: 'blah tag',
      description: '',
      value: '',
      setting: '',
      status: '',
      userName: '',
      alarmPriority: '',
      alarmType: '',
      timestamp: 0,
      shelvedTimeRemaining: '',
      state: true,
    }
  ];

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
      alarmDetails: mockNotificationData
    }
  ];

  sessionStorage.setItem('mockNotificationData', JSON.stringify(mockDeviceAlarmData[0].alarmDetails));

  const mockAlarmService = createMock(AlarmService);
  mockAlarmService.getAlarmDetails = jest.fn(() => mockNotificationData);

  await render(AlarmNotificationComponent, {
    imports: [],
    providers: [{ provide: AlarmService, useValue: mockAlarmService }],
  });

  return waitFor(() => {
    const alarms = mockDeviceAlarmData[0].alarmDetails.map((c) => c.deviceTag);
    const alarmsData = JSON.parse(sessionStorage.getItem('mockNotificationData')).map((c) => c.deviceTag);
    expect(alarmsData).toEqual(alarms);
    sessionStorage.removeItem('mockNotificationData');
  });

});
