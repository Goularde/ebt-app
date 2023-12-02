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
  const formContext = useFormContext();

  const { label, name, rules, defaultValue, ...inputProps } = props;

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
        <TextInput
          style={styles.input}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          {...inputProps}
        />
      </View>
      {hasError && <Text>{formState.errors.root?.message}</Text>}
    </View>
  );
};
export default CustomControlledInput;

const styles = StyleSheet.create({
  label: {
    color: "#FEF9EF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FEF9EF",
    elevation: 3,
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
});
