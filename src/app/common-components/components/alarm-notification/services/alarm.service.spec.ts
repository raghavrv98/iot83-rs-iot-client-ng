import { DEVICE_ALARM_DATA } from '@app/shared/data/devices-list-data';
import { AlarmService } from './alarm.service';

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(() => {
    service = new AlarmService();
  });

  it('should get all device alarm data', (done) => {
    const value = service.getDeviceAlarmData();
    expect(value).toBe(DEVICE_ALARM_DATA);
    done();
  });

  it('should get alarm detail of 0th index from first 10 devices', (done) => {
    const value = service.getAlarmDetails();
    const arbitrarilyTotalAlarms = 10;
    expect(value).toHaveLength(arbitrarilyTotalAlarms);
    done();
  });

  it('should change the alarm state', (done) => {
    const alarmState = true;
    const index = 1;
    const arbitrarilyIsAlarmNotificationActive = true;
    const notificationAlarmStateHandlerObject = service.notificationAlarmStateHandler(alarmState, index);
    expect(notificationAlarmStateHandlerObject).toHaveProperty('isAlarmNotificationActive');
    expect(notificationAlarmStateHandlerObject).toHaveProperty('notificationAlarmData');
    expect(notificationAlarmStateHandlerObject.isAlarmNotificationActive).toBe(arbitrarilyIsAlarmNotificationActive);
    done();
  });
});
