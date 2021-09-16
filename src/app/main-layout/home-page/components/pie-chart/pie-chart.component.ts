import { AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private zone: NgZone) { }

  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {

    this.browserOnly(() => {

      const chart = am4core.create('chartDiv', am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0;
      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.text = '{devices} {counts}';
      chart.legend.valueLabels.template.disabled = true;

      chart.data = [
        {
          devices: 'In Alarm',
          counts: 21,
          color: '#88030a'
        },
        {
          devices: 'Not in Alarm',
          counts: 28,
          color: '#EEEEEE'
        },
      ];

      const series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = 'counts';
      series.dataFields.category = 'devices';
      series.slices.template.propertyFields.fill = 'color';

    });
  }

  ngOnDestroy() {

    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
