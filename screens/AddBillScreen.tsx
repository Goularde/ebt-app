import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import countries from "../data/countries.json";
import billValues from "../data/billValues.json";
import SelectFlatList from "../components/SelectFlatList";
import { formatAddBillResponse } from "../utils/formatAddBillResponse";
import { useForm } from "react-hook-form";

const AddBillScreen = () => {
  const { user } = useAuth();
  const [country, setCountry] = useState<String | undefined>();
  const [billValue, setBillValue] = useState<String | undefined>();
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [serial, setSerial] = useState("");
  const [comment, setComment] = useState("");
  const [result, setResult] = useState<String>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: undefined,
      city: "",
      postal: "",
      billValue: undefined,
      shortCode: "",
      serial: "",
      comment: "",
    },
  });

  const addBill = async () => {
    try {
      const response = await fetch(
        process.env.BASE_URL +
          `?m=insertbills&v=1&PHPSESSID=${user?.sessionId}&city=${city}&zip=${postal}&country=${country}&serial0=${serial}&denomination0=${billValue}&shortcode0=${shortCode}&comment0=${comment}`,
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
                {...register("country", { required: true })}
              />
              <TextInput
                style={styles.input}
                onChangeText={setCity}
                value={city}
                placeholder="Ville"
                {...register("city", { required: true })}
              />
              <TextInput
                style={styles.input}
                onChangeText={setPostal}
                value={postal}
                placeholder="Code Postal"
                {...register("postal", { required: true })}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <SelectFlatList
              placeholder="Selectionnez la valeur du billet"
              data={billValues}
              handleClick={handleBillValuePress}
              {...register("billValue", { required: true })}
            />
            <TextInput
              style={styles.input}
              onChangeText={setShortCode}
              value={shortCode.toUpperCase()}
              placeholder="Code imprimeur "
              {...register("shortCode", { required: true })}
            />
            <TextInput
              style={styles.input}
              onChangeText={setSerial}
              value={serial.toUpperCase()}
              placeholder="Numéro de série"
              {...register("serial", { required: true })}
            />
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={comment}
              placeholder="Commentaire"
              {...register("comment", { required: true })}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleSubmit((data) => {
              addBill;
            })}
          >
            <Text style={styles.buttonText}>Ajouter le billet</Text>
          </Pressable>
          {result ? <Text style={styles.text}>{result}</Text> : <></>}
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
    marginTop: 15,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
  },
});
export default AddBillScreen;
