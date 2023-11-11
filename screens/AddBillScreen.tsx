import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import countries from "../data/countries.json";
import billValues from "../data/billValues.json";
import SelectFlatList from "../components/SelectFlatList";
import { formatAddBillResponse } from "../utils/formatAddBillResponse";
import { useForm } from "react-hook-form";
import { bill } from "../types/bill";
import CustomInput from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";

const AddBillScreen = () => {
  const { user } = useAuth();
  const [country, setCountry] = useState<String | undefined>();
  const [billValue, setBillValue] = useState<String | undefined>();
  const [result, setResult] = useState<String>();

  const { handleSubmit, control } = useForm();

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

  const handleCountryPress = (country: String | undefined) => {
    setCountry(country);
  };

  const handleBillValuePress = (billValue: String | undefined) => {
    setBillValue(billValue);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* ScrollView is used here to adjust input to the keyboard size  */}
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.inputContainer}>
            <View>
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
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <SelectFlatList
              placeholder="Selectionnez la valeur du billet"
              data={billValues}
              handleClick={handleBillValuePress}
            />
            <CustomInput
              name="shortCode"
              placeholder="Code imprimeur"
              control={control}
              rules={{ required: "Veuillez entrer un code imprimeur" }}
            />
            <CustomInput
              name="serial"
              placeholder="Numéro de série"
              control={control}
              rules={{ required: "Veuillez entrer un code numéro de série" }}
            />
            <CustomInput
              name="comment"
              placeholder="Commentaire"
              control={control}
            />
          </View>
          {result ? <Text style={styles.text}>{result}</Text> : <></>}
          <CustomButton
            text="Ajouter le billet"
            onPress={handleSubmit(addBill)}
          />
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
    // borderWidth: 2,
    // borderColor: "#ffa91c",
    borderRadius: 10,
    margin: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 4,
    backgroundColor: "#FFCB77",
    elevation: 5,
    zIndex: -1,
  },
  input: {
    height: 45,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
    backgroundColor: "#FEF9EF",
  },
  button: {
    marginHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#227c9d",
  },
  text: {
    alignSelf: "center",
    color: "#FE6D73",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
  },
});
export default AddBillScreen;
