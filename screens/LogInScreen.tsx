import { Text, View, Linking, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/UserContext";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

const LogInScreen = () => {
  const { control, handleSubmit } = useForm();
  const { signIn } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* <Svg height={231} fill="#17C3B2">
        <Path d="M279 158.5c0 19.228-14.697 37.669-40.859 51.265C211.98 223.362 176.498 231 139.5 231c-36.998 0-72.48-7.638-98.641-21.235C14.697 196.169 0 177.728 0 158.5h279Z" />
      </Svg> */}
      <View style={styles.header}>
        <Text style={{ fontSize: 30 }}>EBT App</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Veuillez entrez un email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Veuillez entrez un email valide",
            },
          }}
          inputMode="email"
        />
        <CustomInput
          name="password"
          placeholder="Mot de passe"
          control={control}
          secureTextEntry
          rules={{ required: "Veuillez entrez un mot de passe" }}
        />
      </View>
      <View style={styles.bottom}>
        <CustomButton text="Se Connecter" onPress={handleSubmit(signIn)} />
        <CustomButton
          text="S'inscrire"
          onPress={() => {
            Linking.openURL("https://eurobilltracker.com/signup/");
          }}
          backgrounColor="#e8e8e8"
          color="black"
          borderColor="grey"
        />
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FEF9EF",
  },
  inputContainer: {
    // flex: 0.8,
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 4,
    backgroundColor: "#FFCB77",
    elevation: 5,
  },
  header: {
    marginTop: 20,
    alignItems: "center",
  },
  bottom: {
    flex: 0.2,
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
