import { SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/UserContext";
import { StatusBar } from "expo-status-bar";
import { SelectList } from "react-native-dropdown-select-list";
import countries from "../data/countries.json";
import SelectFlatList from "../components/SelectFlatList";

const AddBillScreen = () => {
  const [dataCountries, setDataCountries] = useState<string[]>([]);

  const { user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<String | undefined>();
  const [city, onChangeCity] = useState("");
  const [postal, onChangePostal] = useState("");
  const [billValue, onChangeBillValue] = useState("");
  const [shortCode, onChangeShortCode] = useState("");
  const [serial, onChangeSerial] = useState("");
  const [comment, onChangeComment] = useState("");

  useEffect(() => {
    setDataCountries(countries);
  }, []);

  const addBill = async () => {
    try {
      const response = await fetch(
        process.env.BASE_URL +
          `?m=insertbills&v=1&PHPSESSID=${user?.sessionId}&city=${city}&zip=${postal}&country=${selectedCountry}&serial0=${serial}&denomination0=${billValue}&shortcode0=${shortCode}&comment0=${comment}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();
      // const result = "coucou"
      console.log(result);
    } catch (error) {
      console.log("Error :" + error);
      return null;
    }
  };

  const handleCountryClick = (country: String) => {
    setSelectedCountry(country);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeCity}
            value={city}
            placeholder="Ville"
          />
          {/* <SelectList
            setSelected={(value: string) => setSelectedCountry(value)}
            data={dataCountries}
            defaultOption={{ key: "1", value: "France" }}
          /> */}
          {dataCountries ? (
            <SelectFlatList
              placeholder="Selectionnez un pays"
              data={dataCountries}
              handleClick={handleCountryClick}
            />
          ) : (
            <View style={styles.inputContainer}>
              <Text>Loading...</Text>
            </View>
          )}
          {/* <SelectFlatList
            placeholder="Selectionnez un pays"
            data={dataCountries}
          /> */}
          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeCountry}
            value={country}
            placeholder="Pays"
          /> */}
          <TextInput
            style={styles.input}
            onChangeText={onChangePostal}
            value={postal}
            placeholder="Code Postal"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBillValue}
            value={billValue}
            placeholder="Valeur"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeShortCode}
            value={shortCode.toUpperCase()}
            placeholder="Code imprimeur "
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeSerial}
            value={serial.toUpperCase()}
            placeholder="Numéro de série"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeComment}
            value={comment}
            placeholder="Commentaire"
          />
        </View>
        <View>
          <Pressable style={styles.button} onPress={addBill}>
            <Text style={styles.buttonText}>Ajouter le billet</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 5,
    margin: 20,
    padding: 12,
  },
  input: {
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
  },
});
export default AddBillScreen;
