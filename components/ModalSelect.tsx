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

interface ModalSelectProps extends TextInputProps {
  data: string[];
}

const ModalSelect = ({ data, placeholder }: ModalSelectProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean | undefined>(
    false
  );
  const [selectedItem, setSelectedItem] = useState<string>();
  return (
    <>
      <Pressable
        onPress={() => setIsModalVisible(!isModalVisible)}
        style={styles.containerRow}
      >
        <TextInput
          value={selectedItem}
          editable={false}
          style={{
            color: "#000",
          }}
          placeholder={placeholder}
        />
        <Ionicons
          name={isModalVisible ? "chevron-up-outline" : "chevron-down-outline"}
          size={18}
        />
      </Pressable>

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
    </>
  );
};
export default ModalSelect;

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FEF9EF",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
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
});
