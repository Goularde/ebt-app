import { Text, View, Pressable } from "react-native";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/UserContext";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginScreenProps = {
  onPress: () => void;
};

type DataType = {
  email: string;
  password: string;
};

const LogInScreen = ({ onPress }: LoginScreenProps) => {
  const { control, handleSubmit } = useForm();
  const { signIn } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEF9EF" }}>
      <Svg height={231} fill="#17C3B2">
        <Path d="M0 0h279v159H0z" />
        <Path d="M279 158.5c0 19.228-14.697 37.669-40.859 51.265C211.98 223.362 176.498 231 139.5 231c-36.998 0-72.48-7.638-98.641-21.235C14.697 196.169 0 177.728 0 158.5h279Z" />
      </Svg>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ marginBottom: 20, fontSize: 25 }}>Euro bill better</Text>
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
        />
        <CustomInput
          name="password"
          placeholder="Mot de passe"
          control={control}
          secureTextEntry
          rules={{ required: "Veuillez entrez un mot de passe" }}
        />
        <Pressable onPress={handleSubmit(signIn)}>
          <Text>Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;
