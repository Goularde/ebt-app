import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import { formatAddBillResponse } from "../utils/formatAddBillResponse";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import countries from "../data/countries.json";
import Bill from "../components/Bill";
import { addBillsFormValues } from "../types/addBillsFormValues";
import CustomControlledInput from "../components/CustomControlledInput";
import ModalSelect from "../components/ModalSelect";
import formatBillsData from "../utils/formatBillsData";

const AddBillScreen = () => {
  const requiredString = "Champ requis.";
  const [result, setResult] = useState<string[]>();

  const { user } = useAuth();

  const { ...methods } = useForm<addBillsFormValues>({
    defaultValues: {
      city: "",
      postal: "",
      country: "",
      bills: [{ billValue: "", serial: "", shortCode: "", comment: "" }],
    },
    mode: "onChange",
  });
  const control = methods.control;
  const { fields, append, remove } = useFieldArray({
    name: "bills",
    control,
  });
  const { errors } = methods.formState;
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
                rules={{ required: requiredString }}
              />
              <CustomControlledInput
                label="Code Postal"
                name="postal"
                keyboardType="number-pad"
                rules={{ required: requiredString }}
                // rules={{ required: "Veuillez entrer un code postal" }}
              />
            </View>

            <Text style={styles.title}>
              {fields.length > 1 ? "Billets" : "Billet"}
            </Text>
            <View style={[styles.inputContainer, { gap: 15 }]}>
              {fields.map((field, index) => {
                return (
                  <View key={field.id}>
                    <Bill
                      index={index}
                      onRemove={() => remove(index)}
                      result={result && result[index]}
                    />
                    {errors.bills?.[index]?.shortCode && (
                      <Text style={styles.errorText}>
                        Code imprimeur :{" "}
                        {errors.bills?.[index]?.shortCode?.message}
                      </Text>
                    )}
                    {errors.bills?.[index]?.serial && (
                      <Text style={styles.errorText}>
                        Numéro de série :{" "}
                        {errors.bills?.[index]?.serial?.message}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>

            <View style={{ gap: 15, marginBottom: 25 }}>
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
                text={
                  fields.length > 1
                    ? "Ajouter les billets"
                    : "Ajouter le billet"
                }
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
  errorText: {
    color: "red",
  },
});
export default AddBillScreen;
