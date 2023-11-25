export type addBillsFormValues = {
  city: string;
  postal: string;
  country: string;
  bills: {
    billValue: string;
    serial: string;
    shortCode: string;
    comment: string;
  }[];
};
