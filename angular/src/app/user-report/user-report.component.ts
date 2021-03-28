import { Component, OnInit } from '@angular/core';
import { GetAppointmentsService } from '../services/getAppointments/get-appointments.service';
import { CheckupReportService } from '../services/checkupReport/checkup-report.service';
import { CheckupReport } from '../services/checkupReport/checkup-report.service.model';
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
})
export class UserReportComponent implements OnInit {
  trainerId: number | undefined;
  appointments;
  report: CheckupReport | undefined;
  constructor(
    private getAppointmentService: GetAppointmentsService,
    private checkupReportService: CheckupReportService
  ) {
    this.appointments = this.getAppointmentService.getAppointments();
  }

  handleTrainerId(id: number): void {
    if (this.trainerId !== id) {
      this.trainerId = id;
      this.report = this.checkupReportService.checkupReport(this.trainerId);
    } else {
      this.trainerId = undefined;
    }
  }

  ngOnInit(): void {}
}
