import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import { formatAddBillResponse } from "../utils/formatAddBillResponse";
import { useForm } from "react-hook-form";
import { bill } from "../types/bill";
import { CustomButton } from "../components/CustomButton";
import countries from "../data/countries.json";
import { formatBillTitle } from "../utils/formatBillTitle";
import SelectFlatList from "../components/SelectFlatList";
import CustomInput from "../components/CustomInput";
import Bill from "../components/Bill";
import ComponentDropDown from "../components/ComponentDropDown";

const AddBillScreen = () => {
  let country: String | undefined;
  let billValue: String | undefined;

  const { user } = useAuth();

  const [result, setResult] = useState<String>();
  const [numberOfBill, setNumberOfBill] = useState(1);

  const form = useForm();
  const { control } = form;

  const addBill = async (data: bill) => {
    try {
      const response = await fetch(
        process.env.BASE_URL +
          `?m=insertbills&v=1&PHPSESSID=${user?.sessionId}&city=${data.city}&zip=${data.postal}&country=${country}&serial0=${data.serial}&denomination0=${billValue}&shortcode0=${data.shortCode}&comment0=${data.comment}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      setResult(formatAddBillResponse(result.note0.status));
    } catch (error) {
      console.log("Error :" + error);
      return null;
    }
  };

  const handleCountryPress = (value: String | undefined) => {
    country = value;
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
          <View style={styles.inputContainer}>
            <SelectFlatList
              placeholder="Selectionnez un pays"
              data={countries}
              handleClick={handleCountryPress}
            />
            <CustomInput
              name="city"
              placeholder="Ville"
              control={control}
              rules={{ required: "Veuillez entrer une ville" }}
            />
            <CustomInput
              name="postal"
              placeholder="Code postal"
              control={control}
              rules={{ required: "Veuillez entrer un code postal" }}
              inputMode="numeric"
            />
          </View>
          <Text style={styles.title}>{formatBillTitle(numberOfBill)}</Text>
          {Array.from(Array(numberOfBill), (e, i) => {
            return (
              <ComponentDropDown
                index={i}
                component={
                  <Bill form={form} handleBillValue={handleBillValuePress} />
                }
              />
            );
          })}
          {/* {Array(numberOfBill).map((e, i) => {
            return (
              <ComponentDropDown
                index={i}
                component={
                  <Bill form={form} handleBillValue={handleBillValuePress} />
                }
              />
            );
          })} */}
          <CustomButton
            text="+"
            onPress={() => {
              setNumberOfBill(numberOfBill + 1);
            }}
          />
          <CustomButton
            text="Retirer le dernier billet"
            onPress={() => {
              setNumberOfBill(numberOfBill - 1);
            }}
          />
          <CustomButton
            text="Ajouter le billet"
            onPress={form.handleSubmit(addBill)}
          />

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
    paddingTop: 15,
    paddingHorizontal: 15,
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
});
export default AddBillScreen;
