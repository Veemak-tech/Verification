import { assigndashboard } from './../../../../models/assign-dashboard';
import { CasedetailsService } from './../../../../services/casedetails.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartArea, ChartOptions,ChartDataSets,ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-assignment-dashboard',
  templateUrl: './assignment-dashboard.component.html',
  styleUrls: ['./assignment-dashboard.component.scss']
})

export class AssignmentDashboardComponent implements OnInit {

  assignedcasedata: any;
  chart = [];




  constructor(
    private caseservice : CasedetailsService
  ) { }
//////////////////////////
// bar chart options
public barChartOptions: ChartOptions = {
  responsive: true,

  scales: { xAxes: [{
    scaleLabel: {
      display: true,
      labelString: 'Agent Name'
    },
    gridLines :{
      display: true,
            drawBorder: false,
            borderDash: [5, 2],
            zeroLineBorderDash: [5, 2],
            zeroLineColor: '#c5c0bc',
            color: '#c5c0bc'
    }
  }], yAxes: [{
    scaleLabel: {
      display: true,
      labelString: 'No of Cases'
    }
  }] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  },
  legend : {
    position : 'top'
  }
};

// line chart options
public lineChartOptions: ChartOptions = {
  responsive : true,
  scales : { xAxes : [{}], yAxes : [{}] },
  plugins : {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  },
  legend : {
    position : 'bottom'
  }

};


// bar chart
public barChartLabels: Label[] = [];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [pluginDataLabels];
public barChartData: ChartDataSets[] = [];
public barChartColors:Array<any> = [
  {
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: ['#fff', '#fff', '#fff', '#fff'],
    pointBorderColor: '#ec7404',
    pointHoverBackgroundColor: '#ec7404',
    pointHoverBorderColor: '#ec7404',
    borderWidth: 1,

  }
];

// pie chart
public pieChartLabels: Label[] = [];
public pieChartType: ChartType = 'doughnut';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];

public pieChartData: ChartDataSets[] = [];

// line chart
public lineChartLabels: Label[] = [];
public lineChartType: ChartType = 'line';
public lineChartLegend = true;
public lineChartPlugins = [pluginDataLabels];

public lineChartData: ChartDataSets[] = [];


///////////////////////////////

  ngOnInit() {
    let casecount = [];
    let names = [];
    debugger;
    this.caseservice.numberofcases().subscribe((res : any[]) =>{
      debugger
      this.assignedcasedata = res
      console.log(this.assignedcasedata)
      for (let i = 0; i < res.length; i++)
      {
        casecount.push(res[i].casecount);
        names.push(res[i].Name);

      }
      // bar chart
      this.barChartLabels = names;
      this.barChartData = [
        {data : casecount, label: 'Cases' },
        //{data : [5,2,34], label: 'Assigned Cases2'}
      ]

      // pie chart
      this.pieChartLabels = names;
      this.pieChartData = [
        {data : casecount, label : 'Cases'}
      ]

      // line chart
      this.lineChartLabels = names;
      this.lineChartData = [
        {data : casecount, label : 'Cases'}
      ]

      console.log(names)
      console.log(casecount)

    })
  //   this.chart = new Chart ('canvas', {
  //     type: 'line',
  //     data: {
  //       labels: names,
  //       datasets :[{
  //         data: casecount,
  //         borderColor: "#3cba9f",
  //         fill: false
  //       },
  //     ]
  //     },
  //      options: {
  //           legend: {
  //             display: false
  //           },
  //           scales: {
  //             xAxes: [{
  //               display: true
  //             }],
  //             yAxes: [{
  //               display: true
  //             }],
  //           }
  //   }
  // }
  //   )




  }
}
