import { Text, StyleSheet, Pressable } from "react-native";

type CustomButtonProps = {
  text: string;
  color?: string;
  backgrounColor?: string;
  borderColor?: string;
  rounded?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

const CustomButton = ({
  text,
  color,
  backgrounColor,
  borderColor,
  rounded,
  disabled,
  onPress,
}: CustomButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        borderColor ? { borderWidth: 1, borderColor: borderColor } : {},
        { backgroundColor: backgrounColor ? backgrounColor : "#227c9d" },
        rounded && {
          borderRadius: 50,
          alignSelf: "center",
          marginHorizontal: "auto",
          paddingHorizontal: 18,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: color ? color : "#FFFFFF" }}>{text}</Text>
    </Pressable>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  button: {
    marginHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 3,
  },
});
