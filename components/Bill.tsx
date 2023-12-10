import { View, Pressable, Text } from "react-native";
import { addBillFormType } from "../types/addBillFormType";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import billValues from "../data/billValues.json";
import CustomControlledInput from "./CustomControlledInput";
import ModalSelect from "./ModalSelect";

const Bill = ({ index, onRemove, result }: addBillFormType) => {
  const requiredString = "Champ requis.";
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  return (
    <>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: isOpen ? 15 : 0,
            marginBottom: isOpen ? 15 : 0,
            borderBottomWidth: isOpen ? 1 : 0,
            borderColor: "#e8e8e8",
          }}
        >
          <Text>Billet {index + 1}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {isOpen ? (
              <Ionicons name="chevron-up-outline" size={20} />
            ) : (
              <Ionicons name="chevron-down-outline" size={20} />
            )}
            {index > 0 && (
              <Pressable onPress={() => onRemove(index)} hitSlop={5}>
                <Ionicons name="trash" color={"#FE6D73"} size={20} />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
      <View style={{ display: isOpen ? "flex" : "none" }}>
        {result && (
          <Text style={{ color: "#FE6D73", alignSelf: "center" }}>
            {result}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <ModalSelect
            name={`bills.${index}.billValue`}
            label="Valeur du billet"
            data={billValues}
          />
          <CustomControlledInput
            label="Code imprimeur"
            name={`bills.${index}.shortCode`}
            rules={{
              required: requiredString,
              minLength: { value: 6, message: "6 caractères requis." },
              maxLength: { value: 6, message: "6 caractères requis." },
            }}
            autoCapitalize="characters"
          />
        </View>
        <CustomControlledInput
          label="Numéro de série"
          name={`bills.${index}.serial`}
          rules={{ required: requiredString }}
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
