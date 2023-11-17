export const formatBillTitle = (numberOfBill: number) => {
  if (numberOfBill > 1) {
    return "Billets";
  }
  return "Billet";
};