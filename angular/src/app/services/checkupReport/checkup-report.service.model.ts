export interface Report {
  id: string;
  appointmentId: string;
  report: string;
  date: string;
  days: number;
  amount: number;
  issuedBy: string;
}
