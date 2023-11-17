import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";

export type addBillFormType = {
  form: {
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    control: Control<FieldValues>;
  };
  handleBillValue: (item: String | undefined) => void;
};
