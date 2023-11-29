import React from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
} from "react-native";
import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from "react-hook-form";

interface CustomControllerInputProps
  extends TextInputProps,
    UseControllerProps {
  label: string;
  defaultValue?: string;
}

const CustomControlledInput = (props: CustomControllerInputProps) => {
  const { label, name, rules, defaultValue, ...inputProps } = props;

  const formContext = useFormContext();
  const { formState } = formContext;
  const { field } = useController({ name, rules, defaultValue });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          style={styles.input}
          onBlur={field.onBlur}
          onChange={field.onChange}
          value={field.value}
          {...inputProps}
        />
      </View>
    </View>
  );
};
export default CustomControlledInput;

const styles = StyleSheet.create({
  label: {
    color: "#FEF9EF",
  },
  container: {
    flex: -1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FEF9EF",
    borderColor: "none",
    elevation: 3,
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
});
