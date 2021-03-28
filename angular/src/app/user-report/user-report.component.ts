import { Component, OnInit } from '@angular/core';
import { GetAppointmentsService } from '../services/getAppointments/get-appointments.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
})
export class UserReportComponent implements OnInit {
  trainerId: number | undefined;
  appointments;
  constructor(private getAppointmentService: GetAppointmentsService) {
    this.appointments = this.getAppointmentService.getAppointments();
  }

  handleTrainerId(id: number): void {
    if (this.trainerId !== id) {
      this.trainerId = id;
    } else {
      this.trainerId = undefined;
    }
  }

  ngOnInit(): void {}
}
