export default interface UserInterface {
  name?: string;
  birthDate?: string;
  phone?: number;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
}
