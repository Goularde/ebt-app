type Notes = {
  [notes: string]: { denomination: string; serial: string; status: string };
};

export const formatAddBillResponse = (notes: Notes) => {
  let status: number[] = [];
  for (let i = 0; i < Object.keys(notes).length; i++) {
    status.push(Number(notes[`note${i}`].status));
  }

  let result: string[] = [];
  status.forEach((e) => {
    result.push(statusToText(e));
  });
  return result;
};

const statusToText = (status: number) => {
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
      return "Mauvais numéro de série et code imprimeur";
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
    default:
      return "Erreur inconnue";
  }
};
