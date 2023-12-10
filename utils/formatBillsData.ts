import { Bills } from "../types/Bills";

const formatBillsData = (bills: Bills) => {
  let formatedBills: string[] = [];
  bills.forEach((bill, index) => {
    formatedBills.push(
      `&serial${index}=${bill.serial}&denomination${index}=${bill.billValue}&shortcode${index}=${bill.shortCode}&comment${index}=${bill.comment}`
    );
  });
  return formatedBills.join("");
};

export default formatBillsData;
