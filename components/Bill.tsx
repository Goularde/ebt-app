import { View, StyleSheet, Pressable, Text } from "react-native";
import { addBillFormType } from "../types/addBillFormType";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import SelectFlatList from "./SelectFlatList";
import CustomInput from "./CustomInput";
import billValues from "../data/billValues.json";
import CustomButton from "./CustomButton";
import CustomControlledInput from "./CustomControlledInput";
import ModalSelect from "./ModalSelect";

const Bill = ({ index, onRemove, handleFlatListPress }: addBillFormType) => {
  const handleBillValuePress = (billValue: String | undefined) => {
    handleFlatListPress(billValue);
  };
  const [isOpen, setIsOpen] = useState<Boolean>(true);
  return (
    <>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 15,
            marginBottom: 15,
            borderBottomWidth: isOpen ? 1 : 0,
            borderColor: "#e8e8e8",
          }}
        >
          <Text>Billet {index + 1}</Text>
          {index > 0 && (
            <Ionicons
              name="trash"
              color={"#FE6D73"}
              size={20}
              onPress={() => onRemove(index)}
            />
          )}
          {isOpen ? (
            <Ionicons name="chevron-up-outline" size={20} />
          ) : (
            <Ionicons name="chevron-down-outline" size={20} />
          )}
        </View>
      </Pressable>
      <View style={{ display: isOpen ? "flex" : "none" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          {/* <SelectFlatList
            placeholder="Valeur du billet"
            data={billValues}
            handleClick={handleBillValuePress}
          /> */}
          <ModalSelect
            name={`bills.${index}.billValue`}
            label="Valeur du billet"
            data={billValues}
            placeholder="coucou"
          />
          <CustomControlledInput
            label="Code imprimeur"
            name={`bills.${index}.shortCode`}
            rules={{
              required: "Veuillez entrer un code imprimeur",
              minLength: 6,
              maxLength: 6,
            }}
            autoCapitalize="characters"
          />
        </View>
        <CustomControlledInput
          label="Numéro de série"
          name={`bills.${index}.serial`}
          rules={{ required: "Veuillez entrer un code numéro de série" }}
          autoCapitalize="characters"
        />
        <CustomControlledInput
          label="Commentaire"
          name={`bills.${index}.comment`}
        />
      </View>
    </>
  );
};
export default Bill;
