import { ChangeDetectorRef, Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from 'app/shared/services/layout.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() cssClass;
  @Input() symbolShape;
  @Input() baseColor;
  @Input() cardColor;
  @Input() baseColorLigth;
  @Input() titulo;
  @Input() valor;
  @Input() porcentaje;
  @Input() logo;
  @Input() mostrar;
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '#8C8C8C';
  colorsGrayGray200 = '#DCDCDC';
  colorsGrayGray300 = '#B8B8B8';
  colorsThemeBase = '';
  colorsThemeLight = '';
  symbolCSSClasses = '';
  svgCSSClasses = '';
  constructor(private layout: LayoutService,
    private cdr: ChangeDetectorRef,) { }
  ngAfterViewInit(): void {
    this.chartOptions = this.getChartOptions();
    this.cdr.detectChanges();
  }

  loadLayoutView() {

    this.colorsThemeBase = this.baseColor;

    this.colorsThemeLight = this.baseColorLigth;
  }

  ngOnInit(): void {
    if (!this.baseColor) {
      this.baseColor = 'success';
    }

    this.loadLayoutView();

    this.chartOptions = this.getChartOptions();
    this.cdr.detectChanges();
  }

  getChartOptions() {
    return {
      series: [{
        name: 'Net Profit',
        data: [40, 40, 30, 30, 35, 35, 50]
      }],
      chart: {
        type: 'area',
        height: 100,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBase]
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          }
        }
      },
      colors: [this.colorsThemeLight],
      markers: {
        colors: [this.colorsThemeLight],
        strokeColor: [this.colorsThemeBase],
        strokeWidth: 3
      }
    };
  }
}
