import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

type componentDropDownProps = {
  component: JSX.Element;
  index: number;
};

const ComponentDropDown = ({ index, component }: componentDropDownProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(true);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
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
        </View>
      </Pressable>
      <View style={{ display: isOpen ? "flex" : "none" }}>{component}</View>
    </View>
  );
};

export default ComponentDropDown;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: "#FFCB77",
  },
});
