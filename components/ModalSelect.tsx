import {
  TextInputProps,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import CustomInput from "./CustomInput";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";

interface ModalSelectProps extends TextInputProps, UseControllerProps {
  data: string[];
  label: string;
  name: string;
  defaultValue?: string;
}

const ModalSelect = (props: ModalSelectProps) => {
  const { name, rules, defaultValue, label, data, ...inputProps } = props;
  const [isModalVisible, setIsModalVisible] = useState<boolean | undefined>(
    false
  );

  const [selectedItem, setSelectedItem] = useState<string>();

  const formContext = useFormContext();

  const { field } = useController({ name, rules, defaultValue });
  const { formState } = formContext;
  const hasError = Boolean(formState?.errors[name]);
  if (!formContext || !name) {
    const msg = !formContext
      ? "Test Input must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <Pressable
          onPress={() => setIsModalVisible(!isModalVisible)}
          style={styles.containerRow}
        >
          <Text
            style={{
              color: "#000",
            }}
          >
            {field.value}
          </Text>
          <Ionicons
            name={
              isModalVisible ? "chevron-up-outline" : "chevron-down-outline"
            }
            size={18}
          />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={{ fontWeight: "bold" }}>coucuo</Text>
              <Pressable
                onPress={() => {
                  setIsModalVisible(false);
                }}
                hitSlop={15}
              >
                <Ionicons
                  name="close-outline"
                  size={15}
                  style={styles.modalCloseIcon}
                />
              </Pressable>
            </View>
            <FlatList
              style={styles.flatList}
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    key={item}
                    style={styles.item}
                    onPress={() => {
                      setSelectedItem(item);
                      field.onChange(item);
                      setIsModalVisible(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalSelect;

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
    backgroundColor: "#FEF9EF",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "auto",
    maxHeight: 400,
  },
  modalCloseIcon: {
    alignSelf: "flex-end",
  },
  flatList: {
    marginTop: 20,
  },
  modalHeader: {
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    borderBottomWidth: 1,
    padding: 15,
    paddingLeft: 20,
    borderColor: "#e8e8e8",
  },
  label: {
    color: "#FEF9EF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
