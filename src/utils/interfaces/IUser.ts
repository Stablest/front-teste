export interface IUser {
  _id?: string;
  name: string;
  login?: string;
  cpf: string;
  email: string;
  phone: string;
  postalCode: string;
  adress: string;
  adressNumber: Number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  birthDate: string;
  permission: Number;
  password?: string;
}
