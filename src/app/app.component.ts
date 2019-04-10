import { Component } from '@angular/core';
import { Constants } from "./constants";
import { HttpServiceService } from "./http-service.service";
import { bar } from "./models/bar";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snow-bar-chat';
  filePath: string = '';
  file: any;
  bars: bar[] = [];
  timer: any;

  constructor(private http: HttpServiceService) { }

  public UploaFileClick(e) {
    this.file = e.target.files[0];

    this.http.Upload(Constants.PostFileData, this.file).subscribe((data: any) => {
      this.bars = data as bar[];
      this.BarToChat(this.bars);
      clearInterval(this.timer);
      this.BarRandomize(this.bars);      
    })
  }

  BarToChat(bars: bar[]) {
    let chartData: number[] = [];
     
    bars.map(val => { 
      chartData.push(val.BarValue) })
    
    let chartLabel: string = 'Snow bar chart';
    let chartLablels: string[];
    chartLablels = bars.map(val => { return val.BarName });
    let chartNames: string[];
    chartNames = bars.map(val => { return val.BarName });
    let chartColors: string [];
    chartColors = bars.map(val => {return val.BarColorCode});
    this.chartDatasets = [
      {
        data: chartData,
        label: chartLabel
      }
    ]
    this.chartLabels = chartNames;
    this.chartColors[0]["backgroundColor"] = chartColors;
  }

  BarRandomize(bars:bar[]){
    this.timer = setInterval(()=>{
      this.http.Post(Constants.Randomize, bars).subscribe((data: any) => {
        this.bars = data as bar[];
        this.BarToChat(this.bars);
      })
    }, 60000);
  }

  public chartDatasets: Array<any> = [{
    data:[],
    label:'Snow bar chart'
  }];   

  public chartLabels: Array<any> = [];

  public chartType: string = 'bar';
  public chartColors: Array<any> = [
    {
      backgroundColor: [
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


}
