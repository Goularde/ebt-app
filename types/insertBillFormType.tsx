import { bill } from "./bill";

export interface insertBillFormType extends bill {
  country: String;
  city: String;
  postal: String;
}
