import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import { formatAddBillResponse } from "../utils/formatAddBillResponse";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import formatBillTitle from "../utils/formatBillTitle";
import countries from "../data/countries.json";
import Bill from "../components/Bill";
import { addBillsFormValues } from "../types/addBillsFormValues";
import CustomControlledInput from "../components/CustomControlledInput";
import ModalSelect from "../components/ModalSelect";
import formatBillsData from "../utils/formatBillsData";

const AddBillScreen = () => {
  const [result, setResult] = useState<string[]>();

  const { user } = useAuth();

  const { ...methods } = useForm<addBillsFormValues>({
    defaultValues: {
      city: "Saint-Etienne",
      postal: "42000",
      country: "France",
      bills: [
        { billValue: "5", serial: "AZERTY", shortCode: "AZERTY", comment: "" },
      ],
    },
    mode: "onChange",
  });
  const control = methods.control;
  const { fields, append, remove } = useFieldArray({
    name: "bills",
    control,
  });

  const addBill = async (data: addBillsFormValues) => {
    try {
      //Prepare the request with the form data
      const request =
        process.env.BASE_URL +
        `?m=insertbills&v=1&PHPSESSID=${user?.sessionid}&city=${data.city}&zip=${data.postal}&country=${data.country}` +
        formatBillsData(data.bills);

      //Sends the request
      const response = await fetch(request, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();
      delete result.data;
      console.log(result);
      formatAddBillResponse(result);
      setResult(formatAddBillResponse(result));
    } catch (error) {
      console.log("Error :" + error);
      return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* ScrollView is used to adjust input to the keyboard size  */}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardDismissMode="on-drag"
        >
          <FormProvider {...methods}>
            <Text style={styles.title}>Lieu</Text>
            <View style={styles.inputContainer}>
              <ModalSelect data={countries} label="Pays" name="country" />

              <CustomControlledInput
                label="Ville"
                name="city"
                enterKeyHint="next"
                returnKeyType="next"
              />
              <CustomControlledInput
                label="Code Postal"
                name="postal"
                keyboardType="number-pad"
                // rules={{ required: "Veuillez entrer un code postal" }}
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
                    error={result && result[index]}
                  />
                );
              })}
            </View>

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
          </FormProvider>
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
