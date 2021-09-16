import { Component, OnInit } from '@angular/core';
import { AlarmDetails } from '@app/shared/models/device.entity';
import { AlarmService } from './services/alarm.service';
import moment from 'moment';
import { FilterService } from '../filter/services/filter.service';
import { BaseComponent } from '@app/base.component';

@Component({
  selector: 'app-alarm-notification',
  templateUrl: './alarm-notification.component.html',
  styleUrls: ['./alarm-notification.component.css'],
})

export class AlarmNotificationComponent extends BaseComponent implements OnInit {

  isAlarmNotificationActive = false;
  notificationAlarmData: AlarmDetails[] = [];

  constructor(private alarmService: AlarmService, private filterService: FilterService) {
    super();
  }

  getNotificationAlarmData() {
    this.notificationAlarmData = sessionStorage.getItem('notificationAlarmData') ?
      JSON.parse(sessionStorage.getItem('notificationAlarmData')) :
      this.alarmService.getAlarmDetails();
    sessionStorage.setItem('notificationAlarmData', JSON.stringify(this.notificationAlarmData));
  }

  convertTimeStampToDuration(timeStamp) {
    return moment(timeStamp).fromNow();
  }

  notificationAlarmStateHandler(alarmState: boolean, index) {
    const notificationAlarmStateHandlerObject = this.alarmService.notificationAlarmStateHandler(alarmState, index);

    this.isAlarmNotificationActive = notificationAlarmStateHandlerObject.isAlarmNotificationActive;
    this.notificationAlarmData = notificationAlarmStateHandlerObject.notificationAlarmData;
  }

  filterStateChangeHandler() {
    if (this.isMobileView) {
      const isFilterClose = true;
      this.filterService.filterStateChangeHandler(this.isMobileView, isFilterClose);
    }
  }

  ngOnInit(): void {
    this.getNotificationAlarmData();
    this.isAlarmNotificationActive = this.notificationAlarmData.filter(val => val.state).length > 0;
    this.getScreenSize();
  }
}
