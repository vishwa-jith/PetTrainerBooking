export interface CheckupReport {
  id: number;
  shop_name: string;
  trainer_name: string;
  report: string;
  date: string;
  days: number;
  amount: number;
}
export interface Report {
  id: string;
  appointmentId: string;
  report: string;
  date: string;
  days: number;
  amount: number;
  issuedBy: string;
}
