import 'regenerator-runtime/runtime';

import { Component, OnInit } from '@angular/core';

import $ from 'jquery';
import { AuthenticationService } from '../_services/authentication.service';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
      // redirect to home not already logged
      const currentUser = this.authenticationService.currentUserValue;
      const isUserLogin = currentUser !== null ? true : false;
      if (isUserLogin && currentUser.token) {
        // authorised so return true
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
    this.renderChart();
  }

async renderChart() {

  const sdk = new ChartsEmbedSDK({
  baseUrl: 'https://charts.mongodb.com/charts-project-0-qpeii'
  });

  const chart0 = sdk.createChart({
  chartId: '1c81c6e8-29dd-420a-bf4f-69ebaeb24bdc',
  height: 340,
  width: 280
});

  const chart1 = sdk.createChart({
  chartId: '607d02f4-0ccf-47ad-ac13-b6210816fa00',
  height: 340,
  width: 280
});

const chart2 = sdk.createChart({
  chartId: 'd90713d1-f38c-41c6-83f2-3af175361867',
  height: 340,
  width: 280
});

const chart3 = sdk.createChart({
  chartId: 'fd8bee94-c80c-41e2-9ab2-682bfcea283c',
  height: 340,
  width: 280
});

  await chart0.render(document.getElementById('chart0'));
  await chart1.render(document.getElementById('chart1'));
  await chart2.render(document.getElementById('chart2'));
  await chart3.render(document.getElementById('chart3'));
  /* = For now not require =
  $('#refresh').on('click', () => {
  chart.refresh();
});
  $('#severity-filter').on('change', e => {
  const severity = e.target.value;
  severity
    ? chart.setFilter({ 'issues.severity': severity })
    : chart.setFilter({});
}); */

}

}
