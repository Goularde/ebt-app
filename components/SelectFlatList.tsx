import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Animated,
  Modal,
  FlatList,
} from "react-native";

type CustomInputProps = {
  placeholder: string;
  data: string[];
  handleClick: (country: String) => void;
};

export default function SelectFlatList({
  placeholder,
  data,
  handleClick,
}: CustomInputProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<String | undefined>();
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
              justifyContent: "space-between",
              paddingVertical: 4,
            }}
          >
            <Text>
              {selectedCountry ? selectedCountry.toString() : placeholder}
            </Text>
            {selectedCountry ? (
              <Ionicons
                name="close-outline"
                size={18}
                onPress={() => {
                  setSelectedCountry(undefined);
                }}
              />
            ) : (
              <Ionicons name="search" size={18} />
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
                  <Ionicons
                    name="close-outline"
                    size={20}
                    onPress={() => {
                      setModalVisible(false);
                      setIsPressed(!isPressed);
                    }}
                    style={styles.modalCloseIcon}
                  />
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
                            setSelectedCountry(item);
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
              {/* <View style={styles.containerItems}>
                {data.map((item) => {
                  const animatedOpacity = new Animated.Value(1);
                  const animate = () => {
                    Animated.sequence([
                      Animated.timing(animatedOpacity, {
                        toValue: 0.1,
                        duration: 100,
                        useNativeDriver: true,
                      }),
                      Animated.timing(animatedOpacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                      }),
                    ]).start();
                  };

                  const OnSelectItem = (country: String) => {
                    setSelectedCountry(country);
                    handleClick(country);
                  };
                  return (
                    <Pressable
                      key={item}
                      style={() => [[styles.item]]}
                      onPress={() => {
                        OnSelectItem(item);
                        setIsPressed(!isPressed);
                      }}
                      onPressIn={() => {
                        animate();
                      }}
                    >
                      <Animated.View style={{ opacity: animatedOpacity }}>
                        <Text>{item}</Text>
                      </Animated.View>
                    </Pressable>
                  );
                })}
              </View> */}
            </Modal>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxHeight: 45,
  },
  containerColumn: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    padding: 10,
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
    right: 10,
    top: 10,
  },
  flatList: {
    marginTop: 20,
  },
});
