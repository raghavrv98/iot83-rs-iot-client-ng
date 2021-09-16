import { Injectable } from '@angular/core';
import { DEVICE_ALARM_DATA } from '@app/shared/data/devices-list-data';
import { AlarmDetails, DeviceAlarmData } from '@app/shared/models/device.entity';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor() { }

  getDeviceAlarmData(): DeviceAlarmData[] {
    return DEVICE_ALARM_DATA;
  }

  getAlarmDetails(): AlarmDetails[] {
    const notificationAlarmData = [];
    const deviceAlarmData = this.getDeviceAlarmData();

    for (let i = 0; i < 10; i++) {
      notificationAlarmData.push(deviceAlarmData[i].alarmDetails[0]);
    };
    notificationAlarmData.map((val, index) => val.timestamp = new Date().getTime() - (index * 600000));

    return notificationAlarmData;
  }

  notificationAlarmStateHandler(alarmState: boolean, index) {

    const notificationAlarmData = sessionStorage.getItem('notificationAlarmData') ?
      JSON.parse(sessionStorage.getItem('notificationAlarmData')) :
      this.getAlarmDetails();
    notificationAlarmData[index].state = !alarmState;
    const isAlarmNotificationActive = notificationAlarmData.filter(val => val.state).length > 0;
    sessionStorage.setItem('notificationAlarmData', JSON.stringify(notificationAlarmData));

    const notificationAlarmStateHandlerObject = {
      notificationAlarmData,
      isAlarmNotificationActive
    };

    return notificationAlarmStateHandlerObject;
  }

}
