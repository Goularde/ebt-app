import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CustomInputProps = {
  placeholder: string;
  data: String[];
};

export default function SelectFlatList({
  placeholder,
  data,
}: CustomInputProps) {
  const [pressed, isPressed] = useState(false);

  return (
    <>
      {!pressed ? (
        <View style={styles.container}>
          <Pressable
            onPress={() => isPressed(!pressed)}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
            }}
          >
            <Text>{placeholder}</Text>
            <Ionicons name="search" size={18} />
          </Pressable>
        </View>
      ) : (
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={data}
              renderItem={(item) => <Text>{item.item}</Text>}
              ListHeaderComponent={
                <View style={styles.container}>
                  <TextInput
                    placeholder={placeholder}
                    onFocus={() => isPressed(!pressed)}
                  />
                </View>
              }
            />
          </SafeAreaView>
        </>
      )}
      <Text>{pressed.toString()}</Text>
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
  input: {},
});
