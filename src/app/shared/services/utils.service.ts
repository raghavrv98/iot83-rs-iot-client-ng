import { Injectable } from '@angular/core';
import { Parser } from 'json2csv';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  downloadDataAsCSV(dataArray, dataFileName) {
    const finalJson = [];
    const jsonSequence = [];

    Object.keys(dataArray[0]).map(val => val !== 'alarmDetails' ? jsonSequence.push(val) : '');

    dataArray.map(val => {
      const obj = {};
      jsonSequence.map(key => {
        obj[key] = typeof key === 'string' ? val[key] : key;
      });
      finalJson.push(obj);
    });

    const parser = new Parser();
    const csvData = parser.parse(finalJson);
    const data = 'text/csv;charset=utf-8,' + encodeURIComponent(csvData);
    const anchorTag = document.createElement('a');
    anchorTag.href = 'data:' + data;
    anchorTag.download = `${dataFileName} ${moment(Date.now()).format('DD MMM YYYY HH:mm:ss')}.csv`;
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);
  }
}
