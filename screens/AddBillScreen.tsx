import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import { formatAddBillResponse } from "../utils/formatAddBillResponse";
import {
  useForm,
  useFieldArray,
  Control,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import CustomButton from "../components/CustomButton";
import formatBillTitle from "../utils/formatBillTitle";
import countries from "../data/countries.json";
import SelectFlatList from "../components/SelectFlatList";
import CustomInput from "../components/CustomInput";
import Bill from "../components/Bill";
import { addBillsFormValues } from "../types/addBillsFormValues";
import CustomControlledInput from "../components/CustomControlledInput";

const AddBillScreen = () => {
  let billValue: String | undefined;

  const [result, setResult] = useState<String>();

  const methods = useForm<addBillsFormValues>({
    defaultValues: {
      city: "",
      postal: "",
      country: "",
      bills: [{ billValue: "", serial: "", shortCode: "", comment: "" }],
    },
  });
  const control = methods.control;
  const { fields, append, remove } = useFieldArray({
    name: "bills",
    control,
  });

  const addBill = async (data: addBillsFormValues) => {
    try {
      console.log(data);

      // const response = await fetch(
      //   process.env.BASE_URL +
      //     `?m=insertbills&v=1&PHPSESSID=${user?.sessionId}&city=${data.city}&zip=${data.postal}&country=${country}&serial0=${data.serial}&denomination0=${billValue}&shortcode0=${data.shortCode}&comment0=${data.comment}`,
      //   {
      //     method: "POST",
      //     credentials: "include",
      //   }
      // );
      // const result = await response.json();
      // console.log(result);
      // setResult(formatAddBillResponse(result.note0.status));
    } catch (error) {
      console.log("Error :" + error);
      return null;
    }
  };

  const handleBillValuePress = (value: String | undefined) => {
    billValue = value;
    console.log(billValue);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* ScrollView is used here to adjust input to the keyboard size  */}
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <Text style={styles.title}>Lieu</Text>
          <FormProvider {...methods}>
            <View style={styles.inputContainer}>
              {/* <SelectFlatList
                placeholder="Selectionnez un pays"
                data={countries}
                handleClick={handleCountryPress}
              /> */}
              {/* <CustomInput
                name="city"
                placeholder="Ville"
                control={control as unknown as Control<FieldValues>}
                rules={{ required: "Veuillez entrer une ville" }}
              /> */}
              <CustomControlledInput
                label="Ville"
                name="city"
                rules={{ required: "Veuillez entrer une ville" }}
              />
              {/* <CustomInput
                name="postal"
                placeholder="Code postal"
                control={control as unknown as Control<FieldValues>}
                rules={{ required: "Veuillez entrer un code postal" }}
                inputMode="numeric"
              /> */}
              <CustomControlledInput
                label="Code Postal"
                name="postal"
                rules={{ required: "Veuillez entrer un code postal" }}
              />
            </View>

            <Text style={styles.title}>{formatBillTitle(fields.length)}</Text>
            <View style={[styles.inputContainer, { gap: 15 }]}>
              {fields.map((field, index) => {
                return (
                  <Bill
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    handleFlatListPress={handleBillValuePress}
                  />
                );
              })}
            </View>
          </FormProvider>
          <View style={{ gap: 15 }}>
            <CustomButton
              text="+"
              rounded
              onPress={() =>
                append({
                  billValue: "",
                  serial: "",
                  shortCode: "",
                  comment: "",
                })
              }
            />
            <CustomButton
              text="Ajouter le billet"
              onPress={methods.handleSubmit(addBill)}
            />
          </View>
          {result ? <Text style={styles.resultText}>{result}</Text> : <></>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FEF9EF",
  },
  inputContainer: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#FFCB77",
    elevation: 5,
  },
  resultText: {
    alignSelf: "center",
    color: "#FE6D73",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    marginBottom: 15,
  },
  input: {
    // flex: 1,
    minHeight: 45,
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
    backgroundColor: "#FEF9EF",
  },
});
export default AddBillScreen;
