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
  const { errors } = formState;
  const hasError = Boolean(formState?.errors[name]);
  if (!formContext || !name) {
    const msg = !formContext
      ? "Text Input must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: hasError ? "red" : "#FEF9EF" }}>{label}</Text>
      <View>
        <TextInput
          style={[
            styles.input,
            { borderColor: hasError ? "red" : "transparent" },
          ]}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          {...inputProps}
        />
      </View>
      {hasError && (
        <Text style={{ color: "red" }}>
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </View>
  );
};
export default CustomControlledInput;

const styles = StyleSheet.create({
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
    borderWidth: 1,
  },
});
