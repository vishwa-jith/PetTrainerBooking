import { Component, OnInit } from '@angular/core';
import { GetAppointmentsService } from '../services/getAppointments/get-appointments.service';
import { CheckupReportService } from '../services/checkupReport/checkup-report.service';
import { Report } from '../services/checkupReport/checkup-report.service.model';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
})
export class UserReportComponent implements OnInit {
  trainerId: string | undefined;
  appointments: any;
  report: Report | undefined;
  selectedReport: any;
  constructor(
    private getAppointmentService: GetAppointmentsService,
    private checkupReportService: CheckupReportService
  ) {
    this.getAppointmentService.getAppointments().subscribe((appoint) => {
      this.appointments = appoint;
    });
  }

  handleTrainerId(id: string): void {
    if (this.trainerId !== id) {
      this.trainerId = id;
      this.report = this.checkupReportService
        .checkupReportForOwner(this.trainerId)
        .subscribe((report: Report) => {
          this.selectedReport = report;
        });
    } else {
      this.trainerId = undefined;
      this.selectedReport = null;
    }
  }

  ngOnInit(): void {}
}
