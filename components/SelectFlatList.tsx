import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Animated,
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

  return (
    <>
      {!isPressed ? (
        <View style={styles.container}>
          <Pressable
            onPress={() => setIsPressed(!isPressed)}
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
              onFocus={() => setIsPressed(!isPressed)}
            />
          </View>
          <View style={styles.containerItems}>
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
                  onPressIn={()=>{animate();}}
                >
                  <Animated.View style={{ opacity: animatedOpacity }}>
                    <Text>{item}</Text>
                  </Animated.View>
                </Pressable>
              );
            })}
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
  containerItems: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  item: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#e8e8e8",
  },
});
