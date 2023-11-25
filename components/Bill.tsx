import { View, StyleSheet, Pressable, Text } from "react-native";
import { addBillFormType } from "../types/addBillFormType";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import SelectFlatList from "./SelectFlatList";
import CustomInput from "./CustomInput";
import billValues from "../data/billValues.json";
import { CustomButton } from "./CustomButton";

const Bill = ({
  index,
  control,
  onRemove,
  handleFlatListPress,
}: addBillFormType) => {
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

          {isOpen ? (
            <Ionicons name="chevron-up-outline" size={20} />
          ) : (
            <Ionicons name="chevron-down-outline" size={20} />
          )}
          {index > 0 && (
            <CustomButton rounded text="-" onPress={() => onRemove(index)} />
          )}
        </View>
      </Pressable>
      <View style={{ display: isOpen ? "flex" : "none" }}>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <SelectFlatList
            placeholder="Valeur du billet"
            data={billValues}
            handleClick={handleBillValuePress}
          />
          <CustomInput
            name={`bills.${index}.shortCode`}
            placeholder="Code imprimeur"
            control={control}
            rules={{ required: "Veuillez entrer un code imprimeur" }}
            toUpperCase
          />
        </View>
        <CustomInput
          name={`bills.${index}.serial`}
          placeholder="Numéro de série"
          control={control}
          rules={{ required: "Veuillez entrer un code numéro de série" }}
          toUpperCase
        />
        <CustomInput
          name={`bills.${index}.comment`}
          placeholder="Commentaire"
          control={control}
        />
      </View>
    </>
  );
};
export default Bill;
