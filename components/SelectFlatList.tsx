import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
  FlatList,
} from "react-native";

type CustomInputProps = {
  placeholder: string;
  data: string[];
  handleClick: (item: String | undefined) => void;
};

const SelectFlatList = ({
  placeholder,
  data,
  handleClick,
}: CustomInputProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<String | undefined>();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {!isPressed ? (
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setIsPressed(!isPressed);
              setModalVisible(!isPressed);
            }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 45,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: selectedItem ? "black" : "grey" }}>
              {selectedItem ? selectedItem.toString() : placeholder}
            </Text>
            {selectedItem ? (
              <Pressable
                onPress={() => {
                  setSelectedItem(undefined);
                  handleClick(undefined);
                }}
                hitSlop={10}>
                <Ionicons
                  name="close-outline"
                  size={18}
                />
              </Pressable>
            ) : (
              <Ionicons name="chevron-down-outline" size={18} />
            )}
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.containerColumn}>
            <TextInput
              placeholder={placeholder}
              onFocus={() => {
                setIsPressed(!isPressed);
                setModalVisible(!isPressed);
              }}
            />
          </View>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                    <Text style={{ fontWeight: "bold" }}>{placeholder}</Text>
                    <Pressable
                      onPress={() => {
                        setModalVisible(false);
                        setIsPressed(!isPressed);
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
                            setIsPressed(!isPressed);
                            handleClick(item);
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
        </>
      )}
    </>
  );
};
export default SelectFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    // paddingVertical: 7,
    // paddingHorizontal: 10,
    marginBottom: 15,
    maxHeight: 45,
    backgroundColor: "#FEF9EF",
    elevation: 3,
  },
  containerColumn: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FEF9EF",
    elevation: 3,
  },
  item: {
    borderBottomWidth: 1,
    padding: 15,
    paddingLeft: 20,
    borderColor: "#e8e8e8",
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
});
