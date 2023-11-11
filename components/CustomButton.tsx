import { Text, StyleSheet, Pressable } from "react-native";

type CustomButtonProps = {
  text: string;
  color?: string;
  onPress: () => void;
};

export const CustomButton = ({ text, color, onPress }: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        { backgroundColor: color ? color : "#227c9d" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    // elevation: 3,
  },
  buttonText: {
    color: "white",
  },
});
