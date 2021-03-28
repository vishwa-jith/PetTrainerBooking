import { Injectable } from '@angular/core';
import { CheckupReport } from './checkup-report.service.model';

@Injectable({
  providedIn: 'root',
})
export class CheckupReportService {
  checkupReports: CheckupReport[] = [
    {
      id: 1,
      shop_name: 'ABC Shop',
      trainer_name: 'Lokesh R',
      report: 'Hey this is a sample report, beware of it',
      date: '22/03/2021',
      days: 7,
      amount: 3000,
    },
    {
      id: 2,
      shop_name: 'LMN Shop',
      trainer_name: 'Vishwajith V',
      report: 'Hey this is a sample report, beware of it',
      date: '05/11/2021',
      days: 7,
      amount: 23000,
    },
    {
      id: 3,
      shop_name: 'KPY Shop',
      trainer_name: 'Suresh Anand K',
      report: 'Hey this is a sample report, beware of it',
      date: '12/05/2021',
      days: 7,
      amount: 1250,
    },
    {
      id: 4,
      shop_name: 'LEM Shop',
      trainer_name: 'Sai Prasadth',
      report: 'Hey this is a sample report, beware of it',
      date: '02/09/2021',
      days: 7,
      amount: 3050,
    },
  ];

  checkupReport = (reportId: number) => {
    return this.checkupReports.filter(({ id }) => id === reportId)[0];
  };

  constructor() {}
}
