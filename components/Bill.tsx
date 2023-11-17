import { View, StyleSheet } from "react-native";
import SelectFlatList from "./SelectFlatList";
import CustomInput from "./CustomInput";
import billValues from "../data/billValues.json";
import { addBillFormType } from "../types/addBillFormType";


const Bill = ({ form, handleBillValue }: addBillFormType) => {
  const { control } = form;
  const handleBillValuePress = (billValue: String | undefined) => {
    handleBillValue(billValue);
  };
  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: "row", gap: 15 }}>
        <SelectFlatList
          placeholder="Valeur du billet"
          data={billValues}
          handleClick={handleBillValuePress}
        />
        <CustomInput
          name="shortCode"
          placeholder="Code imprimeur"
          control={control}
          rules={{ required: "Veuillez entrer un code imprimeur" }}
          toUpperCase
        />
      </View>
      <CustomInput
        name="serial"
        placeholder="Numéro de série"
        control={control}
        rules={{ required: "Veuillez entrer un code numéro de série" }}
        toUpperCase
      />
      <CustomInput name="comment" placeholder="Commentaire" control={control} />
    </View>
  );
};
export default Bill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    // borderRadius: 10,

    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFCB77",
    // elevation: 5,
  },

});
