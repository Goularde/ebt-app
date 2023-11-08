export const formatAddBillResponse = (status: number) => {
  switch (status) {
    case 0:
      return "Billet enregistré, pas de hit";
    case 1:
      return "Billet enregistré /! HIT /!";
    case 2:
      return "Valeur de billet invalide";
    case 4:
      return "Pays invalide";
    case 8:
      return "Numéro de série invalide";
    case 16:
      return "Code imprimeur invalide";
    case 24:
      return "Mauvais numéro de série et de code imprimeur";
    case 28:
      return "Mauvais numéro de série, code imprimeur et pays";
    case 32:
      return "Nom de ville ou code postal manquant";
    case 64:
      return "Vous avez déjà enregistré ce billet";
    case 128:
      return "Vous avez déjà ce numéro de série";
    case 32768:
      return "Code imprimeur ou numéro de série invalide pour cette valeur de billet";
  }
};
