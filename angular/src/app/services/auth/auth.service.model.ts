export interface Login {
  email: string;
  password: string;
}
export interface Signup {
  email: string;
  mobile_no: string;
  username: string;
  password: string;
}
export interface UserDetails {
  id: string;
  email: string;
  username: string;
  mobileNumber: string;
  active: boolean;
  role: string;
  shopName: boolean;
  experience: number;
  message: string;
}
