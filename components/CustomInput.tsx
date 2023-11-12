import { Control, Controller, FieldValues } from "react-hook-form";
import { StyleSheet, Text, TextInput, View, InputModeOptions } from "react-native";

type CustomInputProps = {
  control: Control<FieldValues, any>;
  name: string;
  rules?: {
    required?: boolean | string;
    pattern?: {
      value: any;
      message: string;
    };
  };
  placeholder: string;
  secureTextEntry?: boolean | undefined;
  inputMode?: InputModeOptions | undefined
};

export default function CustomInput({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  inputMode,
}: CustomInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={{ marginTop: error ? -15 : 0, marginBottom: 15 }}>
          {error && (
            <Text
              style={{
                color: "#FE6D73",
                alignSelf: "stretch",
                fontSize: 12,
              }}
            >
              {error.message || "Erreur"}
            </Text>
          )}
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            inputMode={inputMode}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    minHeight: 45,
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
    backgroundColor: "#FEF9EF",
  },
});
