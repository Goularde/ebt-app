import { Control, FieldValues } from "react-hook-form";

export type addBillFormType = {
  index: number;
  onRemove: (index: number) => void;
  handleFlatListPress: (item: String | undefined) => void;
};
